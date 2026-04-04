import { reatomForm, withCallHook } from '@reatom/core'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { authLoginSchema } from './auth.validation'

export const authLoginForm = reatomForm(
  {
    email: '',
    password: '',
  },
  {
    name: 'authLoginForm',
    // schema: authLoginSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      console.log('formValues', formValues)
      return await authRequests.login(formValues)
    },
  }
)

authLoginForm.submit.onFulfill.extend(
  withCallHook(() => {
    ROUTES.ROOT.DASHBOARD.go()
  })
)

authLoginForm.submit.onReject.extend(
  withCallHook(({ error }) => {
    console.error(error)
  })
)
