import * as z from "zod"
import { PageLayout } from "@/components/page-layout";
import { PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { GetUser } from "@/api/users";
import { IUser } from "@/lib/definitions";
import { FormLayout } from "@/components/form-layout";
import { FormButtonPalette } from "@/components/form-button-palette";

const schema = z.object({
  perfil: z.string(),
  name: z.string(),
  email: z.string().email({message: "E-mail inválido"}),
  password: z.string(),
}).required();

export function UserView() {
  const { paramId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IUser>({
    resolver: zodResolver(schema),
    defaultValues: 
      async () => {
        return await GetUser(paramId);
      }
  });

  async function onSubmit (data: IUser) {
    console.log(data);
  }

  return (
    <PageLayout>
      <FormLayout>
        
        <form 
          id='form-viewuser' 
          className="grid grid-cols-2 gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput label='Perfil' {...register("acess_profile_id")} />
          <TextInput label='Nome' {...register("name")}/>
          <TextInput label='E-mail' {...register("email")}/>
          <PasswordInput label="Senha" {...register("password")} />

          <FormButtonPalette isSubmitting={isSubmitting} className="col-span-2" />
        </form>        

      </FormLayout>
    </PageLayout>  
  )
}