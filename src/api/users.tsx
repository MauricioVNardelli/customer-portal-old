import bcrypt from 'bcryptjs';

import { sql } from '@vercel/postgres';
import { ApiResponse, IUser } from '@/lib/definitions';
import { GetSessionUser } from '@/lib/session';

export async function GetUsers(): Promise<IUser[]> { 
  try {
    const res = await sql<IUser>` 
      SELECT a.*, b.name acess_profile
        FROM users a
        LEFT JOIN type_acess_profile b on b.id = a.acess_profile_id
      `;
    
    return res.rows;
  } catch (error) {
    throw(error);
  }
}

export async function GetUser(prId: string | undefined): Promise<IUser> { 
  try {
    const res = await sql<IUser>` 
      SELECT a.*, b.name acess_profile
        FROM users a
        LEFT JOIN type_acess_profile b on b.id = a.acess_profile_id
       WHERE a.id = ${prId}
      `;
    
    return res.rows[0];
  } catch (error) {
    throw(error);
  }
}

export async function ChangePasswordUser(prNewPass: string): Promise<ApiResponse> {
  const passHash = bcrypt.hashSync(prNewPass);
  const user = GetSessionUser()

  await sql<IUser>`
    UPDATE users
        SET password = ${passHash}
      WHERE id = ${user.id}
  `
  .then(() => {
    return {
      status: 200,
      message: 'Sucesso'
    }
  })
  .catch((err) => {
    return {
      status: 500,
      message: err 
    }
  })

  return {
    status: 401,
    message: ""
  }
}