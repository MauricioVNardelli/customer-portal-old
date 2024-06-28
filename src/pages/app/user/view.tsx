import * as z from "zod"

import { PageLayout } from "@/components/layout/page-layout";
import { FormLayout } from "@/components/layout/form-layout";
import { FormButtonPalette } from "@/components/layout/form-button-palette";
import { PageButtonPalette } from "@/components/layout/page-buttons-palette";

import { PasswordInput } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "@/lib/definitions";
import { UserAPI } from "@/api/users";
import { InputForm } from "@/components/input-form";
import { SelectForm } from "@/components/select-form";

const schema = z.object({
  role: z.string(),
  name: z.string(),
  email: z.string().email({message: "E-mail inválido"}),
  password: z.string(),
  cpfcnpj: z.string()
}).required();

export function UserView() {
  const userAPI = new UserAPI;
  const { paramId } = useParams();
  const navigate = useNavigate();
  
  const form = useForm<IUser>({
    resolver: zodResolver(schema),
    defaultValues: 
      async () => {
        return await userAPI.Get(paramId);        
      }
  });

  async function onSubmit (data: IUser) {
    if (paramId)
      await userAPI.Update(paramId, data)
    else
      await userAPI.Create(data);

    navigate('/app/user');
  }

  return (
    <PageLayout>
      <PageButtonPalette buttons={[ { name: "Voltar", color: "gray", src: '/app/user' } ]} />
      
      <FormLayout>
        <FormProvider {...form}>
          <form 
            id='form-viewuser' 
            className="grid grid-cols-4 gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <SelectForm label='Perfil' typeName="type_role" fieldName="role" />
            <InputForm label='Nome' fieldName="name" className="col-span-2"/>
            <InputForm label='CPF' fieldName="cpfcnpj" mask="cpf"/>
            
            <InputForm label='E-mail' fieldName="email" className="col-span-2"/>
            <PasswordInput label="Senha" {...form.register("password")} className="col-span-2" />

            <FormButtonPalette isSubmitting={form.formState.isSubmitting} className="col-span-4" />
          </form>
        </FormProvider>
      </FormLayout>
    </PageLayout>  
  )
}