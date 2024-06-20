export interface IAuthUser {
  email: string,
  password: string
}

export interface IUser {
  id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  cpfcnpj: string,
  create_at: string,
  update_at: string
}