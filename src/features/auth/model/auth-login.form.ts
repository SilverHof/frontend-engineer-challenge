import { reatomForm, withCallHook, wrap } from '@reatom/core'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { tokenHandler } from '@/shared/__api__/api-client/api-client.tokens'

import { authLoginSchema } from './auth.validation'

export const authLoginForm = reatomForm(
  {
    email: '',
    password: '',
  },
  {
    name: 'authLoginForm',
    schema: authLoginSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      const response = await wrap(authRequests.login(formValues))
      return response
    },
  }
)

authLoginForm.submit.onFulfill.extend(
  withCallHook(({ payload }) => {
    tokenHandler.set(payload.data)
    ROUTES.ROOT.DASHBOARD.go()
  })
)

authLoginForm.submit.onReject.extend(
  withCallHook(({ error }) => {
    console.error(error)
  })
)
