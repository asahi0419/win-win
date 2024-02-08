import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getICOUsers, deleteICOUser } from './actions'
import type { icoUsersState } from './types'

const PREFIX = 'admin/icousers'

const initialState: icoUsersState = {
  icoUserList: [],
  status: 0,
  rowCnt: 0,
  Success: false,
  updateSuccess: false,
}

const setICOUserList = (state: icoUsersState, users: any) => {
  state.icoUserList = users.Data
  state.rowCnt = users.TotalCnt
}

const deleteICOUserStatus = (state: icoUsersState, value: any) => {
  state.Success = value.Success
}

export const icoUsersReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getICOUsers.fulfilled.type, (state: icoUsersState, action: PayloadAction<any>) => {
        setICOUserList(state, action.payload)
        state.Success = false
        state.updateSuccess = false
      })
      .addCase(deleteICOUser.fulfilled.type, (state: icoUsersState, action: PayloadAction<any>) => {
        deleteICOUserStatus(state, action.payload)
      })
  },
})

export { getICOUsers, deleteICOUser }

export default icoUsersReducer.reducer
