import { atom, reatomForm, withCallHook, wrap } from '@reatom/core'
import { AxiosError } from 'axios'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { tokenHandler } from '@/shared/__api__/api-client/api-client.tokens'
import { ActionError } from '@/shared/libraries/reatom'

import { authLoginSchema } from './auth.validation'

export const authLoginFormError = atom<AxiosError | null>(null)

export const authLoginFormServerError = atom({
  email: '',
  password: '',
})

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
      authLoginFormError.set(null)
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
  withCallHook<ActionError>(({ error }) => {
    authLoginFormError.set(error instanceof AxiosError ? error : null)
  })
)
