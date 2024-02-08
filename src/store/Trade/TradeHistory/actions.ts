import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTradeHistoryFilterAPI } from '../../api/Trade/TradeHistoryAPI'

const getTradeHistoryFilter = createAsyncThunk('tradehistory/get/filter', async (params: FormData) => {
  const response = await getTradeHistoryFilterAPI(params)
  // console.log('total count test', response.data.TotalCnt)
  // console.log('Hey, here is action', params.get('pair'), response.data)
  return response.data
})

export { getTradeHistoryFilter }
