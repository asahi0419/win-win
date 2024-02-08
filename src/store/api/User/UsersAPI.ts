import axios from '../config'
import { REQUEST_API_URL } from 'config/config'

const PREFIX = 'admin'

export const getUsersFilterAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/users/list`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}

export const deleteUserAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/users/delete`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}

export const updateUserAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/users/set_balance`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}

export const emailVerifyAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/users/update_email_verify`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}

export const phoneVerifyAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/users/update_phone_verify`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}

export const updateUserListAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/users/update`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}

export const createUserAPI = async (params: FormData) => {
  var jwtToken = localStorage.getItem('jwtToken')
  return axios.post(`${REQUEST_API_URL}/${PREFIX}/users/create`, params, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
}
