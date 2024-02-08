import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getSettingData, getCoinPairList, addCoinPair, deleteCoinPair } from './action'
import type { SettingStateType } from './types'

const PREFIX = 'setting'

const initialState: SettingStateType = {
  settingRes: {
    Success: false,
    Data: {
      Fee: 0,
      HMindex: 0,
      HotMnemonic: '',
      Mnemonic: '',
      Timestamp: 0,
      Withdraw: 0,
    },
  },
  coinPairList: [],
  response: {},
}

const setSettingData = (state: SettingStateType, res: any) => {
  state.settingRes = res
}
const setCoinPairList = (state: SettingStateType, coinPairRes: any) => {
  if (coinPairRes.Success === true) {
    state.coinPairList = [...coinPairRes?.Data]
  }
}

export const settingReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettingData.fulfilled.type, (state: SettingStateType, action: PayloadAction<any>) => {
        setSettingData(state, action.payload)
      })
      .addCase(getCoinPairList.fulfilled.type, (state: SettingStateType, action: PayloadAction<any>) => {
        setCoinPairList(state, action.payload)
      })
      .addCase(addCoinPair.fulfilled.type, (state: SettingStateType, action: PayloadAction<any>) => {
        if (action.payload.res.Success === true) {
          state.coinPairList.push({ Pair: action.payload.pair, Price: 0 })
        }
        state.response = action.payload.res
      })
      .addCase(deleteCoinPair.fulfilled.type, (state: SettingStateType, action: PayloadAction<any>) => {
        if (action.payload.res.Success === true) {
          state.coinPairList = [
            ...state.coinPairList.slice(0, action.payload.pairIndex),
            ...state.coinPairList.slice(action.payload.pairIndex + 1, state.coinPairList.length),
          ]
        }
        state.response = action.payload.res
      })
  },
})

// export const {} = settingReducer.actions

export { getSettingData }

export default settingReducer.reducer
