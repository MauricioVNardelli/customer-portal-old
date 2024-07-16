import { IContract } from '@/lib/definitions';
import { api } from '@/services/api';

const path = '/contract';

export class ContractAPI {

  constructor() {
    //
  }

  async GetAll(): Promise<IContract[]> { 
    const response = await api.get(path);
  
    return response.data;
  }
}