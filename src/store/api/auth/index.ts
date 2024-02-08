import axios from 'axios'
import { REQUEST_API_URL } from '../../../config/config'

const PREFIX = 'admin/users'

export const registerAPI = async (params: FormData) => axios.post(`${REQUEST_API_URL}/${PREFIX}/signup`, params)

export const loginAPI = async (params: FormData) => axios.post(`${REQUEST_API_URL}/${PREFIX}/signin`, params)
