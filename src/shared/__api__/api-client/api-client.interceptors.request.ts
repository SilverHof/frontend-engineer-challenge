import type { AxiosRequestConfig } from 'axios'

import { API_CLIENT_DEFAULT_HEADERS } from './api-client.constants'
import { refreshTokenRequest } from './api-client.helpers'
import { tokenState } from './api-client.interceptors.variables'
import { accessTokenAtom, refreshTokenAtom } from './api-client.tokens'

const TOKEN_PATH = import.meta.env.VITE_TOKEN_PATH ?? 'token'

export const requestInterceptor = async (config: AxiosRequestConfig) => {
  let accessToken = accessTokenAtom()
  const refreshToken = refreshTokenAtom()

  if (config.url?.includes(TOKEN_PATH)) {
    return config
  }

  if (tokenState.isRefreshing) {
    return new Promise((resolve, reject) => {
      tokenState.requestQueue.push({ resolve, reject, config })
    })
  }

  if (!accessToken && refreshToken && typeof window !== 'undefined' && navigator.onLine) {
    tokenState.isRefreshing = true

    const tokens = await refreshTokenRequest(refreshToken)
    tokenState.isRefreshing = false

    for (const request of tokenState.requestQueue) {
      if (request.config.headers) {
        request.config.headers.Authorization = `Bearer ${tokens?.accessToken}`
      }
      request.resolve(request.config)
    }

    tokenState.requestQueue = []

    if (tokens?.accessToken) {
      accessToken = tokens.accessToken
    }
  }

  config.headers = {
    ...(config.method === 'GET' && { Pragma: 'no-cache' }),
    ...config.headers,
    ...API_CLIENT_DEFAULT_HEADERS,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  }

  delete config.params?.sort

  return config
}
