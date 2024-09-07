import * as z from "zod";

import { PageLayout } from "@/components/layout/page-layout";
import { FormLayout } from "@/components/layout/form-layout";
import { FormButtonPalette } from "@/components/layout/form-button-palette";
import { PageButtonPalette } from "@/components/layout/page-buttons-palette";
import { Input } from "@/components/input";
import { Select } from "@/components/select";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { IResponseErrorData, IUser } from "@/lib/definitions";
import { UserAPI } from "@/api/users";
import { const_role, const_status } from "@/lib/constants";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { AppContext } from "@/contexts/app-context";
import clsx from "clsx";

const schema = z
  .object({
    role: z.string(),
    name: z.string(),
    email: z.string().email({ message: "E-mail inválido" }),
    cpf: z.string(),
    status: z.string(),
    password: z.string(),
    companyId: z.string(),
    companyCode: z.string(),
  })
  .required();

export function UserView() {
  const userAPI = new UserAPI();
  const { paramId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user } = useContext(AppContext);

  const form = useForm<IUser>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      if (paramId) {
        return await userAPI.Get(paramId);
      }

      const responseUser = {} as IUser;

      if (user) {
        responseUser.companyCode = user.companyCode;
        responseUser.companyId = user.companyId;
      }

      return responseUser;
    },
  });

  async function onSubmit(data: IUser) {
    let descriptionError = "";

    try {
      if (paramId) await userAPI.Update(paramId, data);
      else await userAPI.Create(data);
    } catch (err) {
      if (err instanceof AxiosError) {
        const data = err.response?.data as IResponseErrorData;

        descriptionError = data.message;
      }
    }

    if (descriptionError == "") navigate("/app/user");
    else setError(descriptionError);
  }

  return (
    <PageLayout>
      <PageButtonPalette
        buttons={[{ name: "Voltar", color: "gray", src: "/app/user" }]}
      />

      <FormLayout messageError={error} funcClearError={setError}>
        <FormProvider {...form}>
          <form
            id="form-viewuser"
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Input
              label="Nome"
              className="md:col-span-2"
              //error={form.formState.errors.name?.message}
              {...form.register("name")}
            />

            <Input label="CPF" mask="cpf" {...form.register("cpf")} />

            <Select
              label="Perfil"
              data={const_role}
              {...form.register("role")}
            />

            <Input
              label="E-mail"
              className="md:col-span-2"
              disabled={paramId != undefined}
              errorMessage={form.formState.errors.email?.message}
              {...form.register("email")}
            />

            <Select
              label="Situação"
              data={const_status}
              className="md:col-span-2"
              {...form.register("status")}
            />

            <Input
              label="Senha"
              className={clsx(
                "md:col-span-4",
                paramId != undefined && "hidden"
              )}
              type="password"
              {...form.register("password")}
            />

            <FormButtonPalette
              isSubmitting={form.formState.isSubmitting}
              className="sm:col-span-2 md:col-span-4"
            />
          </form>
        </FormProvider>
      </FormLayout>
    </PageLayout>
  );
}
