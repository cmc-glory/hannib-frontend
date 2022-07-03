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

export const getNanumListAll = async () => {
  const {data} = await apiClient.get('/dummyNanums.json')

  return data
}
