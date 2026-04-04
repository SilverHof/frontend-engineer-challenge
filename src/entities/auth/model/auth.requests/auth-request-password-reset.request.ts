import { action, withAsync, withCallHook, wrap } from '@reatom/core'

import { requestPasswordReset, RequestPasswordResetMutationRequest } from '@/shared/__api__'

/**
 * Запрос сброса пароля
 */
export const authRequestPasswordResetRequest = action(async (data: RequestPasswordResetMutationRequest) => {
  return await wrap(requestPasswordReset(data))
}, 'authRequestPasswordResetRequest').extend(withAsync({ status: true }))

authRequestPasswordResetRequest.onFulfill.extend(
  withCallHook(() => {
    console.log('request password reset success')
  })
)

authRequestPasswordResetRequest.onReject.extend(
  withCallHook(({ error }) => {
    console.error(error)
  })
)
