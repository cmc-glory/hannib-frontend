import axios from 'axios'
import {BASE_URL} from '@env'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

const apiImageClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'multipart/form-data',
  },
})

export const uploadProfileImage = async (formData: FormData) => {
  console.log(BASE_URL)
  const {data} = await apiImageClient.post('/api/img/profile', formData)

  return data
}
