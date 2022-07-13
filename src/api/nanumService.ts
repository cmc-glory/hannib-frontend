import axios from 'axios'
import {BASE_URL} from '@env'
import {INanumForm, IAccountCategoryDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

// 카테고리 상관 없이 모든 나눔 글 최신순으로 가져오기
export const getNanumAllByRecent = async () => {
  const {data} = await apiClient.get('/api/nanum/list/all')

  return data
}
// 카테고리 상관 없이 모든 나눔 글 인기순으로 가져오기
export const getNanumAllByFavorites = async () => {
  const {data} = await apiClient.get('/api/nanum/list/allfavorites')

  return data
}

// 최신순으로 가져 오기
export const getNanumByRecent = async (category: string) => {
  const {data} = await apiClient.get(`/api/nanum/list/login1?category=${category}`)
  return data
}

// 인기순으로 가져 오기
export const getNanumByPopularity = async (category: string) => {
  const {data} = await apiClient.get(`/api/nanum/list/login2?category=${category}`)
  return data
}

export const getNanumByIndex = async (index: number) => {
  const {data} = await apiClient.get(`/api/nanum/${index}`)

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
  const {data} = await apiClient.delete(`/api/nanum/?nanumIdx=${nanumIdx}`)

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
