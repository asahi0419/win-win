export declare interface TradeHistoryTableType {
  OrderId?: number
  UserId?: number
  Pair?: string
  Side?: number
  Price?: number
  Excuted?: number
  Free?: number
  Timestamp?: number
}

export declare interface TradeHistoryInfoType {
  Data: TradeHistoryTableType[]
  Success: boolean
  TotalCnt: number
  Error: any
}
