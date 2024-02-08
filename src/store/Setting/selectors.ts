import type { RootState } from '../store'

// Other code such as selectors can use the imported `RootState` type
export const selectSettingData = (state: RootState) => state.setting.settingRes

export const selectCoinPairList = (state: RootState) => state.setting.coinPairList

export const selectResponse = (state: RootState) => state.setting.response
