import { axiosInstance } from './axios.instance.ts'
import { requestInterceptor } from './axios.interceptors.request.ts'
import { responseInterceptor } from './axios.interceptors.response.ts'

export const setupAxiosInterceptors = () => {
  axiosInstance.interceptors.request.use(requestInterceptor)
  axiosInstance.interceptors.response.use((config) => config, responseInterceptor)
}
