import * as z from "zod";

import { PageLayout } from "@/components/layout/page-layout";
import { FormLayout } from "@/components/layout/form-layout";
import { FormButtonPalette } from "@/components/layout/form-button-palette";
import { PageButtonPalette } from "@/components/layout/page-buttons-palette";
import { InputForm } from "@/components/input-form";
import { SelectForm } from "@/components/select-form";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { IResponseErrorData, IUser } from "@/lib/definitions";
import { UserAPI } from "@/api/users";
import { constStatus } from "@/lib/constants";
import { Modal, PasswordInput } from "@mantine/core";
import { useState } from "react";
import { AxiosError } from "axios";

const schemaUpdate = z
  .object({
    role: z.string(),
    name: z.string(),
    email: z.string().email({ message: "E-mail inválido" }),
    cpfcnpj: z.string(),
    status: z.string(),
  })
  .required();

const schemaCreate = z
  .object({
    role: z.string(),
    name: z.string(),
    email: z.string().email({ message: "E-mail inválido" }),
    cpfcnpj: z.string(),
    status: z.string(),
    password: z.string(),
  })
  .required();

export function UserView() {
  const userAPI = new UserAPI();
  const { paramId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm<IUser>({
    resolver: zodResolver(paramId ? schemaUpdate : schemaCreate),
    defaultValues: async () => {
      let user = {} as IUser;

      if (paramId) {
        user = await userAPI.Get(paramId);
        return user;
      }

      return user;
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
        descriptionError = data.error;
      }
    }

    if (!descriptionError) navigate("/app/user");
    else setError(descriptionError);
  }

  return (
    <PageLayout>
      <PageButtonPalette
        buttons={[{ name: "Voltar", color: "gray", src: "/app/user" }]}
      />

      <FormLayout>
        <FormProvider {...form}>
          <form
            id="form-viewuser"
            className="grid grid-cols-4 gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputForm
              label="Nome"
              fieldName="name"
              error={form.formState.errors.name?.message}
              className="col-span-2"
            />
            <InputForm label="CPF" fieldName="cpfcnpj" mask="cpf" />

            <SelectForm
              label="Perfil"
              fieldName="role"
              data={["ADMIN", "USER"]}
            />

            <InputForm
              label="E-mail"
              fieldName="email"
              className="col-span-2"
              error={form.formState.errors.email?.message}
            />

            <SelectForm
              label="Situação"
              fieldName="status"
              data={constStatus}
              disabled={!paramId}
              className="col-span-2"
            />

            {!paramId ? (
              <PasswordInput
                label="Senha"
                className="col-span-4"
                {...form.register("password")}
              />
            ) : (
              <></>
            )}

            <FormButtonPalette
              isSubmitting={form.formState.isSubmitting}
              className="col-span-4"
            />
          </form>
        </FormProvider>
      </FormLayout>

      <Modal
        opened={error != ""}
        onClose={() => setError("")}
        withCloseButton={false}
      >
        {error}
      </Modal>
    </PageLayout>
  );
}
