import axios from 'axios'

import { VITE_TARGET } from '@/shared/config'

import { clearAuthTokens, setAuthTokens } from './api-client.tokens'
import { API_CLIENT_DEFAULT_HEADERS } from './api-client.constants'
import type { LoginSuccessResponse } from '../__types__/login-success-response'

const REFRESH_URL = `${VITE_TARGET}/api/v1/auth/refresh`
const LOGIN_URL = '/auth/login'

/**
 * Обновить пару токенов по refresh-токену.
 * Используется внутри interceptor-ов — намеренно обходит axios-инстанс с
 * interceptors, чтобы избежать бесконечного цикла.
 */
export const refreshTokenRequest = async (refreshToken: string) => {
  try {
    const response = await axios.post<LoginSuccessResponse>(
      REFRESH_URL,
      { refreshToken },
      { headers: API_CLIENT_DEFAULT_HEADERS }
    )

    const { accessToken, refreshToken: newRefreshToken } = response.data.data
    setAuthTokens(accessToken, newRefreshToken)

    return response.data.data
  } catch {
    logoutWithRefresh()
    return null
  }
}

/**
 * Принудительный выход: сбросить токены и перенаправить на страницу входа.
 * Используется из shared-слоя, поэтому навигация через прямой URL-редирект.
 */
export const logoutWithRefresh = () => {
  clearAuthTokens()
  window.location.replace(LOGIN_URL)
}
