import axios from 'axios'
import {BASE_URL} from '@env'
//import {IAccountDto, IUpdateCategoryDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// // 이메일로 회원 정보 가져오기
// export const getAccountInfoByEmail = async (email: string) => {
//   const {data} = await apiClient.get(`/api/account/email?email=${email}`)
//   return data
// }

// 진행한 나눔 리스트 get
export const getMyNanumList = async (accountIdx: number) => {
  const {data} = await apiClient.get(`/api/nanum/list/mynanum/send?accountIdx=${accountIdx}`)
  return data
}
