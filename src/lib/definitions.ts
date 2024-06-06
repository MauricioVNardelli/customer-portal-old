export interface IUser {
  id: string,
  name: string,
  email: string,
  password: string,
  acess_profile_id: string,
  acess_profile: string
}

export type ApiResponse = {
  status: 200 | 401 | 404 | 500,
  message: string
}