import jwtEncode from "jwt-encode";

import { api } from "@/services/api";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

interface IErrorAPIJoi {
  message: [
    {
      message: string;
    }
  ];
}

interface IAuthUser {
  email: string;
  password: string;
  companyCode: string;
}

type PayloadJWT = {
  user: {
    companyCode: string;
    email: string;
    name: string;
  };
};

export async function Authenticate(
  data: IAuthUser
): Promise<PayloadJWT | undefined> {
  try {
    const response = await api.post("/auth/user", data);
    const responseAuth = response.data as {
      sessionKey: string;
    };

    const jwt = jwtEncode({}, import.meta.env.VITE_SECRET_KEY);

    return await api
      .get(`/auth/user/session/${responseAuth.sessionKey}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((prResponseSession) => {
        const responseSession = prResponseSession.data as { token: string };
        const payload = jwtDecode(responseSession.token) as PayloadJWT;

        api.defaults.headers[
          "Authorization"
        ] = `Bearer ${responseSession.token}`;

        return payload;
      });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const data = error.response?.data as { message: string | [] };

      if (Array.isArray(data.message)) {
        const response = error.response?.data as IErrorAPIJoi;

        throw new Error(response.message[0].message);
      }

      const response = error.response?.data as { message: string };

      throw new Error(response.message);
    }
  }
}
