import axios from 'axios'
import {BASE_URL} from '@env'
import {IBlockDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 차단하기
export const blockUser = async (blockDtos: IBlockDto[]) => {
  const {data} = await apiClient.post('/api/block', blockDtos)

  return data
}

// 차단 해제
export const unblockUser = async (blockDto: IBlockDto) => {
  const {data} = await apiClient.delete('/api/block', {data: blockDto})

  return data
}

// 차단 리스트 get
export const getBlockedUsers = async (accountIdx: number) => {
  const {data} = await apiClient.get(`/api/block/list?accountIdx=${accountIdx}`)

  return data
}
