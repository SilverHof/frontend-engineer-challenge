import { reatomForm, withCallHook, wrap } from '@reatom/core'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { authResetPasswordSchema } from './auth.validation'

export const authResetPasswordForm = reatomForm(
  {
    password: '',
    confirmPassword: '',
  },
  {
    name: 'authResetPasswordForm',
    schema: authResetPasswordSchema,
    onSubmit: async (formValues) => {
      const token = ''
      const response = await wrap(authRequests.resetPassword({ newPassword: formValues.password, token: token }))
      return response
    },
  }
)

authResetPasswordForm.submit.onFulfill.extend(
  withCallHook(() => {
    ROUTES.AUTH.LOGIN.go()
  })
)

authResetPasswordForm.submit.onReject.extend(
  withCallHook(({ error }) => {
    console.error(error)
  })
)
