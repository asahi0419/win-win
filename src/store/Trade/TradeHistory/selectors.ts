import type { RootState } from '../../store'

export const selectTradehistorylist = (state: RootState) => state.tradehistory.tradeHistoryList
export const selectTradehistoryTotalCnt = (state: RootState) => state.tradehistory.rowsCount
