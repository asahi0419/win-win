export declare interface SettingResType {
  Success?: boolean
  Data?: settingDataType
  Error?: SettingErrorType
}

export declare interface settingDataType {
  Fee?: number
  HMindex?: number
  HotMnemonic?: string
  Mnemonic?: string
  Timestamp?: number
  Withdraw?: number
  WithdrawFee?: number
}

export declare interface SettingErrorType {
  Fee?: number
  HMindex: number
  HotMnemonic: string
  Mnemonic: string
  MSG: string
}

export declare interface CoinPairType {
  Id?: string
  Pair?: string
  Price?: number
}

export declare interface NotificationType {
  title?: string
  status?: boolean
}
