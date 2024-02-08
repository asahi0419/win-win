import axios from '../config'
import { REQUEST_API_URL } from 'config/config'

const PREFIX = 'admin'

export const getICOUsersAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/crowdsale/get-user-list`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}

export const deleteICOUserAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/crowdsale/delete-user`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}
