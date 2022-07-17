import axios from 'axios'
import {BASE_URL} from '@env'
import {INanumForm, INanumAccountFavoritesDto, INanumApplyOnlineDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const getFavoritesByCategory = async (form: {accountIdx: number; category: string}) => {
  const {data} = await apiClient.post('/api/favorites/', form)

  return data
}
