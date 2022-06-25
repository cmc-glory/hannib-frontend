import axios from 'axios'
import {API_URL} from '@env'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const getNotificationsAll = async () => {
  const {data} = await apiClient.get('/dummyNotification.json')

  return data
}

export const setNotificationRead = async (id: string) => {
  const {data} = await apiClient.put('/dummyNotification.json', {
    id: id,
  })

  return data
}
