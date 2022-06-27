import axios from 'axios'
import {API_URL} from '@env'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const getGoodsDetail = async () => {
  const {data} = await apiClient.get('/dummySharingDetail.json')

  console.log('data : ', data)

  return data
}
