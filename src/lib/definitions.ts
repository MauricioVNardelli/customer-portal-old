import {
  type_load,
  type_method,
  type_origin,
  type_role,
  type_scheduling,
} from "./constants";

export interface IAPIResponse {
  sucess: boolean;
  message: string;
}

export interface IResponseArrayErrorData {
  message: [IResponseErrorData];
}

export interface IResponseErrorData {
  message: string;
}

export interface ITableBase {
  id?: string;
}

export interface IUser extends ITableBase {
  name: string;
  email?: string;
  password?: string;
  role: string;
  cpf: string;
  status: string;
  statusId?: string;
  companyId: string;
  companyCode?: string;
}

export interface IScheduling extends ITableBase {
  type: type_scheduling;
  date: string;
  control_number: string;
  cnpj: string;
  carrier_cnpj: string;
  carrier_name: string;
  carrier_motorist: string;
  carriger_plate: string;
  container_type: string;
  container_code: string;
  type_load: type_load;
  demurrage: string;
  temperature: number;
}

//COMPANY
export interface ICompany extends ITableBase {
  code: string;
  name: string;
  image?: string;
  cnpj?: string;
  create_at?: string;
  update_at?: string;
}

export interface ICompanyEndpoint extends ITableBase {
  companyId: string;
  endpoint: string;
  method: type_method;
  origin: type_origin;
  create_at: string;
  update_at: string;
}

export interface IPayloadJWT {
  exp: number;
  iat: number;
  user: IPayloadJWTUser;
}

export interface IPayloadJWTUser {
  companyCode: string;
  companyId: string;
  email: string;
  name: string;
  role: type_role;
}
