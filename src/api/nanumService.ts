import axios from 'axios'
import {BASE_URL} from '@env'
import {INanumForm} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const getNanumAll = async () => {
  const {data} = await apiClient.get('/api/nanum')

  return data
}

export const getNanumByIndex = async (index: number) => {
  const {data} = await apiClient.get(`/api/nanum/nanumIdx?nanumIdx=${index}`)

  return data
}

export const postNanumForm = async (nanumForm: INanumForm) => {
  const {data} = await apiClient.post('/api/nanum/write', nanumForm)

  return data
}

export const getNanumForm = async (nanumIdx: number) => {
  const {data} = await apiClient.get(`/api/nanum/${nanumIdx}`)

  return data
}

export const deleteNanumForm = async (nanumIdx: number) => {
  const {data} = await apiClient.delete(`/api/nanum?nanumIdx=${nanumIdx}`)

  return data
}

export const addFavorite = async ({nanumIdx, accountIdx}: {nanumIdx: number; accountIdx: number}) => {
  const {data} = await apiClient.post(`/api/nanum/favorites?nanumIdx=${nanumIdx}&accountIdx=${accountIdx}`)
  return data
}

export const removeFavorite = async ({nanumIdx, accountIdx}: {nanumIdx: number; accountIdx: number}) => {
  const {data} = await apiClient.delete(`/api/nanum/favorites?nanumIdx=${nanumIdx}&accountIdx=${accountIdx}`)
  return data
}
