import axios from '../config'
import { REQUEST_API_URL } from 'config/config'

const PREFIX = 'trade/depositwithdrawhistory'

export const getDepositWithdrawHistoryFilterAPI = async (params: FormData) =>
  axios.get(`${REQUEST_API_URL}/${PREFIX}/filter`, { params })
