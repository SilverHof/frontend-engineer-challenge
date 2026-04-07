import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'

import { VITE_TARGET } from '@/shared/config'

import { setupApiClientInterceptors, setupApiClientInterceptorsWithRetry } from './api-client.interceptors.config.ts'
import { isPublicAuthApiUrl } from './api-client.constants'
import { logoutWithRefresh, refreshTokenRequest } from './api-client.helpers'
import { refreshTokenAtom } from './api-client.tokens'

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

/**
 * "Голый" инстанс без interceptors и retry.
 * Нужен для refresh-запроса, чтобы не попадать в циклы auth-логики.
 */
export const apiClientInstanceRaw = axios.create(getConfig())

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

type RetriableRequestConfig = AxiosRequestConfig & { __authRetried?: boolean }

const tryRefreshAndRetry = async <TData, TError = unknown, TVariables = unknown>(
  instance: typeof apiClientInstance,
  error: AxiosError<TError>
): Promise<ResponseConfig<TData, TVariables> | null> => {
  const status = error.response?.status
  const url = error.config?.url ?? ''
  const isOnline = typeof window !== 'undefined' && navigator.onLine

  if (!isOnline) return null
  if (!(status === 401 || status === 403)) return null
  if (isPublicAuthApiUrl(url)) return null

  const config = (error.config ?? {}) as RetriableRequestConfig
  if (config.__authRetried) return null

  const refreshToken = refreshTokenAtom()
  if (!refreshToken) return null

  config.__authRetried = true

  const tokens = await refreshTokenRequest(refreshToken)
  if (!tokens?.accessToken) return null

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${tokens.accessToken}`,
  }

  return instance.request<TData, ResponseConfig<TData>>({
    ...(getConfig() as any),
    ...(config as any),
    headers: {
      ...(getConfig().headers as any),
      ...(config.headers as any),
    },
  })
}

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
      return tryRefreshAndRetry<TData, TError, TVariables>(apiClientInstance, error).then((res) => {
        if (res) return res
        logoutWithRefresh()
        throw error
      })
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
      return tryRefreshAndRetry<TData, TError, TVariables>(apiClientInstanceWithRetry, error).then((res) => {
        if (res) return res
        logoutWithRefresh()
        throw error
      })
    })
}

/** Запросы без auth-логики (использовать только точечно). */
export const clientRaw = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TData>
): Promise<ResponseConfig<TData, TVariables>> => {
  const globalConfig = getConfig()

  return apiClientInstanceRaw
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

clientRaw.getConfig = getConfig
clientRaw.setConfig = setConfig

export type Client = typeof client

export default client
