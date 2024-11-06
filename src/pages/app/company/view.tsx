import * as z from "zod";
import * as Tabs from "@radix-ui/react-tabs";

import { PageLayout } from "@/components/layout/page-layout";
import { FormLayout } from "@/components/layout/form-layout";
import { FormButtonPalette } from "@/components/layout/form-button-palette";
import { PageButtonPalette } from "@/components/layout/page-buttons-palette";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { ICompany } from "@/lib/definitions";
import { CompanyAPI } from "@/api/company";
import { Input } from "@/components/input";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { AppContext } from "@/contexts/app-context";
import { TabTrigger } from "@/components/tabs/trigger";

const schema = z
  .object({
    name: z.string(),
    cnpj: z.string(),
    code: z.string(),
    image: z.string(),
  })
  .required();

export function CompanyView() {
  const companyAPI = new CompanyAPI();
  const navigate = useNavigate();

  const { paramId } = useParams();
  const { user } = useContext(AppContext);
  const [error, setError] = useState<string>();

  const isInserting = paramId == undefined;
  const form = useForm<ICompany>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      let defValue = {
        name: "",
        cnpj: "",
        code: "",
      } as ICompany;
      if (paramId) defValue = await companyAPI.Get(paramId);

      return defValue;
    },
  });

  async function onSubmit(data: ICompany) {
    try {
      if (!isInserting) await companyAPI.Update(paramId, data);
      else await companyAPI.Create(data);

      navigate("/app/company");
    } catch (err: unknown) {
      if (err instanceof AxiosError) setError(err.response?.data.message);
      else setError("Erro não definido");
    }
  }

  return (
    <PageLayout>
      {user?.role == "ADMIN" && (
        <PageButtonPalette
          buttons={[{ name: "Voltar", color: "gray", src: "/app/company" }]}
        />
      )}

      <FormProvider {...form}>
        <FormLayout
          title="EMPRESA"
          messageError={error}
          funcClearError={setError}
        >
          <form
            id="form-viewuser"
            className="flex flex-col items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid gap-2 sm:grid-cols-2 w-full mt-4">
              <Input label="Nome" {...form.register("name")} />
              <Input
                disabled={!isInserting}
                label="CNPJ"
                mask="cnpj"
                {...form.register("cnpj")}
              />

              <Input
                label="URL Logo (max 200 x 200)"
                className="sm:col-span-2"
                {...form.register("image")}
              />

              <Input
                label="Código"
                disabled
                className="sm:col-span-2"
                {...form.register("code")}
              />
            </div>

            <FormButtonPalette
              isSubmitting={form.formState.isSubmitting}
              className="w-full"
            />
          </form>
        </FormLayout>
      </FormProvider>
    </PageLayout>
  );
}

/*
<Tabs.Root defaultValue="endpoint" className="mt-4">
        <Tabs.List>
          <TabTrigger value="endpoint">Endpoint</TabTrigger>
        </Tabs.List>
        <Tabs.Content
          className="border shadow-sm dark:border-gray-600"
          value="endpoint"
        >
          {paramId && <CompanyEndpointView companyId={paramId} />}
        </Tabs.Content>
      </Tabs.Root>
      */
