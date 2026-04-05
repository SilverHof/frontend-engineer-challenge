import { action } from '@reatom/core'

import { ROUTES } from '@/entities/__routes__'

import { tokenHandler } from '@/shared/__api__/api-client/api-client.tokens'

export const logoutAction = action(() => {
  tokenHandler.clear()
  ROUTES.AUTH.LOGIN.go()
}, 'logoutAction')
