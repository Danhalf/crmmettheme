import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const LOGIN_URL = `${API_URL}/api/v1/user`
export const REGISTER_URL = `${API_URL}/register`

// Server should return AuthModel
export function login(user: string, secret: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    user,
    secret,
    magic: 'avansoft',
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

export function getUserByUserId(uid: string) {
  return axios.post<UserModel>(`${LOGIN_URL}/${uid}`, {
    uid,
  })
}
