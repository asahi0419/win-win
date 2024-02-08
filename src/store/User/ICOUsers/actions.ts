import { createAsyncThunk } from '@reduxjs/toolkit'
import { getICOUsersAPI, deleteICOUserAPI } from '../../api/User/ICOUsersAPI'

const getICOUsers = createAsyncThunk('icousers/list', async (params: FormData) => {
  const response = await getICOUsersAPI(params)
  return response.data
})

const deleteICOUser = createAsyncThunk('icousers/delete', async (params: FormData) => {
  try {
    const response = await deleteICOUserAPI(params)
    return response.data
  } catch (error: any) {
    return console.log(error)
  }
})

export { getICOUsers, deleteICOUser }
