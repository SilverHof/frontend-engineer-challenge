import type { AxiosRequestConfig } from 'axios'

import { API_CLIENT_DEFAULT_HEADERS, isPublicAuthApiUrl } from './api-client.constants'
import { accessTokenAtom } from './api-client.tokens'

export const requestInterceptor = async (config: AxiosRequestConfig) => {
  const accessToken = accessTokenAtom()
  const publicUrl = isPublicAuthApiUrl(config.url)

  config.headers = {
    ...(config.method === 'GET' && { Pragma: 'no-cache' }),
    ...config.headers,
    ...API_CLIENT_DEFAULT_HEADERS,
    ...(accessToken && !publicUrl && { Authorization: `Bearer ${accessToken}` }),
  }

  return config
}
