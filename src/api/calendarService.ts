import axios from 'axios'
import {BASE_URL} from '@env'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const getCalendarAll = async (accountIdx: number) => {
  const {data} = await apiClient.post(`/api/calender/?accountIdx=${accountIdx}`)

  return data
}
