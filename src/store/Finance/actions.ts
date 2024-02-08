import { createAsyncThunk } from '@reduxjs/toolkit'
import { fiatAPI, cryptoAPI, ICOHistoryAPI } from '../api/finance'

const getCryptoHistory = createAsyncThunk('crypto/get/history', async (params: FormData) => {
  const response = await cryptoAPI(params)
  return response.data
})

const getFiatHistory = createAsyncThunk('fiat/get/history', async (params: FormData) => {
  const response = await fiatAPI(params)
  return response.data
})

const getICOHistory = createAsyncThunk('ico/get/history', async (params: FormData) => {
  const response = await ICOHistoryAPI(params)
  return response.data
})

export { getCryptoHistory, getFiatHistory, getICOHistory }
