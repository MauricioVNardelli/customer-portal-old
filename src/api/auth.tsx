import { IAuthUser } from "@/lib/definitions";
import { setCookie } from 'nookies';
import { api } from '@/services/api';
import { AxiosError } from "axios";

interface IRes200 {
  id: string,
  name: string,
  email: string,
  token: string
}

interface IErrorAPI {
  error?: string
}

export async function Authenticate(data: IAuthUser) { 

  await api.post('/session', data)
  .then((response) => {
    const data: IRes200 = response.data;

    setCookie(undefined, 'customer-portal.token', data.token, {
      maxAge: 60 * 60 * 24, // 24 hour
    });
    
    api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
  })
  .catch((error: AxiosError) => {
    const message = error.response?.data as IErrorAPI;

    throw new Error(message.error);
  })
}
