export interface IAuthUser {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  cpfcnpj: string;
  status: string;
  status_id: string;
  create_at: string;
  update_at: string;
}

export interface IContract {
  dateIssue: string;
  motoristName: string;
  documentNumber: string;
  documentSeries: string;
  documentPdfBase64: string;
}

export interface ICompany {
  id: string;
  code: number;
  name: string;
  image: string;
  cnpj: string;
  create_at: string;
  update_at: string;
}

export interface IResponseErrorData {
  error: string;
}

export type typeMask =
  | "cep"
  | "cpf"
  | "cnpj"
  | "date"
  | "tel"
  | "cel"
  | undefined;
