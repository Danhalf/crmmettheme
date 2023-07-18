import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const LOGIN_URL = `${API_URL}/api/v1/user`

// Server should return AuthModel
export function login(user: string, secret: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    user,
    secret,
    magic: 'avansoft',
  })
}

export function getUserByUserId(uid: string) {
  return axios.post<UserModel>(`${LOGIN_URL}/${uid}`, {
    uid,
  })
}
