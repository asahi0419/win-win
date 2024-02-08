import type { RootState } from '../store'

export const selectFinancehistorylist = (state: RootState) => state.finance.historyList
export const selectFinancehistoryTotalCnt = (state: RootState) => state.finance.rowsCount
