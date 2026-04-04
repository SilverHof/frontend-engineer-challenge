import { useAction, useAtom } from '@/shared/libraries/reatom'

type AsyncQueryAtomWithData<TData = unknown> = {
  data: { (): TData; subscribe?: (cb: (state: TData) => void) => () => void }
  error: { (): unknown; subscribe?: (cb: (state: unknown) => void) => () => void }
  ready: { (): boolean; subscribe?: (cb: (state: boolean) => void) => () => void }
  retry?: (...args: unknown[]) => unknown
}

type UseAsyncQueryAtomResult<TData = unknown> = {
  data: TData
  error: unknown
  isReady: boolean
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

/**
 * Хук для работы с async-атомами (computed/action с withAsyncData).
 * Возвращает данные, состояние загрузки, ошибку и retry в одном вызове.
 * Тип данных выводится автоматически из async-атома.
 *
 * @example
 * const { data, isLoading, isError, retry } = useAsyncAtom(recorderConfigRequests.getCollection)
 * const items = data?.member ?? []
 */
export const useAsyncQueryAtom = <TData>(asyncAtom: AsyncQueryAtomWithData<TData>): UseAsyncQueryAtomResult<TData> => {
  const [data] = useAtom(asyncAtom.data)
  const [error] = useAtom(asyncAtom.error)
  const [isReady] = useAtom(asyncAtom.ready)

  const refetchAction = asyncAtom.retry ? useAction(asyncAtom.retry) : () => {}

  const refetch = () => {
    if (asyncAtom.retry) {
      refetchAction()
    }
  }

  return {
    data,
    error,
    isReady,
    isLoading: !isReady,
    isError: !!error,
    refetch,
  }
}
