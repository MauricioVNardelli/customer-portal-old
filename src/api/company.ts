import { ICompany } from "@/lib/definitions";
import { api } from "@/services/api";

const path = "/company";

export class CompanyAPI {
  constructor() {
    //
  }

  async GetAll(): Promise<ICompany[]> {
    const response = await api.get(path);

    return response.data;
  }

  async Get(prId: string | undefined): Promise<ICompany> {
    const response = await api.get(`${path}/${prId}`);

    return response.data;
  }

  async Update(
    prId: string | undefined,
    prCompany: ICompany
  ): Promise<ICompany> {
    const response = await api.put(`${path}?id=${prId}`, prCompany);

    return response.data;
  }

  async Create(prCompany: ICompany): Promise<ICompany> {
    const response = await api.post(path, prCompany);

    return response.data;
  }
}
