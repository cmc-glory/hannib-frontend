import axios from 'axios'
import {BASE_URL} from '@env'
import {IAccountDto, IUpdateCategoryDto} from '../types'

/*
type IAccountDto = {
  accountCategoryDtoList: IAccountCategoryDto[] // 사용자가 선택한 카테고리 리스트
  accountIdx: number // db 고유 id
  creatorId: string // 닉네임
  accountImg: string | null // 프로필 이미지 url
  email: string // 이메일
  creatorIdDatetime: string // 최종 계정 정보 수정일
}
*/

type deleteAccountForm = {
  accountIdx: number
  reason: string
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 회원 가입
export const postSignUp = async (accountDto: IAccountDto) => {
  const {data} = await apiClient.post('/api/account/signup', accountDto)
  return data
}

// accountIdx로 회원 정보 가져오기
export const getAccountInfoByIdx = async (accountIdx: number) => {
  const {data} = await apiClient.get(`/api/account/accountidx?accountIdx=${accountIdx}`)
  return data
}

// 이메일로 회원 정보 가져오기
export const getAccountInfoByEmail = async (email: string) => {
  const {data} = await apiClient.get(`/api/account/email?email=${email}`)
  return data
}

// 계정 정보 업데이트
export const updateAccountInfo = async (accountDto: IAccountDto) => {
  const {data} = await apiClient.put('/api/account/', accountDto)
  return data
}

// 회원 탈퇴
export const deleteAccount = async (deleteAccountForm: deleteAccountForm) => {
  const {data} = await apiClient.delete('/api/account/', {data: deleteAccountForm})
  return data
}

// 닉네임 중복 확인
export const checkNicknameDuplicated = async (nickname: string) => {
  const {data} = await apiClient.get(`api/account/nickname?nickName=${nickname}`)
  return data
}

// 카테고리 업데이트
export const updateUserSelectedCategory = async (updateCategoryDto: IUpdateCategoryDto) => {
  const {data} = await apiClient.put('/api/account/category', updateCategoryDto)
  return data
}
