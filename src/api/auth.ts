import jwtEncode from "jwt-encode";

import { api } from "@/services/api";
import { AxiosError } from "axios";

interface IErrorAPIJoi {
  message: [
    {
      message: string;
    }
  ];
}

interface IDataAuthUser {
  email: string;
  password: string;
}

export async function Authenticate(
  data: IDataAuthUser,
  prCompanyCode: string
): Promise<{ token: string } | undefined> {
  try {
    const response = await api.post("/auth/user", {
      ...data,
      companyCode: prCompanyCode,
    });

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

        api.defaults.headers[
          "Authorization"
        ] = `Bearer ${responseSession.token}`;

        return responseSession;
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
