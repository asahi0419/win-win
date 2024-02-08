import { SettingResType, CoinPairType, NotificationType } from '../../types/Setting'

interface SettingStateType {
  settingRes: SettingResType
  coinPairList: CoinPairType[]
  response: any
}

export type { SettingStateType }
