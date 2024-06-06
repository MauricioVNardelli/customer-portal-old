import { parseCookies } from "nookies";
import { IUser } from "./definitions";

export function GetSessionUser(): IUser {
  const cookies = parseCookies();
  const user: IUser = JSON.parse(cookies['customer-portal.user']);

  return user;
}