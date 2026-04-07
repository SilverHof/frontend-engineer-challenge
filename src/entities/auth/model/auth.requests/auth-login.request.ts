import { action, withAsync, withCallHook, wrap } from '@reatom/core'
import { AxiosError } from 'axios'

import { loginUser, LoginUserMutationRequest } from '@/shared/__api__'

/**
 * Авторизация пользователя
 */
export const authLoginRequest = action(async (data: LoginUserMutationRequest) => {
  return await wrap(loginUser(data))
}, 'loginAction').extend(
  withAsync({
    status: true,
    parseError(error) {
      return error as AxiosError
    },
  })
)

authLoginRequest.onFulfill.extend(withCallHook(() => {}))

authLoginRequest.onReject.extend(
  withCallHook(({ error }) => {
    console.error(error)
  })
)
