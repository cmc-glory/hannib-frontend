import axios from 'axios'
import {BASE_URL} from '@env'
import {INanumForm, INanumAccountFavoritesDto, INanumApplyOnlineDto, INanumApplyOfflineDto} from '../types'

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

// 카테고리가 있을 때 최신순으로 가져 오기
export const getNanumByRecent = async ({category, accountIdx}: {category: string; accountIdx: number}) => {
  const {data} = await apiClient.get(`/api/nanum/list/login1?category=${category}&accountIdx=${accountIdx}`)
  return data
}

// 키테고리가 있을 때 인기순으로 가져 오기
export const getNanumByPopularity = async ({category, accountIdx}: {category: string; accountIdx: number}) => {
  const {data} = await apiClient.get(`/api/nanum/list/login2?category=${category}&accountIdx=${accountIdx}`)
  return data
}

// 나눔 상세 페이지 index로 검색
export const getNanumByIndex = async (nanumAccountFavoritesDto: INanumAccountFavoritesDto) => {
  const {data} = await apiClient.post(`/api/nanum/`, nanumAccountFavoritesDto)

  return data
}

// 나눔폼 작성
export const postNanumForm = async (nanumForm: INanumForm) => {
  const {data} = await apiClient.post('/api/nanum/write', nanumForm)

  return data
}

export const getNanumForm = async (nanumIdx: number) => {
  const {data} = await apiClient.get(`/api/nanum/${nanumIdx}`)

  return data
}
// 나눔글 삭제
export const deleteNanumForm = async (deleteForm: {nanumIdx: number; deletedReason: string}) => {
  const {data} = await apiClient.delete(`/api/nanum/`, {data: deleteForm})

  return data
}

// 즐겨찾기 추가
export const addFavorite = async ({
  nanumIdx,
  accountIdx,
  categoryIdx,
  category,
}: {
  nanumIdx: number
  accountIdx: number
  categoryIdx: number
  category: string
}) => {
  const {data} = await apiClient.post(`/api/nanum/favorites?nanumIdx=${nanumIdx}&accountIdx=${accountIdx}&categoryIdx=${categoryIdx}&category=${category}`)
  return data
}

// 즐겨찾기 취소
export const removeFavorite = async ({
  nanumIdx,
  accountIdx,
  categoryIdx,
  category,
}: {
  nanumIdx: number
  accountIdx: number
  categoryIdx: number
  category: string
}) => {
  const {data} = await apiClient.delete(`/api/nanum/favorites?nanumIdx=${nanumIdx}&accountIdx=${accountIdx}&categoryIdx=${categoryIdx}&category=${category}`)
  return data
}

// 검색 인기순
export const searchNanumByFavorites = async ({title, accountIdx}: {title: string; accountIdx: number}) => {
  const {data} = await apiClient.get(`api/nanum/list/favorites?title=${title}&accountIdx=${accountIdx}`)
  return data
}

// 검색 최신순
export const searchNanumByRecent = async ({title, accountIdx}: {title: string; accountIdx: number}) => {
  const {data} = await apiClient.get(`api/nanum/list/recent?title=${title}&accountIdx=${accountIdx}`)
  return data
}

//나눔 신청하기 온라인
export const postNanumRequestOnlineForm = async (requestOnlineForm: INanumApplyOnlineDto) => {
  const {data} = await apiClient.post(`api/apply/mail`, requestOnlineForm)
  return data
}

//나눔 신청하기 오프라인
export const postNanumRequestOfflineForm = async (requestOfflineForm: INanumApplyOfflineDto) => {
  const {data} = await apiClient.post(`api/apply/offline`, requestOfflineForm)
  return data
}
