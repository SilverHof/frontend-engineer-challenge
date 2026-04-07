import { atom, reatomForm, withCallHook, wrap } from '@reatom/core'
import { AxiosError } from 'axios'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { authResetPasswordSchema } from './auth.validation'

export const authResetPasswordFormError = atom<AxiosError | null>(null)

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
    authResetPasswordFormError.set(error instanceof AxiosError ? error : null)
  })
)
