import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCryptoHistory, getFiatHistory, getICOHistory } from './actions'

import type { financeState } from './types'

const PREFIX = 'financehistory'
const initialState: financeState = {
  historyList: [],
  rowsCount: 0,
}

const setFinanceHistoryList = (state: financeState, fiathistoryInfo: any) => {
  state.historyList = fiathistoryInfo.Data
  state.rowsCount = fiathistoryInfo.TotalCnt
}

export const financehistoryReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCryptoHistory.fulfilled.type, (state: financeState, action: PayloadAction<any>) => {
        setFinanceHistoryList(state, action.payload)
      })
      .addCase(getFiatHistory.fulfilled.type, (state: financeState, action: PayloadAction<any>) => {
        setFinanceHistoryList(state, action.payload)
      })
      .addCase(getICOHistory.fulfilled.type, (state: financeState, action: PayloadAction<any>) => {
        setFinanceHistoryList(state, action.payload)
      })
  },
})

export { getCryptoHistory, getFiatHistory, getICOHistory }
export default financehistoryReducer.reducer
