import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
})

instance.interceptors.response.use((response: AxiosResponse) => {
  return response
})

export default instance
