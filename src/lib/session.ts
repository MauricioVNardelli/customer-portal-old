import { parseCookies } from "nookies";
import { decodeToken } from "react-jwt";

interface IPayloadToken {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
}

export function GetSessionUser(): IPayloadToken {
  const cookies = parseCookies();
  const token = cookies["customer-portal.token"];

  const user = decodeToken(token) as IPayloadToken;

  if (user) return user;

  return {
    id: "teste1",
    email: "teste@email.com",
    name: "Name_Teste",
    password: "hash_password",
    role: "ADMIN",
  } as IPayloadToken;
}
