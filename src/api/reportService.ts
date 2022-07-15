import axios from 'axios'
import {BASE_URL} from '@env'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const report = async (form: {nanumIdx: number; contents: string}) => {
  const {data} = await apiClient.post(`/api/report`, form)
  return data
}
