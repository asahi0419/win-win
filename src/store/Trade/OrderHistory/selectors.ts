import type { RootState } from '../../store'

export const selectOrderhistorylist = (state: RootState) => state.orderHistory.orderHistoryList

export const selectOrderhistoryTotalCnt = (state: RootState) => state.orderHistory.rowsCount
