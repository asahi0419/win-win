import axios from 'axios'
import { REQUEST_API_URL } from 'config/config'

const PREFIX = 'admin'

export const getSettingDataAPI = async () => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(
    `${REQUEST_API_URL}/${PREFIX}/settings/get`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    },
  )
}

export const getCoinPairListAPI = async () => {
  return axios.post(`${REQUEST_API_URL}/coinpair/list`)
}

export const addCoinPairAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/admin/coinpair/add`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}

export const deleteCoinPairAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/admin/coinpair/delete`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}
