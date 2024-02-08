/** @format */

import axios from 'axios'
import { REQUEST_API_URL } from 'config/config'

const PREFIX = 'admin'

export const cryptoAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/dwhistory/filter`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}

export const fiatAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/fiat/filter`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}

export const ICOHistoryAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/icohistory/filter`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}
