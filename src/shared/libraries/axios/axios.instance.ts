import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { VITE_TARGET } from '@/shared/config'

import { setupAxiosInterceptors } from './axios.interceptors.setup.ts'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: VITE_TARGET,
})

setupAxiosInterceptors()
