import { reatomForm, withCallHook, wrap } from '@reatom/core'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { authRegisterSchema } from './auth.validation'

export const authRegisterForm = reatomForm(
  {
    email: '',
    password: '',
    confirmPassword: '',
  },
  {
    name: 'authRegisterForm',
    schema: authRegisterSchema,
    onSubmit: async (formValues) => {
      const response = await wrap(authRequests.register(formValues))
      return response
    },
  }
)

authRegisterForm.submit.onFulfill.extend(
  withCallHook(() => {
    ROUTES.AUTH.LOGIN.go()
  })
)

authRegisterForm.submit.onReject.extend(
  withCallHook(({ error }) => {
    console.error(error)
  })
)
