import { ReactNode, createContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { IPayloadJWT, IPayloadJWTUser } from "@/lib/definitions";
import { jwtDecode } from "jwt-decode";
import { CompanyAPI } from "@/api/company";

type AppContextType = {
  user: IPayloadJWTUser | undefined;
  isAuthenticated: boolean;
  companyName: string;
  SignOut: () => void;
  SignIn: (prToken: string) => void;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext({} as AppContextType);

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<IPayloadJWTUser>();
  const [companyName, setCompanyName] = useState<string>("");
  const isAuthenticated = user !== undefined;

  useEffect(() => {
    const { authorization: token } = parseCookies(null);

    if (token) {
      const payload = jwtDecode(token) as IPayloadJWT;

      setUser(payload.user);
      getCompany(payload.user.companyId);
    }
  }, []);

  async function SignOut() {
    destroyCookie(null, "authorization");

    setUser(undefined);
    setCompanyName("");
    localStorage.clear();
  }

  async function SignIn(prToken: string) {
    const payload = jwtDecode(prToken) as IPayloadJWT;

    setCookie(null, "authorization", prToken, {
      expires: new Date(payload.exp * 1000),
      path: "/app",
    });

    localStorage.setItem("companyCode", payload.user.companyCode);
    setUser(payload.user);
    getCompany(payload.user.companyId);
  }

  function getCompany(prCompany: string) {
    const api = new CompanyAPI();
    api.Get(prCompany).then((value) => {
      setCompanyName(value.name);
    });
  }

  return (
    <AppContext.Provider
      value={{ user, isAuthenticated, SignOut, SignIn, companyName }}
    >
      {children}
    </AppContext.Provider>
  );
}
