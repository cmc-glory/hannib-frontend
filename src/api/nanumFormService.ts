import axios from 'axios'
import {BASE_URL} from '@env'
import {INanumForm} from '../types'

const apiImageClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const postNanumForm = async (nanumForm: INanumForm) => {
  const {data} = await apiImageClient.post('/api/nanum/write', nanumForm)

  return data
}

export const getNanumForm = async (nanumIdx: number) => {
  const {data} = await apiImageClient.get(`/api/nanum/${nanumIdx}`)

  return data
}

export const deleteNanumForm = async (nanumIdx: number) => {
  const {data} = await apiImageClient.delete(`/api/nanum?nanumIdx=${nanumIdx}`)

  return data
}
