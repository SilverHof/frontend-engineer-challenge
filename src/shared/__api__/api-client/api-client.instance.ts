import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'

import { VITE_TARGET } from '@/shared/config'

import { setupApiClientInterceptors, setupApiClientInterceptorsWithRetry } from './api-client.interceptors.config.ts'

export type RequestConfig<TData = any> = AxiosRequestConfig<TData>

export type ResponseConfig<TData = any, DData = any> = AxiosResponse<TData, DData>

export type ResponseErrorConfig<TError = unknown> = AxiosError<TError>

let _config: Partial<RequestConfig> = {
  baseURL: VITE_TARGET,
}

export const getConfig = () => _config

export const setConfig = (config: RequestConfig) => {
  _config = config
  return getConfig()
}

export const apiClientInstance = axios.create(getConfig())

export const apiClientInstanceWithRetry = axios.create(getConfig())

axiosRetry(apiClientInstanceWithRetry, {
  retries: 3,
  retryCondition: (error) => {
    if (axiosRetry.isNetworkError(error)) return true
    if (!error.response) return true
    const status = error.response.status
    return status >= 500
  },
  retryDelay: axiosRetry.exponentialDelay,
})

setupApiClientInterceptors()
setupApiClientInterceptorsWithRetry()

export const client = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TData>
): Promise<ResponseConfig<TData, TVariables>> => {
  const globalConfig = getConfig()

  return apiClientInstance
    .request<TData, ResponseConfig<TData>>({
      ...globalConfig,
      ...config,
      headers: {
        ...globalConfig.headers,
        ...config.headers,
      },
    })
    .catch((error: AxiosError<TError>) => {
      throw error
    })
}

export const clientWithRetry = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TData>
): Promise<ResponseConfig<TData, TVariables>> => {
  const globalConfig = getConfig()

  return apiClientInstanceWithRetry
    .request<TData, ResponseConfig<TData>>({
      ...globalConfig,
      ...config,
      headers: {
        ...globalConfig.headers,
        ...config.headers,
      },
    })
    .catch((error: AxiosError<TError>) => {
      throw error
    })
}

client.getConfig = getConfig
client.setConfig = setConfig

clientWithRetry.getConfig = getConfig
clientWithRetry.setConfig = setConfig

export type Client = typeof client

export default client
