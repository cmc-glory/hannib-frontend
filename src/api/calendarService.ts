import axios from 'axios'
import {API_URL} from '@env'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const getCalendarAll = async () => {
  const {data} = await apiClient.get('/dummyCalendar.json')

  return data
}
