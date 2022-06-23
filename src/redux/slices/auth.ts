import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createDraftSafeSelector} from '@reduxjs/toolkit'
import {IUserCategory} from '../../types'

//Each slice file should define a type for its initial state value,
// so that createSlice can correctly infer the type of state in each case reducer.

interface User {
  email: string
  name: string
  userCategory: IUserCategory[]
  profileImageUri: string
}

interface Auth {
  isLogggedIn: boolean
  user: User
  accessToken: string
  refreshToken: string
}

const initialState = {
  isLoggedIn: false,
  user: {
    email: '',
    name: '',
    userCategory: [],
    profileImageUri: '',
  } as User,
  accessToken: '',
  refreshToken: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true
      state.user.email = action.payload.email
      state.user.name = action.payload.name
      state.user.profileImageUri = action.payload.profileImageUri
      state.user.userCategory = action.payload.userCategory
    },
    storeAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    storeRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
    },
    logout: state => {
      return initialState
    },
  },
})

const selectSelf = (state: Auth) => state
export const userSelector = createDraftSafeSelector(selectSelf, state => state.user)
export default authSlice.reducer
export const {login, storeAccessToken, storeRefreshToken, logout} = authSlice.actions
