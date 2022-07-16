import axios from 'axios'
import {BASE_URL} from '@env'
//import {IAccountDto, IUpdateCategoryDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 진행한 나눔 리스트 get
export const getHoldingNanumList = async (accountIdx: number) => {
  const {data} = await apiClient.get(`/api/nanum/list/mynanum/send?accountIdx=${accountIdx}`)
  return data
}

//참여한 나눔 리스트 get
export const getParticipatingNanumList = async (accountIdx: number) => {
  const {data} = await apiClient.get(`/api/nanum/list/mynanum/apply?accountIdx=${accountIdx}`)
  return data
}
