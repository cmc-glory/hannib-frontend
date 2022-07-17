import axios from 'axios'
import {BASE_URL} from '@env'
import {IcancelDto, INoticeDto} from '../types'
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

//나눔자가 특정 참여자 취소하기
export const cancelNanumByHolder = async (cancelDto: IcancelDto) => {
  const {data} = await apiClient.post('/api/nanuming/cancel', cancelDto)
  return data
}

//수령체크 및 전달완료하기 (변수명만 cancelDto로 같고 api는 잘 작동)
export const postGoodsSent = async (cancelDto: IcancelDto) => {
  const {data} = await apiClient.post('/api/nanuming/check', cancelDto)
  return data
}

//나눔 공지 보내기
// export const sendNotice = async (noticeDtoList: INoticeDto[]) => {
//   const {data} = await apiClient.post('/api/nanuming/notice', noticeDtoList)
//   return data
// }
