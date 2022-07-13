import axios from 'axios'
import {BASE_URL} from '@env'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const getGoodsRequestInfo = async () => {
  const {data} = await apiClient.get('/dummySharingRequestInfo.json')
  return data
}

export const getNanumRequestRequiredInfo = async (index: number) => {
  const {data} = await apiClient.get(`/api/apply?nanumIdx=${index}`)

  return data
}
