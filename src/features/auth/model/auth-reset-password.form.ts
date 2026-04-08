import { atom, reatomForm, withCallHook, withSearchParams, wrap } from '@reatom/core'
import { AxiosError } from 'axios'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { authResetPasswordSchema } from './auth.validation'

const authResetPasswordToken = atom('', 'authResetPasswordToken').extend(
  withSearchParams('token', { parse: (value) => value, serialize: (value) => value })
)

export const authResetPasswordForm = reatomForm(
  {
    password: '',
    confirmPassword: '',
  },
  {
    name: 'authResetPasswordForm',
    schema: authResetPasswordSchema,
    onSubmit: async (formValues) => {
      const token = authResetPasswordToken()

      if (!token) {
        throw new AxiosError('Token is required')
      }

      const response = await wrap(authRequests.resetPassword({ newPassword: formValues.password, token: token }))
      return response
    },
  }
)

authResetPasswordForm.submit.onFulfill.extend(
  withCallHook(() => {
    ROUTES.AUTH.RECOVERY_SUCCESS.go()
  })
)

authResetPasswordForm.submit.onReject.extend(
  withCallHook(() => {
    ROUTES.AUTH.RECOVERY_ERROR.go()
  })
)
