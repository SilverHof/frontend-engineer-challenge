import { ROUTES } from '@/entities/__routes__'

import { refreshTokens } from '../__resources__'
import { API_CLIENT_DEFAULT_HEADERS } from './api-client.constants'
import { clientRaw } from './api-client.instance'
import { tokenHandler } from './api-client.tokens'

/**
 * Обновить пару токенов по refresh-токену.
 * Используется внутри interceptor-ов — намеренно обходит axios-инстанс с
 * interceptors, чтобы избежать бесконечного цикла.
 */
export const refreshTokenRequest = async (refreshToken: string) => {
  try {
    const response = await refreshTokens({ refreshToken }, { headers: API_CLIENT_DEFAULT_HEADERS, client: clientRaw })
    tokenHandler.set(response.data)

    return response.data
  } catch {
    logoutWithRefresh()
    return null
  }
}

/**
 * Принудительный выход: сбросить токены и перенаправить на страницу входа.
 * Используется из shared-слоя, поэтому навигация через маршруты из entities.
 */
export const logoutWithRefresh = () => {
  tokenHandler.clear()
  // Достаем из слоя entities, так как определяем маршруты как сущности
  ROUTES.AUTH.LOGIN.go()
}
