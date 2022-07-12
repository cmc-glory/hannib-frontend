import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createDraftSafeSelector} from '@reduxjs/toolkit'
import {IAccountCategoryDto, IAccountDto} from '../../types'
import AsyncStorage from '@react-native-async-storage/async-storage'

//Each slice file should define a type for its initial state value,
// so that createSlice can correctly infer the type of state in each case reducer.

export interface User {
  email: string
  name: string
  accountCategoryDtoList: IAccountCategoryDto[]
  profileImageUri: string | undefined
  holdingSharingCnt: number | undefined
  participateSharingCnt: number | undefined
  accountIdx: number
  creatorIdDatetime: string
}

export interface Auth {
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
    accountCategoryDtoList: [],
    profileImageUri: '',
    holdingSharingCnt: 0,
    participateSharingCnt: 0,
    accountIdx: 0,
    creatorIdDatetime: '1997-01-01 00:00:00',
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
      state.user.accountCategoryDtoList = action.payload.accountCategoryDtoList
      state.user.holdingSharingCnt = action.payload.holdingSharingCnt
      state.user.participateSharingCnt = action.payload.participateSharingCnt
      state.user.accountIdx = action.payload.accountIdx
    },
    storeAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    storeRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
    },
    logout: state => {
      //AsyncStorage.removeItem('accessToken')
      //AsyncStorage.removeItem('accountIdx')

      return initialState
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      state.user.profileImageUri = action.payload
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload
    },
    updateCategory: (state, action: PayloadAction<IAccountCategoryDto[]>) => {
      state.user.accountCategoryDtoList = action.payload
    },
  },
})

const selectSelf = (state: Auth) => state
export const userSelector = createDraftSafeSelector(selectSelf, state => state.user)
export default authSlice.reducer
export const {login, storeAccessToken, storeRefreshToken, logout, updateProfileImage, updateName, updateCategory} = authSlice.actions
