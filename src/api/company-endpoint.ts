import { IAPIResponse, ICompanyEndpoint } from "@/lib/definitions";
import { TreatError } from "@/lib/utils";
import { api } from "@/services/api";
import { z } from "zod";

const schema = z
  .object({
    endpoint: z.string().url({ message: "URL inválida" }),
    method: z.string(),
    origin: z.string(),
  })
  .required();

export class CompanyEndpointAPI {
  constructor() {
    //
  }

  async Create(
    prCompanyId: string,
    prData: ICompanyEndpoint
  ): Promise<IAPIResponse> {
    try {
      const result = schema.safeParse(prData);

      if (!result.success) throw new Error(result.error.errors[0].message);

      await api.post(`/company/${prCompanyId}/endpoint`, prData);

      return {
        sucess: true,
        message: "Registro criado com sucesso",
      };
    } catch (error) {
      return TreatError(error);
    }
  }

  async Get(prCompanyId: string | undefined): Promise<ICompanyEndpoint[]> {
    const response = await api.get(`company/${prCompanyId}/endpoints`);

    return response.data;
  }

  async Delete(prId: string): Promise<IAPIResponse> {
    try {
      await api.delete(`company/endpoint/${prId}`);

      return {
        sucess: true,
        message: "Registro deletado com sucesso",
      };
    } catch (error) {
      return TreatError(error);
    }
  }
}
