import { reatomForm, withCallHook, wrap } from '@reatom/core'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { authRequestPasswordResetSchema } from './auth.validation'

export const authRequestPasswordResetForm = reatomForm(
  {
    email: '',
  },
  {
    name: 'authRequestPasswordResetForm',
    schema: authRequestPasswordResetSchema,
    onSubmit: async (formValues) => {
      const response = await wrap(authRequests.requestPasswordReset(formValues))
      return response
    },
  }
)

authRequestPasswordResetForm.submit.onFulfill.extend(
  withCallHook(() => {
    ROUTES.AUTH.LOGIN.go()
  })
)

authRequestPasswordResetForm.submit.onReject.extend(
  withCallHook(({ error }) => {
    console.error(error)
  })
)
