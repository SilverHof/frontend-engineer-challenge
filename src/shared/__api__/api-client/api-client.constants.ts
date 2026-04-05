export const API_CLIENT_ACCESS_TOKEN_COOKIES_NAME = 'access_token'
export const API_CLIENT_REFRESH_TOKEN_COOKIES_NAME = 'refresh_token'
export const API_CLIENT_REFRESH_TOKEN_MAX_AGE = 360000
export const API_CLIENT_EXPIRES_IN_COOKIES_NAME = 'expires_in'
export const API_CLIENT_TOKEN_TYPE_COOKIES_NAME = 'token_type'

export const API_CLIENT_DEFAULT_HEADERS = {
  'Content-Type': 'application/ld+json',
  'Cache-Control': 'no-cache',
} as const

/** Публичные auth-эндпоинты: без Bearer и без принудительного выхода по 401 */
export const API_CLIENT_PUBLIC_AUTH_URL_PARTS = [
  '/api/v1/auth/login',
  '/api/v1/auth/register',
  '/api/v1/auth/refresh',
  '/api/v1/auth/request-password-reset',
  '/api/v1/auth/reset-password',
] as const

export const isPublicAuthApiUrl = (url: string | undefined): boolean =>
  Boolean(url && API_CLIENT_PUBLIC_AUTH_URL_PARTS.some((part) => url.includes(part)))
