import type { AxiosError } from 'axios'

import { isPublicAuthApiUrl } from './api-client.constants'
import { logoutWithRefresh } from './api-client.helpers'

export const responseInterceptor = async (error: AxiosError) => {
  const status = error.response?.status
  const url = error.config?.url ?? ''
  const isOnline = typeof window !== 'undefined' && navigator.onLine

  if (isOnline && (status === 401 || status === 403) && !isPublicAuthApiUrl(url)) {
    logoutWithRefresh()
  }

  return Promise.reject(error)
}
