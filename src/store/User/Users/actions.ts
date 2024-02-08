import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getUsersFilterAPI,
  deleteUserAPI,
  updateUserAPI,
  emailVerifyAPI,
  phoneVerifyAPI,
  createUserAPI,
  updateUserListAPI,
} from '../../api/User/UsersAPI'

const createUser = async (params: FormData) => {
  try {
    const response = await createUserAPI(params)
    return response.data
  } catch (error: any) {
    return console.log(error)
  }
}

const updateUserList = async (params: FormData) => {
  try {
    const response = await updateUserListAPI(params)
    return response.data
  } catch (error: any) {
    return console.log(error)
  }
}

const getUsersFilter = createAsyncThunk('users/list', async (params: FormData) => {
  const response = await getUsersFilterAPI(params)
  return response.data
})

const deleteUser = createAsyncThunk('user/delete', async (params: FormData) => {
  try {
    const response = await deleteUserAPI(params)
    return response.data
  } catch (error: any) {
    return console.log(error)
  }
})

const updateUser = createAsyncThunk('users/update', async (params: FormData) => {
  try {
    const response = await updateUserAPI(params)
    return response.data
  } catch (error: any) {
    return console.log(error)
  }
})

const emailVerify = async (params: FormData) => {
  try {
    const response = await emailVerifyAPI(params)
    return response.data
  } catch (error: any) {
    return console.log(error)
  }
}

const phoneVerify = async (params: FormData) => {
  try {
    const response = await phoneVerifyAPI(params)
    return response.data
  } catch (error: any) {
    return console.log(error)
  }
}

export { createUser, getUsersFilter, updateUser, deleteUser, emailVerify, phoneVerify, updateUserList }
