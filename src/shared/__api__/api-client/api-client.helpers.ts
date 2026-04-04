import axios from 'axios'

import { destroyCookie, parseCookies, setCookie } from 'nookies'

import {
  BASE_URL,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_REALM,
  KEYCLOAK_SERVER_URL,
  KEYCLOAK_SESSION_STORAGE_NAME,
  REFRESH_TOKEN_REQUEST_TARGET,
  TENANT_DOMAIN,
} from '@/shared/config'

import { apiAuthtokenPost } from '../__resources__/index.ts'
import { AuthTokenDtoJsonld } from '../__types__/auth-token-dto-jsonld.ts'
import {
  API_CLIENT_ACCESS_TOKEN_COOKIES_NAME,
  API_CLIENT_DEFAULT_HEADERS,
  API_CLIENT_REFRESH_TOKEN_COOKIES_NAME,
  API_CLIENT_REFRESH_TOKEN_MAX_AGE,
} from './api-client.constants.ts'
import { client } from './api-client.instance.ts'

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
export const getSignInAfterLogoutUrl = (redirectPath: string) =>
  `${KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/auth?client_id=${KEYCLOAK_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectPath
  )}&scope=openid%20profile%20email&state=${getOrSaveKeycloakState()}&prompt=login`
/** Origin без поддомена: protocol + TENANT_DOMAIN (для корректного redirect_uri в OAuth) */
export const getBaseOrigin = () => {
  if (typeof window === 'undefined') return ''
  return `${window.location.protocol}//${TENANT_DOMAIN}`
}

const getCookieDomain = () => {
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  return isLocalhost ? undefined : `.${TENANT_DOMAIN}`
}
const logoutRequest = async () => {
  const cookies = parseCookies()
  const refreshToken = cookies[API_CLIENT_REFRESH_TOKEN_COOKIES_NAME]

  if (!refreshToken) return

  await client({
    method: 'POST',
    url: '/api/v1/auth/logout',
    data: { refreshToken },
    headers: {
      'Content-Type': 'application/ld+json',
    },
  })
}

// Для выхода из Keycloak
export const logoutKeycloak = async () => {
  const domain = getCookieDomain()
  await logoutRequest()
  destroyCookie(null, API_CLIENT_REFRESH_TOKEN_COOKIES_NAME, { path: '/', domain })
  destroyCookie(null, API_CLIENT_ACCESS_TOKEN_COOKIES_NAME, { path: '/', domain })
  window.location.href = getSignInUrl(window.location.origin)
}

export const logoutWithRefresh = () => {
  const domain = getCookieDomain()
  destroyCookie(null, API_CLIENT_REFRESH_TOKEN_COOKIES_NAME, { path: '/', domain })
  destroyCookie(null, API_CLIENT_ACCESS_TOKEN_COOKIES_NAME, { path: '/', domain })
  window.location.href = getSignInAfterLogoutUrl(getBaseOrigin())
}

const parseJwtExpiration = (token: string): number | null => {
  try {
    const payload = token.split('.')[1]
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)
    return parsedPayload.exp || null
  } catch (error) {
    console.error('Failed to parse JWT expiration:', error)
    return null
  }
}

export const setAuthTokensInCookies = (tokens: AuthTokenDtoJsonld) => {
  const accessToken = tokens.accessToken as string
  const expiresIn = parseJwtExpiration(accessToken)
  const maxAge = expiresIn ? expiresIn - Math.floor(Date.now() / 1000) : null
  const cookieDomain = getCookieDomain()

  setCookie(null, API_CLIENT_ACCESS_TOKEN_COOKIES_NAME, tokens.accessToken as string, {
    path: '/',
    domain: cookieDomain,
    ...(expiresIn && { EXPIRES: new Date(expiresIn * 1000) }),
    ...(maxAge && { maxAge: maxAge }),
  })
  setCookie(null, API_CLIENT_REFRESH_TOKEN_COOKIES_NAME, tokens?.refreshToken as string, {
    path: '/',
    domain: cookieDomain,
    maxAge: API_CLIENT_REFRESH_TOKEN_MAX_AGE,
  })
}

export const refreshTokenRequest = (REFRESH_TOKEN: string) =>
  axios
    .post<AuthTokenDtoJsonld>(
      `${BASE_URL}${REFRESH_TOKEN_REQUEST_TARGET}`,
      new URLSearchParams({
        refresh_token: REFRESH_TOKEN,
      }),
      {
        headers: {
          ...API_CLIENT_DEFAULT_HEADERS,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((res) => {
      setAuthTokensInCookies(res.data)
      return res.data
    })
    .catch(() => logoutWithRefresh())

export const exchangeCodeForTokens = async (code: string, redirectUri: string) => {
  const response = await apiAuthtokenPost({ code, redirectUri })
  setAuthTokensInCookies(response)
  return response
}

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

export const signin = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  const redirectUri = window.location.origin
  const expectedState = getOrSaveKeycloakState()

  sessionStorage.removeItem(KEYCLOAK_SESSION_STORAGE_NAME as string)

  if (!code || !state) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'error',
          msg: 'code or state is missing',
        })
      }, 10)
    })
  }

  if (state !== expectedState) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'error',
          msg: `invalid state parameter, expected: ${expectedState}, got: ${state}`,
        })
      }, 10)
    })
  }

  try {
    const tokens = await exchangeCodeForTokens(code, redirectUri)

    setAuthTokensInCookies(tokens)
    sessionStorage.removeItem(KEYCLOAK_SESSION_STORAGE_NAME as string)
  } catch (error) {
    console.error('Failed to exchange code for tokens:', error)
    sessionStorage.removeItem(KEYCLOAK_SESSION_STORAGE_NAME as string)
    return false
  }
}
