export const const_status = ["ATIVO", "DESATIVADO"];
export type type_status = "ATIVO" | "DESATIVADO";

export const const_method = ["POST", "GET", "PATCH"];
export type type_method = "POST" | "GET" | "PATCH";

export const const_role = ["ADMIN", "CLIENTE", "USUARIO"];
export type type_role = "ADMIN" | "CLIENTE" | "USUARIO";

export const const_origin = ["CONTAINER", "LACRE"];
export type type_origin = "CONTAINER" | "LACRE";

export const const_type_scheduling = ["ENTRADA", "SAIDA"];
export type type_scheduling = "ENTRADA" | "SAIDA";

export const const_type_load = ["CHEIO", "VAZIO"];
export type type_load = "CHEIO" | "VAZIO";

//
export type typeMask =
  | "cep"
  | "cpf"
  | "cnpj"
  | "date"
  | "tel"
  | "cel"
  | undefined;
