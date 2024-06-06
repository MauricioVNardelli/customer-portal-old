import bcrypt from 'bcryptjs';

import { ApiResponse, IUser } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import { setCookie } from 'nookies';

export interface IAuthUser {
  email: string,
  password: string
}

export async function Authenticate(data: IAuthUser): Promise<ApiResponse> { 
  try {
    const res = await sql<IUser>
      `
        SELECT * 
          FROM users 
         WHERE email = ${data.email}
      `;

    if (res.rowCount == 0) {
      return {
        status: 404,
        message: 'Usuário não cadastrado!'
      }
    }

    if (res.rowCount == 1) {
      const passwordHash = res.rows[0].password;
      const IsAuthorized = await bcrypt.compare(data.password, passwordHash);

      if (!IsAuthorized) {
        return {
          status: 401,
          message: 'Senha incorreta!'
        }
      }
    }

    setCookie(undefined, 'customer-portal.token', 'authorized', {
      maxAge: 60 * 60 * 24, // 24 hour
    });

    setCookie(undefined, 'customer-portal.user', JSON.stringify(res.rows[0]) , {
      maxAge: 60 * 60 * 24, // 24 hour
    }); 

    return { status: 200, message: 'Sucesso!' }
  
  } catch (error) {

    return {
      status: 500,
      message: 'Erro desconhecido: ' + error
    };    
  }
}
