import axios from 'axios'
import { REQUEST_API_URL } from 'config/config'

const PREFIX = 'admin'

export const UserLogAPI = async (params: any) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/logs/history`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}
