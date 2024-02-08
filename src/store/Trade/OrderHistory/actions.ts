import { createAsyncThunk } from '@reduxjs/toolkit'
import { getOrderHistoryFilterAPI } from '../../api/Trade/OrderHistoryAPI'

const getOrderHistoryFilter = createAsyncThunk('orderhistory/filter', async (params: FormData) => {
  const response = await getOrderHistoryFilterAPI(params)
  return response.data
})

export { getOrderHistoryFilter }
