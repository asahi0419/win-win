export declare interface OrderHistoryTableType {
  id?: number
  type?: string
  side?: number
  amount?: number
  filled?: number
  create_at?: string
  finished_at?: string
  pair?: string
  price?: boolean
  status?: boolean
  user_id?: number
}

export declare interface OrderHistoryInfoType {
  Data: OrderHistoryTableType[]
  Success: boolean
  TotalCnt: number
  Error: any
}
