import { ReactNode, createContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { IPayloadJWT, IPayloadJWTUser } from "@/lib/definitions";
import { jwtDecode } from "jwt-decode";

type AppContextType = {
  user: IPayloadJWTUser | undefined;
  isAuthenticated: boolean;
  SignOut: () => void;
  SignIn: (prToken: string) => void;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext({} as AppContextType);

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<IPayloadJWTUser>();
  const isAuthenticated = user !== undefined;

  useEffect(() => {
    const { authorization: token } = parseCookies(null);

    if (token) {
      const payload = jwtDecode(token) as IPayloadJWT;

      setUser(payload.user);
    }
  }, []);

  async function SignOut() {
    destroyCookie(null, "authorization");
    setUser(undefined);
  }

  async function SignIn(prToken: string) {
    const payload = jwtDecode(prToken) as IPayloadJWT;

    setCookie(null, "authorization", prToken, {
      expires: new Date(payload.exp * 1000),
    });

    localStorage.setItem("companyCode", payload.user.companyCode);
    setUser(payload.user);
  }

  return (
    <AppContext.Provider value={{ user, isAuthenticated, SignOut, SignIn }}>
      {children}
    </AppContext.Provider>
  );
}
