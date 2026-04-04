import { action, withAsync, withCallHook, wrap } from '@reatom/core'

import { refreshTokens, RefreshTokensMutationRequest } from '@/shared/__api__'

/**
 * Обновление токенов доступа
 */
export const authRefreshRequest = action(async (data: RefreshTokensMutationRequest) => {
  return await wrap(refreshTokens(data))
}, 'authRefreshRequest').extend(withAsync({ status: true }))

authRefreshRequest.onFulfill.extend(
  withCallHook(() => {
    console.log('refresh success')
  })
)

authRefreshRequest.onReject.extend(
  withCallHook(({ error }) => {
    console.error(error)
  })
)
