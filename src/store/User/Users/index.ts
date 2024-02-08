import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUsersFilter, updateUser, deleteUser } from './actions'
import type { usersState } from './types'

const PREFIX = 'admin/users'

const initialState: usersState = {
  userList: [],
  status: 0,
  rowsCount: 0,
  Success: false,
  updateSuccess: false,
}

const setUserList = (state: usersState, users: any) => {
  state.userList = users.Data
  state.rowsCount = users.TotalCnt
}

const deleteUserStatus = (state: usersState, value: any) => {
  state.Success = value.Success
}

const updateUserStatus = (state: usersState, value: any) => {
  state.updateSuccess = value.Success
}

export const usersReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.fulfilled.type, (state: usersState, action: PayloadAction<any>) => {
        updateUserStatus(state, action.payload)
      })
      .addCase(getUsersFilter.fulfilled.type, (state: usersState, action: PayloadAction<any>) => {
        setUserList(state, action.payload)
        state.Success = false
        state.updateSuccess = false
      })
      .addCase(deleteUser.fulfilled.type, (state: usersState, action: PayloadAction<any>) => {
        deleteUserStatus(state, action.payload)
      })
  },
})

export { getUsersFilter, deleteUser, updateUser }

export default usersReducer.reducer
