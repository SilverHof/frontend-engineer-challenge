import { atom, withCookieStore } from '@reatom/core'

import { TokenPair } from '../__types__'
import {
  API_CLIENT_ACCESS_TOKEN_COOKIES_NAME,
  API_CLIENT_EXPIRES_IN_COOKIES_NAME,
  API_CLIENT_REFRESH_TOKEN_COOKIES_NAME,
  API_CLIENT_TOKEN_TYPE_COOKIES_NAME,
} from './api-client.constants'

/** Access token — читается и пишется через Cookie Store API */
export const accessTokenAtom = atom<string | null>(null, 'accessToken').extend(
  withCookieStore(API_CLIENT_ACCESS_TOKEN_COOKIES_NAME)
)

/** Refresh token — читается и пишется через Cookie Store API */
export const refreshTokenAtom = atom<string | null>(null, 'refreshToken').extend(
  withCookieStore(API_CLIENT_REFRESH_TOKEN_COOKIES_NAME)
)

export const tokenTypeAtom = atom<string | null>(null, 'tokenType').extend(
  withCookieStore(API_CLIENT_TOKEN_TYPE_COOKIES_NAME)
)

export const expiresInAtom = atom<number | null>(null, 'expiresIn').extend(
  withCookieStore(API_CLIENT_EXPIRES_IN_COOKIES_NAME)
)

export const tokenHandler = {
  clear: () => {
    accessTokenAtom.set(null)
    refreshTokenAtom.set(null)
    tokenTypeAtom.set(null)
    expiresInAtom.set(null)
  },
  set: ({ accessToken, refreshToken, expiresIn, tokenType }: TokenPair) => {
    accessTokenAtom.set(accessToken)
    refreshTokenAtom.set(refreshToken)
    expiresInAtom.set(expiresIn)
    tokenTypeAtom.set(tokenType)
  },
}
