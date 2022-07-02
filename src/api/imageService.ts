import axios from 'axios'
import {BASE_URL} from '@env'

const apiImageClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'multipart/form-data',
  },
})

export const uploadProfileImage = async (formData: FormData) => {
  const {data} = await apiImageClient.post('/api/img/profile', formData)

  return data
}

export const uploadCategoryImage = async (formData: FormData) => {
  const {data} = await apiImageClient.post('/api/img/category', formData)

  return data
}

export const uploadNanumImages = async (formData: FormData) => {
  const {data} = await apiImageClient.post('/api/img/nanum', formData)

  return data
}
