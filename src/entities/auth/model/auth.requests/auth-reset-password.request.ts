import { action, withAsync, withCallHook, wrap } from '@reatom/core'

import { resetPassword, ResetPasswordMutationRequest } from '@/shared/__api__'

/**
 * Сброс пароля с использованием токена
 */
export const authResetPasswordRequest = action(async (data: ResetPasswordMutationRequest) => {
  return await wrap(resetPassword(data))
}, 'authResetPasswordRequest').extend(withAsync({ status: true }))

authResetPasswordRequest.onFulfill.extend(
  withCallHook(() => {
    console.log('reset password success')
  })
)

authResetPasswordRequest.onReject.extend(
  withCallHook(({ error }) => {
    console.error(error)
  })
)
