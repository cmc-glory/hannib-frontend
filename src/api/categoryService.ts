import axios from 'axios'
import {BASE_URL} from '@env'
import {ICategoryDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const postCategory = async (categoryDto: ICategoryDto) => {
  const {data} = await apiClient.post('/api/category/write', categoryDto)
  return data
}

export const searchCategory = async (nickName: string) => {
  const {data} = await apiClient.get(`/api/category/search?nickName=${nickName}`)

  return data
}
