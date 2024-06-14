import { api } from "@/services/api";

interface IResponse {
  value: string
}

export async function GetEnum(prTypeName: string): Promise<IResponse[]> {   
  const response = await api.get('/enum', {
    params: {
      name: prTypeName
    }
  })

  return response.data;
}