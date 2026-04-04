import { useAction, useAtom } from '@/shared/libraries/reatom'

type AsyncActionAtom = {
  (...args: any[]): Promise<unknown>
  ready: { (): boolean; subscribe?: (cb: (state: boolean) => void) => () => void }
  error: { (): unknown; subscribe?: (cb: (state: unknown) => void) => () => void }
  pending?: { (): number; subscribe?: (cb: (state: number) => void) => () => void }
  retry?: (...args: unknown[]) => unknown
}

type UseAsyncActionAtomResult<TAction extends AsyncActionAtom> = {
  mutate: (...args: Parameters<TAction>) => ReturnType<TAction>
  isReady: boolean
  isLoading: boolean
  isError: boolean
  error: unknown
  retry: () => void
}

/**
 * Хук для работы с async-экшенами (action с withAsync).
 * Возвращает mutate для вызова, состояние загрузки, ошибку и retry.
 *
 * @example
 * const { mutate, isLoading, isError, error, retry } = useAsyncActionAtom(meetRequests.create)
 * await mutate(requestData)
 */
export const useAsyncActionAtom = <TAction extends AsyncActionAtom>(
  asyncAction: TAction
): UseAsyncActionAtomResult<TAction> => {
  const [isReady] = useAtom(asyncAction.ready)
  const [error] = useAtom(asyncAction.error)
  const mutate = useAction(asyncAction)
  const retryAction = asyncAction.retry ? useAction(asyncAction.retry) : () => {}

  const retry = () => {
    if (asyncAction.retry) {
      retryAction()
    }
  }

  return {
    mutate: mutate as UseAsyncActionAtomResult<TAction>['mutate'],
    isReady,
    isLoading: !isReady,
    isError: !!error,
    error,
    retry,
  }
}
