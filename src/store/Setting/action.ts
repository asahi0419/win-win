import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSettingDataAPI, getCoinPairListAPI, addCoinPairAPI, deleteCoinPairAPI } from '../api/setting'

const getSettingData = createAsyncThunk('setting/get/settingData', async () => {
  const response = await getSettingDataAPI()
  return response.data
})

const getCoinPairList = createAsyncThunk('setting/get/coinPairList', async () => {
  const response = await getCoinPairListAPI()
  return response.data
})

const addCoinPair = createAsyncThunk('setting/add/coinPair', async (params: FormData) => {
  const response = await addCoinPairAPI(params)
  return { res: response.data, pair: params.get('pair') }
})

const deleteCoinPair = createAsyncThunk('setting/delete/coinPair', async (params: any) => {
  let deleteFormData = new FormData()
  deleteFormData.append('pair_id', params.pairId)
  const response = await deleteCoinPairAPI(deleteFormData)

  return { res: response.data, pairIndex: params.key }
})

export { getSettingData, getCoinPairList, addCoinPair, deleteCoinPair }
