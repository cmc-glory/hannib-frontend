import axios from 'axios'
import {BASE_URL} from '@env'
import {IInquiryNanumDto, IQuestionNanumDto, IAnswerNanumDto} from '../types'

type DeleteInfo = {
  accountIdx: number
  nanumIdx: number
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// export const getInqueries = async()=>{

// }

// 문의 글 작성
export const postInquiry = async (questionNanumDto: IInquiryNanumDto) => {
  const {data} = await apiClient.post('/api/nanum/inquiry', questionNanumDto)
  return data
}

// 문의 글 수정
export const postAnswer = async (questionNanumDto: IInquiryNanumDto) => {
  const {data} = await apiClient.put('/api/nanum/inquiry', questionNanumDto)
  return data
}

// 문의글 삭제
export const deleteInquiry = async (form: DeleteInfo) => {
  const {data} = await apiClient.delete('/api/nanum/inquiry', {data: form})
  return data
}

// 문의글 답변 작성
export const updateInquiry = async (answerNanumDto: IInquiryNanumDto) => {
  const {data} = await apiClient.put('/api/nanum/inquiry/answer', answerNanumDto)
  return data
}

// 문의글 가져오기
export const getInquiryByIndex = async (nanumIdx: number) => {
  const {data} = await apiClient.get(`/api/nanum/inquiry/list?nanumIdx=${nanumIdx}`)
  return data
}
