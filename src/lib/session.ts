import { parseCookies } from "nookies";
import { decodeToken } from "react-jwt";

interface IPayloadToken {
  id: string,
  email: string,
  name: string,
  password: string,
  role: string
}

export function GetSessionUser(): IPayloadToken {
  const cookies = parseCookies();
  const token = cookies['customer-portal.token'];
  
  const user = decodeToken(token) as IPayloadToken;

  return user;
}