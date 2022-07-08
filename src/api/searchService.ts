import axios from 'axios'
import {API_URL, BASE_URL} from '@env'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

const apiClient2 = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const getSearchData = async (query: string) => {
  const {data} = await apiClient.get(`/api/nanum/search?title=${query}`)

  return data
}

export const getSearchResult = async () => {
  const {data} = await apiClient2.get('/dummySearch.json')

  return data
}

export const removeSearchKeywordWithId = async () => {
  const {data} = await apiClient2.get('/dummySearch.json')

  return data
}

export const removeSearchKeywordAll = async (id: string) => {
  const {data} = await apiClient2.get('/dummySearch.json')

  return data
}
