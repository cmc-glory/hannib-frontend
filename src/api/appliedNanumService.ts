import axios from 'axios'
import {BASE_URL} from '@env'
import {ICancelDto, IUnsongDto, INoticeDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getAppliedNanumInfo = async (form: {accountIdx: number; nanumIdx: number}) => {
  const {data} = await apiClient.post('/api/applying/detail', form)
  return data
}

// 신청자가 나눔 취소
export const cancelNanum = async (cancelDto: ICancelDto) => {
  const {data} = await apiClient.post('api/nanuming/cancel', cancelDto)
  return data
}

// 신청자가 나눔 취소
export const cancelNanumByApplier = async (cancelDto: ICancelDto) => {
  const {data} = await apiClient.post('api/applying/cancel', cancelDto)
  return data
}
