import { action, withAsync, withCallHook, wrap } from '@reatom/core'

import { loginUser, LoginUserMutationRequest } from '@/shared/__api__'

/**
 * Авторизация пользователя
 */
export const authLoginRequest = action(async (data: LoginUserMutationRequest) => {
  return await wrap(loginUser(data))
}, 'loginAction').extend(withAsync({ status: true }))

authLoginRequest.onFulfill.extend(withCallHook(() => {}))

authLoginRequest.onReject.extend(withCallHook(({ error }) => {
  console.error(error)
}))
