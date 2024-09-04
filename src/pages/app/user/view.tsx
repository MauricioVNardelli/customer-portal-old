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
import { useState } from "react";
import { AxiosError } from "axios";

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

  const form = useForm<IUser>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      let user = {} as IUser;

      if (paramId) {
        user = await userAPI.Get(paramId);
      }

      return user;
    },
  });

  async function onSubmit(data: IUser) {
    let descriptionError = "";

    const dataUpdate = {
      name: data.name,
      cpf: data.cpf,
      role: data.role,
      status: data.status,
      companyId: data.companyId,
      password: data.password,
    };

    try {
      if (paramId) await userAPI.Update(paramId, dataUpdate);
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
            className="grid grid-cols-4 gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Input
              label="Nome"
              className="col-span-2"
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
              className="col-span-2"
              disabled={paramId != undefined}
              errorMessage={form.formState.errors.email?.message}
              {...form.register("email")}
            />

            <Select
              label="Situação"
              data={const_status}
              disabled={!paramId}
              className="col-span-2"
              {...form.register("status")}
            />

            <Input
              label="Senha"
              className="col-span-4"
              type="password"
              {...form.register("password")}
            />

            <FormButtonPalette
              isSubmitting={form.formState.isSubmitting}
              className="col-span-4"
            />
          </form>
        </FormProvider>
      </FormLayout>
    </PageLayout>
  );
}
