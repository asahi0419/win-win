import type { RootState } from '../../store'

// Other code such as selectors can use the imported `RootState` type
export const selectUserList = (state: RootState) => state.users.userList
export const selectUserListRowCount = (state: RootState) => state.users.rowsCount
export const selectUserDelete = (state: RootState) => state.users.Success
export const selectUserUpdate = (state: RootState) => state.users.updateSuccess
// export const selectUserProcessStatus = (state: RootState) => state.users.status;
