import { createBrowserHistory } from 'history'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginAPI } from '../api/auth'
import setAuthToken from 'utils/setAuthToken'
export const browserHistory = createBrowserHistory()

const createUser = createAsyncThunk('register/post/users', async (params: FormData) => {
  // try {
  //   const response = await registerAPI(params)
  //   if (!response.data.Success) {
  //     return response.data
  //   } else {
  //     browserHistory.push(`/login`, params.get('email'))
  //     window.location.reload()
  //     return response.data
  //   }
  // } catch (error: any) {
  //   return console.log(error)
  // }
})

const loginUser = createAsyncThunk('user/login', async (data: FormData) => {
  try {
    const response = await loginAPI(data)

    if (!response.data.Success) {
      return response.data
    } else {
      // const currentTime = Date.now() / 1000 + 300;
      localStorage.setItem('jwtToken', response.data.JwtToken)
      browserHistory.push(`/admin`)
      window.location.reload()
      return response.data
    }
  } catch (error: any) {
    return console.log(error)
  }
})

const logOutUser = createAsyncThunk('user/logOut', async () => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  return null
})

export { createUser, loginUser, logOutUser }
