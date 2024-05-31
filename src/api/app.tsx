import { sql } from '@vercel/postgres';
import { IUser } from '@/lib/definitions';
import bcrypt from 'bcryptjs';
 
interface IAPIResponse {
  status: 200 | 401 | 404 | 500,
  message: string
}

interface IAuthUser {
  email: string,
  password: string
}

export async function Authenticate(data: IAuthUser): Promise<IAPIResponse> { 
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

    return { status: 200, message: 'Sucesso!' }
  } catch (error) {    
    console.log(error);
    return {
      status: 500,
      message: 'Erro desconhecido: ' + error
    };    
  }
}