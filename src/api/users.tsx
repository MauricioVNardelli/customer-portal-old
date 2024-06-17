import { IUser } from '@/lib/definitions';
import { api } from '@/services/api';

const path = '/user';

export class UserAPI {

  constructor() {
    //
  }

  async GetAll(): Promise<IUser[]> { 
    const response = await api.get(path);
  
    return response.data;
  }
  
  async Get(prId: string | undefined): Promise<IUser> { 
    const response = await api.get(`${path}?id=${prId}`);
  
    return response.data;
  }
  
  async Update(prId: string | undefined, prUser: IUser): Promise<IUser> {  
    const response = await api.put(`${path}?id=${prId}`, prUser)
  
    return response.data;
  }

  async Create(prUser: IUser): Promise<IUser> {  
    const response = await api.post(path, prUser);
  
    return response.data;
  }  

}