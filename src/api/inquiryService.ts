import axios from 'axios'
import {BASE_URL} from '@env'
import {IInqueryNanumDto, IQuestionNanumDto, IAnswerNanumDto} from '../types'

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
export const postInquiry = async (questionNanumDto: IQuestionNanumDto) => {
  const {data} = await apiClient.post('/api/nanum/inquiry', questionNanumDto)
  return data
}

// 문의 글 수정
export const postAnswer = async (questionNanumDto: IQuestionNanumDto) => {
  const {data} = await apiClient.put('/api/nanum/inquiry/answer', questionNanumDto)
  return data
}

// 문의글 답변 작성
export const updateInquiry = async (answerNanumDto: IAnswerNanumDto) => {
  const {data} = await apiClient.put('/api/nanum/inquiry', answerNanumDto)
  return data
}

// 문의글 삭제
export const deleteInquiry = async (form: DeleteInfo) => {
  const {data} = await apiClient.delete('/api/nanum/inquiry', form)
  return data
}
