import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { BASE_URL } from '@/shared/config'

import { setupAxiosInterceptors } from './axios.interceptors.setup.ts'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL as string,
})

setupAxiosInterceptors()
