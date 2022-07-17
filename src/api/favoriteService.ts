import axios from 'axios'
import {BASE_URL} from '@env'
import {INanumForm, INanumAccountFavoritesDto, INanumApplyOnlineDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const getFavoritesAll = async (accountIdx: number) => {
  const {data} = await apiClient.post('/api/favorites/all', {
    accountIdx: accountIdx,
    categoryIdx: 0,
  })

  return data
}

export const getFavoritesByCategory = async (form: {accountIdx: number; categoryIdx: number}) => {
  const {data} = await apiClient.post('/api/favorites/category', form)

  return data
}
