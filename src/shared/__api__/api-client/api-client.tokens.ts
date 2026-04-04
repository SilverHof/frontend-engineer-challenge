import { atom, notify, withCookieStore } from '@reatom/core'

import {
  API_CLIENT_ACCESS_TOKEN_COOKIES_NAME,
  API_CLIENT_REFRESH_TOKEN_COOKIES_NAME,
} from './api-client.constants'

/** Access token — читается и пишется через Cookie Store API */
export const accessTokenAtom = atom<string | null>(null, 'accessToken').extend(
  withCookieStore(API_CLIENT_ACCESS_TOKEN_COOKIES_NAME)
)

/** Refresh token — читается и пишется через Cookie Store API */
export const refreshTokenAtom = atom<string | null>(null, 'refreshToken').extend(
  withCookieStore(API_CLIENT_REFRESH_TOKEN_COOKIES_NAME)
)

/** Очистить оба токена (и куки) */
export const clearAuthTokens = () => {
  accessTokenAtom.set(null)
  refreshTokenAtom.set(null)
  notify()
}

/** Сохранить пару токенов */
export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  accessTokenAtom.set(accessToken)
  refreshTokenAtom.set(refreshToken)
  notify()
}
