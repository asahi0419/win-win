import axios from 'axios'
import { REQUEST_API_URL } from 'config/config'

export const GetDepositBalance = async (params: FormData) => {
  try {
    var jwtToken = localStorage.getItem('jwtToken')
    const response = await axios.post(`${REQUEST_API_URL}/admin/crowdsale/get-deposit-balance`, params, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    return response
  } catch (error: any) {
    return console.log(error)
  }
}

export const GetZNXBalance = async (params: FormData) => {
  try {
    var jwtToken = localStorage.getItem('jwtToken')
    const response = await axios.post(`${REQUEST_API_URL}/admin/crowdsale/get-withdraw-balance`, params, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    return response
  } catch (error: any) {
    return console.log(error)
  }
}
