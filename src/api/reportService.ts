import axios from 'axios'
import {BASE_URL} from '@env'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const report = async ({accountIdx, contents}: {accountIdx: number; contents: string}) => {
  const {data} = await apiClient.post(`/api/report?accountIdx=${accountIdx}&contents=${contents}`)
  return data
}
