import type { AxiosError } from 'axios'

import { destroyCookie, parseCookies } from 'nookies'

import { API_CLIENT_ACCESS_TOKEN_COOKIES_NAME } from './api-client.constants.ts'
import { logoutWithRefresh, refreshTokenRequest } from './api-client.helpers.ts'
import apiClient from './api-client.instance.ts'
import { tokenState } from './api-client.interceptors.variables.ts'

export const responseInterceptor = async (error: AxiosError) => {
  const cookies = parseCookies()

  const { REFRESH_TOKEN } = cookies

  const isOnline = typeof window !== 'undefined' && navigator.onLine
  const isUnauthorized = error.response?.status === 403 || error.response?.status === 401

  if (isUnauthorized && isOnline) {
    if (REFRESH_TOKEN) {
      tokenState.isRefreshing = true

      destroyCookie(null, API_CLIENT_ACCESS_TOKEN_COOKIES_NAME, { path: '/' })

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

      return apiClient(error.config)
    }
    logoutWithRefresh()
  }

  const isTeamLimitError =
    error.response?.status === 409 &&
    (error as AxiosError<{ detail: string }>).response?.data?.detail ===
      'Невозможно добавить пользователя в команду, лимит пользователей исчерпан.'

  if (isTeamLimitError) {
    window.location.href = `${window.location.origin}/team-limit`
    return Promise.reject(error)
  }

  const needToLogoutWithRefresh =
    error.response?.status === 400 &&
    (error as AxiosError<{ error_description: string }>).response?.data?.error_description ===
      'refresh token is invalid, expired or revoked' &&
    isOnline

  if (needToLogoutWithRefresh) {
    logoutWithRefresh()
  }

  return Promise.reject(error)
}
