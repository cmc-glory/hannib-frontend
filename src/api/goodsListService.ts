import axios from 'axios'
import {API_URL} from '@env'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const addFavorite = async (id: string) => {
  const {data} = await apiClient.get('/dummyNotification.json')

  return data
}
export const removeFavorite = async (id: string) => {
  const {data} = await apiClient.get('/dummyNotification.json')

  return data
}

export const getGoodsListAll = async () => {
  const {data} = await apiClient.get('/dummySharings.json')

  return data
}
