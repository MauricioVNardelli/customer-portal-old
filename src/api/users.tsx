import { IUser } from '@/lib/definitions';
import { api } from '@/services/api';

export async function GetUsers(): Promise<IUser[]> { 
  const response = await api.get('/user');

  return response.data;
}

export async function GetUser(prId: string | undefined): Promise<IUser> { 
  const response = await api.get(`/user?id=${prId}`);

  return response.data;
}

export async function CreateOrUpdateUser(prId: string | undefined, prUser: IUser): Promise<IUser> {  
  let response;
  
  if (prId)
    response = await api.put(`/user?id=${prId}`, prUser)
  else
    response = await api.post('/user', prUser);

  return response.data;
}

export async function ChangePasswordUser() {
  throw Error('Method not implemented');
}