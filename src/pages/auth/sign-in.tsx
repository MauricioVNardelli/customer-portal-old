import login from "@/assets/AR/login.jpg";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Authenticate } from "@/api/auth";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { toast } from "sonner";
import { useContext, useEffect } from "react";
import { AppContext } from "@/contexts/app-context";
import clsx from "clsx";
import { Logo } from "./logo";

const schema = z
  .object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deverá conter no mínimo 8 caracteres" }),
  })
  .required();

type Schema = z.infer<typeof schema>;

export function SignIn() {
  const navigate = useNavigate();
  const { companyCode } = useParams();
  const { SignIn: SignInCtx, isAuthenticated } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/app/dashboard");
  }, []);

  async function onSubmit(data: Schema) {
    try {
      const response = await Authenticate(data, companyCode as string);

      if (response?.token) {
        SignInCtx(response.token);

        navigate("/app/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }

  if (companyCode?.length == 36)
    return (
      <div className="flex h-screen bg-gradient-to-t from-slate-900 to-slate-950">
        <div className="w-full hidden lg:block ">
          <div
            id="content-logo"
            className="flex items-center justify-center w-full h-full bg-white dark:bg-slate-800"
          >
            <img src={login} className="h-full w-full" />
          </div>
        </div>

        <div className="w-full shadow-lg shadow-slate-800 lg:max-w-[560px]">
          <div
            className={clsx(
              "flex flex-col justify-center pt-2 px-10 w-full",
              "transition-all duration-700 md:px-20"
            )}
          >
            <div
              id="logo"
              className={clsx(
                "flex justify-center items-center w-full mt-10 mb-20"
              )}
            >
              <Logo
                companyCode={companyCode}
                className="max-h-[200px] max-w-[200px] "
              />
            </div>

            <h1 className="text-slate-400 text-xl font-bold pb-8">
              Acesse sua conta
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full"
            >
              <Input
                placeholder="E-mail"
                className="h-14"
                errorMessage={errors.email?.message}
                {...register("email")}
              />

              <Input
                placeholder="Senha"
                type="password"
                className="h-14 mt-4"
                errorMessage={errors.password?.message}
                {...register("password")}
              />

              <a
                href=""
                className="mt-2 mb-4 transition-colors text-purple-800 hover:text-purple-900"
              >
                Esqueci minha senha
              </a>

              <Button
                type="submit"
                isLoaling={isSubmitting}
                className="rounded-lg h-14 shadow-md transition-colors font-bold text-slate-300 bg-purple-800 hover:bg-purple-900"
              >
                Entrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-slate-700">
      <p className="text-white">Código do cliente não informado ou inválido</p>
    </div>
  );
}
