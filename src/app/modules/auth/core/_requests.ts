import axios from 'axios'
import { AuthModel } from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const LOGIN_URL = `${API_URL}/api/v1/user`

export function login(user: string, secret: string, magic = 'avansoft') {
    return axios.post<AuthModel>(LOGIN_URL, {
        user,
        secret,
        magic
    })
}
