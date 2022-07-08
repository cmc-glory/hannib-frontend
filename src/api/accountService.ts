import axios from 'axios'
import {BASE_URL} from '@env'
import {IAccountDto} from '../types'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const postSignUp = async (accountDto: IAccountDto) => {
  const {data} = await apiClient.post('/api/account/signup', accountDto)
  return data
}
