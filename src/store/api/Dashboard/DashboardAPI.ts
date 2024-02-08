import axios from '../config'
import { REQUEST_API_URL } from 'config/config'

const PREFIX = 'admin'

export const getDashboardAPI = async () => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(
    `${REQUEST_API_URL}/${PREFIX}/users/dashboard`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    },
  )
}
