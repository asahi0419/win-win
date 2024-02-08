import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTradeHistoryFilter } from './actions'

import type { tradehistoryState } from './types'
import { TradeHistoryInfoType } from '../../../types/Tradehistory'

const PREFIX = 'trade/tradehistory'
const initialState: tradehistoryState = {
  tradeHistoryList: [],
  rowsCount: 0,
}

const setTradeHistoryList = (state: tradehistoryState, tradehistoryInfo: TradeHistoryInfoType) => {
  state.tradeHistoryList = tradehistoryInfo.Data
  state.rowsCount = tradehistoryInfo.TotalCnt
}

export const tradehistoryReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTradeHistoryFilter.fulfilled.type, (state: tradehistoryState, action: PayloadAction<any>) => {
      setTradeHistoryList(state, action.payload)
    })
  },
})

export { getTradeHistoryFilter }
export default tradehistoryReducer.reducer
