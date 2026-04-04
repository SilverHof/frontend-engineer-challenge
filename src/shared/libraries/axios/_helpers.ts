import axios from 'axios'

import { destroyCookie, setCookie } from 'nookies'

import {
  BASE_URL,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_REALM,
  KEYCLOAK_SERVER_URL,
  KEYCLOAK_SESSION_STORAGE_NAME,
  REFRESH_TOKEN_GRANT_TYPE,
  REFRESH_TOKEN_REQUEST_TARGET,
  REFRESH_TOKEN_SCOPE,
} from '@/shared/config'

import type { AuthTokens } from './_types.ts'
import {
  ACCESS_TOKEN_COOKIES_NAME,
  DEFAULT_HEADERS,
  REFRESH_TOKEN_COOKIES_NAME,
  REFRESH_TOKEN_MAX_AGE,
} from './_constants.ts'

export const getOrSaveKeycloakState = () => {
  let state = sessionStorage.getItem(KEYCLOAK_SESSION_STORAGE_NAME as string)
  if (state !== null) {
    return state
  }
  state = Math.random().toString(36).slice(2)
  sessionStorage.setItem(KEYCLOAK_SESSION_STORAGE_NAME as string, state)
  return state
}

export const getSignInUrl = (redirectPath: string) =>
  `${KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/auth?client_id=${KEYCLOAK_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectPath
  )}&scope=openid%20profile%20email&state=${getOrSaveKeycloakState()}`

export const logout = () => {
  destroyCookie(null, REFRESH_TOKEN_COOKIES_NAME, { path: '/' })
  destroyCookie(null, ACCESS_TOKEN_COOKIES_NAME, { path: '/' })
  if (typeof window !== 'undefined') {
    window.location.href = getSignInUrl(window.location.href)
  }
}

export const setAuthTokensInCookies = (tokens: AuthTokens) => {
  setCookie(null, ACCESS_TOKEN_COOKIES_NAME, tokens.accessToken, {
    path: '/',
    ...(tokens.EXPIRES && { EXPIRES: new Date(tokens.EXPIRES * 1000) }),
    ...(tokens.EXPIRES_IN && { maxAge: tokens.EXPIRES_IN * 60 }),
  })
  setCookie(null, REFRESH_TOKEN_COOKIES_NAME, tokens.refreshToken, {
    path: '/',
    maxAge: REFRESH_TOKEN_MAX_AGE,
  })
}

export const refreshTokenRequest = (REFRESH_TOKEN: string) =>
  axios
    .post<AuthTokens>(
      `${KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_REALM}${REFRESH_TOKEN_REQUEST_TARGET}`,
      new URLSearchParams({
        grant_type: REFRESH_TOKEN_GRANT_TYPE as string,
        scope: REFRESH_TOKEN_SCOPE as string,
        client_id: KEYCLOAK_CLIENT_ID as string,
        refresh_token: REFRESH_TOKEN,
      }),
      {
        headers: {
          ...DEFAULT_HEADERS,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((res) => {
      setAuthTokensInCookies(res.data)
      return res.data
    })
    .catch(() => logout())

export const exchangeCodeForTokens = (code: string, redirectUri: string) =>
  axios.post<AuthTokens>(`${BASE_URL}/api/v1/auth/token`, { code, redirectUri }).then((res) => {
    setAuthTokensInCookies(res.data)
    return res.data
  })

export const handleAuthCallback = async (): Promise<boolean> => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  const redirectUri = window.location.origin

  if (!code || !state) {
    return false
  }

  const savedState = sessionStorage.getItem(KEYCLOAK_SESSION_STORAGE_NAME as string)

  if (state !== savedState) {
    console.error('State mismatch in OAuth callback')
    sessionStorage.removeItem(KEYCLOAK_SESSION_STORAGE_NAME as string)
    return false
  }

  try {
    await exchangeCodeForTokens(code, redirectUri)

    // Очищаем state из sessionStorage после успешной авторизации
    sessionStorage.removeItem(KEYCLOAK_SESSION_STORAGE_NAME as string)

    // Переходим на главную страницу

    return true
  } catch (error) {
    console.error('Failed to exchange code for tokens:', error)
    sessionStorage.removeItem(KEYCLOAK_SESSION_STORAGE_NAME as string)
    return false
  }
}
