import { parseCookies } from "nookies";
import { decodeToken } from "react-jwt";

interface IPayloadToken {
  email: string,
  name: string
}

export function GetSessionUser(): IPayloadToken {
  const cookies = parseCookies();
  const token = cookies['customer-portal.token'];
  
  const user = decodeToken(token) as IPayloadToken;

  return user;
}