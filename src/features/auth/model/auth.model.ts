import { action } from '@reatom/core'

import { ROUTES } from '@/entities/__routes__'
import { clearAuthTokens } from '@/shared/__api__/api-client/api-client.tokens'

export { accessTokenAtom, refreshTokenAtom, clearAuthTokens, setAuthTokens } from '@/shared/__api__/api-client/api-client.tokens'

/** Выход из системы: сбрасываем токены и переходим на страницу логина */
export const logoutAction = action(() => {
  clearAuthTokens()
  ROUTES.AUTH.LOGIN.go()
}, 'logoutAction')
