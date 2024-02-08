import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createUser, loginUser } from './actions'
import type { authState } from './types'

const PREFIX = 'auth'

const initialState: authState = {
  createUsers: {},
  loginUser: {},
}

const setUserRegister = (state: authState, users: any) => {
  state.createUsers = users
}
const setUserLogin = (state: authState, users: any) => {
  state.loginUser = users
}

export const authReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled.type, (state: authState, action: PayloadAction<any>) => {
        setUserRegister(state, action.payload)
      })
      .addCase(loginUser.fulfilled.type, (state: authState, action: PayloadAction<any>) => {
        setUserLogin(state, action.payload)
      })
  },
})

export { createUser, loginUser }

export default authReducer.reducer
