import {createSlice, PayloadAction} from '@reduxjs/toolkit'

//Each slice file should define a type for its initial state value,
// so that createSlice can correctly infer the type of state in each case reducer.

interface User {
  id: string
  name: string
}

interface Auth {
  isLogggedIn: boolean
  user: User
  accessToken: string
  refreshToken: string
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: {
      id: '',
      name: '',
    },
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    login: state => {
      console.log('redux state : ', state)
      state.isLoggedIn = true
    },
    storeAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
  },
})
export default authSlice.reducer
export const {login, storeAccessToken} = authSlice.actions
