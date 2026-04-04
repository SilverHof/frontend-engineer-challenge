import type { AxiosError } from 'axios'

import { destroyCookie, parseCookies } from 'nookies'

import { ACCESS_TOKEN_COOKIES_NAME } from './_constants.ts'
import { logout, refreshTokenRequest } from './_helpers.ts'

import { axiosHttpClient } from './axios.http-client.ts'
import { tokenState } from './axios.interceptors.variables.ts'

export const responseInterceptor = async (error: AxiosError) => {
  const cookies = parseCookies()

  const isOnline = typeof window !== 'undefined' && navigator.onLine

  const { REFRESH_TOKEN } = cookies
  const isUnauthorized = error.response?.status === 403 || error.response?.status === 401
  const isInvalidToken =
    error.response?.status === 400 &&
    (error as AxiosError<{ error_description: string }>).response?.data?.error_description ===
      'refresh token is invalid, expired or revoked' &&
    isOnline

  if (isUnauthorized && REFRESH_TOKEN) {
    tokenState.isRefreshing = true

    destroyCookie(null, ACCESS_TOKEN_COOKIES_NAME, { path: '/' })

    const tokens = await refreshTokenRequest(REFRESH_TOKEN)

    tokenState.isRefreshing = false

    const authorizationHeader = `Bearer ${tokens?.accessToken}`

    for (const request of tokenState.requestQueue) {
      if (request.config.headers) request.config.headers.Authorization = authorizationHeader
      request.resolve(request.config)
    }

    tokenState.requestQueue = []

    if (error?.config?.headers) {
      error.config.headers.Authorization = authorizationHeader
    }

    return axiosHttpClient(error.config)
  }

  if (isUnauthorized || isInvalidToken) {
    logout()
  }

  return Promise.reject(error)
}
