import { IUser } from "@/lib/definitions";
import { api } from "@/services/api";

const path = "/user";

export class UserAPI {
  constructor() {
    //
  }

  async GetAll(): Promise<IUser[]> {
    const companyId = localStorage.getItem("companyCode");
    const response = await api.get("/company/" + companyId + "/users");

    return response.data;
  }

  async Get(prId: string | undefined): Promise<IUser> {
    const response = await api.get(`${path}/${prId}`);

    return response.data;
  }

  async Update(prId: string | undefined, prUser: IUser): Promise<IUser> {
    const data = {
      name: prUser.name,
      cpf: prUser.cpf,
      role: prUser.role,
      status: prUser.status,
      companyId: prUser.companyId,
    };

    const response = await api.patch(`${path}/${prId}`, data);

    return response.data;
  }

  async Create(prUser: IUser): Promise<IUser> {
    const data = {
      name: prUser.name,
      email: prUser.email,
      password: prUser.password,
      cpf: prUser.cpf,
      role: prUser.role,
      companyId: prUser.companyId,
    };

    const response = await api.post(path, data);

    return response.data;
  }
}
