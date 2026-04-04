import { action, withAsync, withCallHook, wrap } from '@reatom/core'

import { registerUser, RegisterUserMutationRequest } from '@/shared/__api__'

/**
 * Регистрация нового пользователя
 */
export const authRegisterRequest = action(async (data: RegisterUserMutationRequest) => {
  return await wrap(registerUser(data))
}, 'authRegisterRequest').extend(withAsync({ status: true }))

authRegisterRequest.onFulfill.extend(
  withCallHook(() => {
    console.log('register success')
  })
)

authRegisterRequest.onReject.extend(
  withCallHook(({ error }) => {
    console.error(error)
  })
)
