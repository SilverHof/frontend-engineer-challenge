import type { AxiosRequestConfig } from 'axios'

import { parseCookies } from 'nookies'

import { TOKEN_PATH } from '@/shared/config'

import { API_CLIENT_DEFAULT_HEADERS } from './api-client.constants.ts'
import { refreshTokenRequest } from './api-client.helpers.ts'
import { tokenState } from './api-client.interceptors.variables.ts'

export const requestInterceptor = async (config: AxiosRequestConfig) => {
  const cookies = parseCookies()

  const { REFRESH_TOKEN } = cookies

  let { access_token } = cookies

  if (config.url?.includes(TOKEN_PATH as string)) {
    return config
  }

  if (tokenState.isRefreshing) {
    return new Promise((resolve, reject) => {
      tokenState.requestQueue.push({ resolve, reject, config })
    })
  }

  if (!access_token && REFRESH_TOKEN && typeof window !== 'undefined' && navigator.onLine) {
    tokenState.isRefreshing = true

    const tokens = await refreshTokenRequest(REFRESH_TOKEN)
    tokenState.isRefreshing = false

    for (const request of tokenState.requestQueue) {
      if (request.config.headers) {
        request.config.headers.Authorization = `Bearer ${tokens?.accessToken}`
      }
      request.resolve(request.config)
    }

    tokenState.requestQueue = []

    if (tokens?.accessToken) {
      access_token = tokens.accessToken
    }
  }

  config.headers = {
    ...(config.method === 'GET' && { Pragma: 'no-cache' }),
    ...config.headers,
    ...API_CLIENT_DEFAULT_HEADERS,
    ...(access_token && { Authorization: `Bearer ${access_token}` }),
  }
  delete config.params?.sort

  return config
}
