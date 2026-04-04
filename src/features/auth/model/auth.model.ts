import { atom, withCookieStore } from '@reatom/core'

import {
  API_CLIENT_ACCESS_TOKEN_COOKIES_NAME,
  API_CLIENT_REFRESH_TOKEN_COOKIES_NAME,
} from '@/shared/__api__/api-client/api-client.constants'

export const accessTokenAtom = atom<string | null>(null, 'accessToken').extend(
  withCookieStore(API_CLIENT_ACCESS_TOKEN_COOKIES_NAME)
)
export const refreshTokenAtom = atom<string | null>(null, 'refreshToken').extend(
  withCookieStore(API_CLIENT_REFRESH_TOKEN_COOKIES_NAME)
)
