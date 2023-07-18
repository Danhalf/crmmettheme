export interface AuthModel {
  token: string
  useruid: string
}

export interface UserModel {
  id: number | string
  username: string
  password: string | undefined
  auth?: AuthModel
  token?: string
}
