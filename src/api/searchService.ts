import axios from 'axios'
import {API_URL} from '@env'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const getSearchData = async () => {
  const {data} = await apiClient.get('/dummySearch.json')
  console.log(data)

  return data
}

export const getSearchResult = async () => {
  const {data} = await apiClient.get('/dummySearch.json')

  return data
}

export const removeSearchKeywordWithId = async () => {
  const {data} = await apiClient.get('/dummySearch.json')

  return data
}

export const removeSearchKeywordAll = async (id: string) => {
  const {data} = await apiClient.get('/dummySearch.json')

  return data
}
