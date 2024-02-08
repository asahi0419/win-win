import axios from '../config'
import { REQUEST_API_URL } from 'config/config'

const PREFIX = 'admin'

export const getOrderHistoryFilterAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/orders/filter`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}
