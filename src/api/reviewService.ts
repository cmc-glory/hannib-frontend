import axios from 'axios'
import {BASE_URL} from '@env'
import {IReviewDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const writeReview = async (reviewDto: IReviewDto) => {
  const {data} = await apiClient.post('/api/applying/review', reviewDto)
  return data
}
