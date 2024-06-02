import { sql } from '@vercel/postgres';
import { IUser } from '@/lib/definitions';
import bcrypt from 'bcryptjs';

export async function GetUsers(): Promise<IUser[]> { 
  try {
    const res = await sql<IUser>
      ` SELECT a.*, b.name acess_profile
          FROM users a
          LEFT JOIN type_acess_profile b on b.id = a.acess_profile_id
      `;
      return res.rows;
  } catch (error) {
    throw(error);
  }
}