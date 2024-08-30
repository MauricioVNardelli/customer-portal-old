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

const schema = z
  .object({
    name: z.string(),
    cnpj: z.string(),
  })
  .required();

export function CompanyView() {
  const companyAPI = new CompanyAPI();
  const { paramId } = useParams();
  const navigate = useNavigate();

  const form = useForm<ICompany>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      return await companyAPI.Get(paramId);
    },
  });

  async function onSubmit(data: ICompany) {
    if (paramId) await companyAPI.Update(paramId, data);
    else await companyAPI.Create(data);

    navigate("/app/company");
  }

  return (
    <PageLayout>
      <PageButtonPalette
        buttons={[{ name: "Voltar", color: "gray", src: "/app/company" }]}
      />

      <FormLayout>
        <FormProvider {...form}>
          <form
            id="form-viewuser"
            className="flex flex-col items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
              <Input label="Nome" {...form.register("name")} />
              <Input label="CNPJ" mask="cnpj" {...form.register("cnpj")} />
            </div>

            <FormButtonPalette
              isSubmitting={form.formState.isSubmitting}
              className="w-full"
            />
          </form>
        </FormProvider>
      </FormLayout>
    </PageLayout>
  );
}
