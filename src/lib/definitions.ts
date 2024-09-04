export interface IUser {
  id?: string;
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

export interface IContract {
  id: string;
  dateIssue: string;
  motoristName: string;
  documentNumber: string;
  documentSeries: string;
  documentPdfBase64: string;
}

export interface ICompany {
  id?: string;
  code: string;
  name: string;
  image?: string;
  cnpj?: string;
  create_at?: string;
  update_at?: string;
}

export interface IResponseArrayErrorData {
  message: [IResponseErrorData];
}

export interface IResponseErrorData {
  message: string;
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

export type type_role = "ADMIN" | "USER";

export type typeMask =
  | "cep"
  | "cpf"
  | "cnpj"
  | "date"
  | "tel"
  | "cel"
  | undefined;
