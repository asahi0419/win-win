import axios from '../config'
import { REQUEST_API_URL } from 'config/config'

const PREFIX = 'admin'

export const getTradeHistoryFilterAPI = async (params: any) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/tradehistory/filter`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}
