import type { AxiosError } from 'axios'

import { logoutWithRefresh, refreshTokenRequest } from './api-client.helpers'
import apiClient from './api-client.instance'
import { tokenState } from './api-client.interceptors.variables'
import { accessTokenAtom, refreshTokenAtom } from './api-client.tokens'

export const responseInterceptor = async (error: AxiosError) => {
  const refreshToken = refreshTokenAtom()

  const isOnline = typeof window !== 'undefined' && navigator.onLine
  const isUnauthorized = error.response?.status === 401 || error.response?.status === 403

  if (isUnauthorized && isOnline) {
    if (refreshToken) {
      tokenState.isRefreshing = true

      accessTokenAtom.set(null)

      const tokens = await refreshTokenRequest(refreshToken)
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
