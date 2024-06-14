import { Button, PasswordInput } from "@mantine/core";
import { IconInfoCircle, IconLock } from "@tabler/icons-react";
import { FocusEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useTimeout } from "@mantine/hooks";

type IInput = {
  password: string,
  newPassword: string,
  confirmPassword: string
}

type ModalChangePasswordProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalChangePassword(props: ModalChangePasswordProps) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<IInput>();
  const [correctPass, setCorrectPass] = useState(false);
  const { start } = useTimeout(() => clearErrors(), 3000);

  async function onSubmit (data: IInput) {
    if (data.newPassword != data.confirmPassword) {
      setError('newPassword', { type: 'passwordIncorrect', message: 'As senhas não conferem' }, {shouldFocus: true});
      start();

      return;
    }

    props.setOpenModal(false);
  }

  function onBlurPassword(event: FocusEvent<HTMLInputElement>) {
    event.preventDefault();

    if (false) {
      setError('password', { type: 'passwordIncorrect', message: 'Senha incorreta' }, {shouldFocus: true});
      start();

      return;
    }

    setCorrectPass(true);
  }

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput 
          {...register("password")} 
          className="w-full mb-4"
          placeholder="Senha atual" 
          type="password"
          leftSection={ <IconLock size={16} /> }
          onBlur={onBlurPassword}
          error={errors.password?.message}
          disabled={correctPass}
        />

        <PasswordInput 
          {...register("newPassword")} 
          className="w-full mb-4"
          placeholder="Nova senha" 
          type="password"
          leftSection={ <IconLock size={16} /> }
          disabled={!correctPass}
        />

        <PasswordInput
          {...register("confirmPassword")} 
          className="w-full mb-4"
          placeholder="Confirmar senha" 
          type="password"
          leftSection={ <IconLock size={16} /> }
          disabled={!correctPass}
        />        
        
        <Button
          type="submit" 
          loading={isSubmitting} 
          loaderProps={{ type: 'dots' }} 
          className="w-full bg-gray-800 enabled:hover:bg-gray-700"
          disabled={isSubmitting || !correctPass}
        >
          Alterar
        </Button>

        { errors.newPassword?.message
          ?
          <div className='flex flex-row items-center my-4'>
            <IconInfoCircle className='text-red-500 mr-4' size={20} />
            <h1 className=''>{errors.newPassword?.message}</h1>
          </div>
          : 
          <></>
          }
      </form>
    </div>
  )
}