import * as z from "zod";

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
  const { user } = useContext(AppContext);
  const { paramId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const form = useForm<ICompany>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      return await companyAPI.Get(paramId);
    },
  });

  async function onSubmit(data: ICompany) {
    try {
      if (paramId) await companyAPI.Update(paramId, data);
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
        <FormLayout messageError={error} funcClearError={setError}>
          <form
            id="form-viewuser"
            className="flex flex-col items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid gap-2 sm:grid-cols-2 w-full mt-4">
              <Input label="Nome" {...form.register("name")} />
              <Input
                disabled
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
