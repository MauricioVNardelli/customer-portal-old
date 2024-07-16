import logo from '@/assets/coopermapp.png';
import * as z from "zod"

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput, PasswordInput } from '@mantine/core';
import { IconAt, IconInfoCircle, IconLock } from '@tabler/icons-react'
import { useState } from 'react';
import { useTimeout } from '@mantine/hooks';
import { Authenticate } from '@/api/auth';
import { setCookie } from 'nookies';

const schema = z.object({
  email: z.string().email({message: "E-mail inválido"}),
  password: z.string(),
}).required();

type Schema = z.infer<typeof schema>

export function SignIn() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [errorAuth, setErrorAuth] = useState("");
  const { start } = useTimeout(() => setErrorAuth(''), 3000);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  async function onSubmit (data: Schema) {
    await Authenticate(data)
    .then(() => {      

      if (clientId)
        setCookie(undefined, 'customer-portal.clientId', clientId);

      navigate('/app/dashboard');
    })
    .catch((error: Error) => {
      setErrorAuth(error.message);
      start();
    });    
  }

  return (
    <div className="flex flex-col items-center h-screen pt-36 bg-gradient-to-t from-slate-900 to-slate-950 ">  
      <img src={logo} className="absolute w-24 rounded-xl shadow-lg -mt-12" />      
      <div className="flex flex-col items-center justify-center w-80 h-72 shadow-lg shadow-black rounded-md pt-8 bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-12 justify-center w-4/5 space-y-3">
          <TextInput
            {...register("email")}
            placeholder="E-mail"
            type="email"
            leftSection={ <IconAt size={16} /> }
            error={errors.email?.message}
          />
          
          <PasswordInput 
            {...register("password")} 
            className=" bg-gray-600"
            placeholder="Senha" 
            type="password"
            leftSection={ <IconLock size={16} /> }
          />
          
          <Button 
            type="submit" 
            loading={isSubmitting} 
            loaderProps={{ type: 'dots' }}
            disabled={isSubmitting}
          >
            Entrar
          </Button>
        </form>
        <div id='message-error-login' className='flex justify-center items-center h-full w-full'>
          { 
            errorAuth 
            ?
            <div className='flex flex-row w-4/5 items-center'>
              <IconInfoCircle className='text-red-500 mr-4' size={20} />
              <h1 className='text-white'>{errorAuth}</h1>
            </div>
            : 
            <></>
          }
        </div>
      </div>      
    </div>
  )
}