import axios from 'axios'
import {BASE_URL} from '@env'
import {ICancelDto, IUnsongDto, INoticeDto} from '../types'
//import {IAccountDto, IUpdateCategoryDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 나눔자가 신청자 취소
export const cancelReceiver = async (cancelDto: ICancelDto) => {
  const {data} = await apiClient.post('api/nanuming/cancel', cancelDto)
  return data
}

// 신청자 리스트 get
export const getReceiverList = async (nanumIdx: number) => {
  const {data} = await apiClient.get(`/api/nanuming/detail?nanumIdx=${nanumIdx}`)
  return data
}

// 수령자 정보 상세 페이지
export const getReceiverDetail = async ({accountIdx, nanumIdx}: {accountIdx: number; nanumIdx: number}) => {
  const {data} = await apiClient.post('api/nanuming/detail', {
    accountIdx,
    nanumIdx,
  })
  return data
}

// 나눔 마감
export const endNanum = async (nanumIdx: number) => {
  const {data} = await apiClient.get(`/api/nanuming/end?nanumIdx=${nanumIdx}`)
  return data
}

// 수령 체크 및 전달 완료
export const checkReceived = async ({accountIdx, nanumIdx}: {accountIdx: number; nanumIdx: number}) => {
  const {data} = await apiClient.post('/api/nanuming/check', {
    accountIdx,
    nanumIdx,
  })
  return data
}

// 미수령 처리
export const checkUnReceived = async ({accountIdx, nanumIdx}: {accountIdx: number; nanumIdx: number}) => {
  const {data} = await apiClient.post('/api/nanuming/unaccepted', {
    accountIdx,
    nanumIdx,
  })
  return data
}

// 운송장 설정
export const postTrackingNumber = async (unsongDto: IUnsongDto) => {
  const {data} = await apiClient.post('/api/nanuming/unsong', unsongDto)
  return data
}

// 공지 보내기
export const sendNotice = async (noticeDto: INoticeDto) => {
  const {data} = await apiClient.post('/api/nanuming/notice', noticeDto)
  return data
}

//신청한 나눔 디테일 (진행한 나눔에서 참여자 한명한명의 디테일 정보 보여줄때 사용)
export const postRequestDetail = async ({accountIdx, nanumIdx}: {accountIdx: number; nanumIdx: number}) => {
  const {data} = await apiClient.post('/api/applying/detail', {
    accountIdx,
    nanumIdx,
  })
  return data
}
