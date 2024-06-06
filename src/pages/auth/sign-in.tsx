import logo from '@/assets/coopermapp.png';
import * as z from "zod"

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput, PasswordInput } from '@mantine/core';
import { IconAt, IconInfoCircle, IconLock } from '@tabler/icons-react'
import { useState } from 'react';
import { useTimeout } from '@mantine/hooks';
import { Authenticate } from '@/api/auth';

const schema = z.object({
  email: z.string().email({message: "E-mail inválido"}),
  password: z.string(),
}).required();

type Schema = z.infer<typeof schema>

export function SignIn() {
  const navigate = useNavigate();
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
    const res = await Authenticate(data);
    
    if (res.status !== 200) {
      setErrorAuth(res.message);
      start();

      return;
    }

    navigate('/app/dashboard');
  }

  return (
    <div className="flex flex-col items-center h-screen pt-36 bg-gradient-to-t from-slate-100 to-slate-200 ">  
      <img src={logo} className="absolute w-24 rounded-xl shadow-lg -mt-12" />      
      <div className="flex flex-col items-center justify-center w-80 h-72 border shadow-md rounded-md pt-8 bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-12 justify-center w-4/5 space-y-3">
          <TextInput
            {...register("email")} 
            className="w-full"
            placeholder="E-mail" 
            type="email" 
            leftSection={ <IconAt size={16} /> }
            error={errors.email?.message}
          />
          
          <PasswordInput 
            {...register("password")} 
            className="w-full"
            placeholder="Senha" 
            type="password"
            leftSection={ <IconLock size={16} /> }
          />
          
          <Button 
            type="submit" 
            loading={isSubmitting} 
            loaderProps={{ type: 'dots' }} 
            className="w-full"
            disabled={isSubmitting}
          >
            Entrar
          </Button>
        </form>
        <div id='message-error-login' className='flex justify-center items-center h-full w-full'>
          { errorAuth 
            ?
            <div className='flex flex-row w-4/5 items-center'>
              <IconInfoCircle className='text-red-500 mr-4' size={20} />
              <h1 className=''>{errorAuth}</h1>
            </div>
            : 
            <></>
          }
        </div>
      </div>      
    </div>
  )
}