import * as z from "zod";

import { PageLayout } from "@/components/layout/page-layout";
import { FormLayout } from "@/components/layout/form-layout";
import { FormButtonPalette } from "@/components/layout/form-button-palette";
import { PageButtonPalette } from "@/components/layout/page-buttons-palette";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { IScheduling } from "@/lib/definitions";
import { useState } from "react";
import { AxiosError } from "axios";
import { SchedulingAPI } from "@/api/scheduling";

const schema = z
  .object({
    name: z.string(),
    cnpj: z.string(),
    code: z.string(),
    image: z.string(),
  })
  .required();

const api = new SchedulingAPI();

export function SchedulingView() {
  const navigate = useNavigate();

  const { paramId } = useParams();
  const [error, setError] = useState<string>();

  const form = useForm<IScheduling>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      let idFilter = paramId;

      if (!idFilter) idFilter = "0";

      return await api.Get(idFilter);
    },
  });

  async function onSubmit(data: IScheduling) {
    try {
      if (paramId) await api.Update(data, data);
      else await api.Create(data);

      navigate("/app/scheduling");
    } catch (err: unknown) {
      if (err instanceof AxiosError) setError(err.response?.data.message);
      else setError("Erro não definido");
    }
  }

  return (
    <PageLayout>
      <PageButtonPalette
        buttons={[{ name: "Voltar", color: "gray", src: "/app/scheduling" }]}
      />

      <FormProvider {...form}>
        <FormLayout messageError={error} funcClearError={setError}>
          <form
            id="form-viewuser"
            className="flex flex-col items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid gap-2 sm:grid-cols-2 w-full mt-4"></div>

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
