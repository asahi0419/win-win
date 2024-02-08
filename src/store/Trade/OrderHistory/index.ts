import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getOrderHistoryFilter } from './actions'

import type { orderHistoryState } from './types'
import { OrderHistoryInfoType } from '../../../types/Orderhistory'

const PREFIX = 'trade/orderHsitory'
const initialState: orderHistoryState = {
  orderHistoryList: [],
  rowsCount: 0,
}

const setorderHistoryList = (state: orderHistoryState, orderhistoryInfo: OrderHistoryInfoType) => {
  state.orderHistoryList = orderhistoryInfo.Data
  state.rowsCount = orderhistoryInfo.TotalCnt
}

export const orderhistorysReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderHistoryFilter.fulfilled.type, (state: orderHistoryState, action: PayloadAction<any>) => {
      setorderHistoryList(state, action.payload)
    })
  },
})

export { getOrderHistoryFilter }
export default orderhistorysReducer.reducer
