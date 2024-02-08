import type { RootState } from '../../store'

// Other code such as selectors can use the imported `RootState` type
export const selectICOUserList = (state: RootState) => state.icoUsers.icoUserList
export const selectICOUserListCount = (state: RootState) => state.icoUsers.rowCnt
export const selectICOUserDelete = (state: RootState) => state.icoUsers.Success
export const selectICOUserUpdate = (state: RootState) => state.icoUsers.updateSuccess
