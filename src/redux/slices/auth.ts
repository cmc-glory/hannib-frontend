import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createDraftSafeSelector} from '@reduxjs/toolkit'
import {IUserCategory} from '../../types'

//Each slice file should define a type for its initial state value,
// so that createSlice can correctly infer the type of state in each case reducer.

interface User {
  email: string
  name: string
  userCategory: IUserCategory[]
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
      email: '',
      name: '',
      userCategory: [],
    } as User,
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true
      state.user.email = action.payload.email
      state.user.name = action.payload.name
      state.user.userCategory = action.payload.userCategory
    },
    storeAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    storeRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
    },
  },
})

const selectSelf = (state: Auth) => state
export const userSelector = createDraftSafeSelector(selectSelf, state => state.user)
export default authSlice.reducer
export const {login, storeAccessToken, storeRefreshToken} = authSlice.actions
