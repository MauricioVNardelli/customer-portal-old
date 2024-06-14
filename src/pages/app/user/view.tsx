import * as z from "zod"
import { PageLayout } from "@/components/page-layout";
import { PasswordInput, TextInput } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { CreateOrUpdateUser, GetUser } from "@/api/users";
import { IUser } from "@/lib/definitions";
import { FormLayout } from "@/components/form-layout";
import { FormButtonPalette } from "@/components/form-button-palette";
import { PageButtonPalette } from "@/components/page-buttons-palette";
import { MyFormSelect } from "@/components/select";

const schema = z.object({
  role: z.string(),
  name: z.string(),
  email: z.string().email({message: "E-mail inválido"}),
  password: z.string(),
}).required();

export function UserView() {
  const { paramId } = useParams();
  const navigate = useNavigate();
  
  const form = useForm<IUser>({
    resolver: zodResolver(schema),
    defaultValues: 
      async () => {
        return await GetUser(paramId);        
      }
  });

  async function onSubmit (data: IUser) {
    await CreateOrUpdateUser(paramId, data);

    navigate('/app/user');
  }

  return (
    <PageLayout>
      <PageButtonPalette buttons={[ { name: "Voltar", color: "gray", src: '/app/user' } ]} />
      
      <FormLayout>
        <FormProvider {...form}>
          <form 
            id='form-viewuser' 
            className="grid grid-cols-2 gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <MyFormSelect label='Perfil' typeName="type_role" fieldName="role" />
            <TextInput label='Nome' {...form.register("name")}/>
            <TextInput label='E-mail' {...form.register("email")}/>
            <PasswordInput label="Senha" {...form.register("password")} />

            <FormButtonPalette isSubmitting={form.formState.isSubmitting} className="col-span-2" />
          </form>
        </FormProvider>
      </FormLayout>
    </PageLayout>  
  )
}