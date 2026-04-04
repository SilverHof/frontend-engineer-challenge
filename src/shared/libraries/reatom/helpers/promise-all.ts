import { wrap } from '@reatom/core'

/**
 * Промис с привязанным AbortController.
 * Позволяет отменять выполнение извне через controller.abort().
 */
export interface ControlledPromise<T = any> extends Promise<T> {
  controller: AbortController
}

/**
 * Аналог Promise.all для ControlledPromise.
 * Ждёт завершения всех промисов, при завершении (resolve/reject) или при отмене
 * родительского контекста Reatom вызывает abort у каждого controller — все
 * параллельные запросы отменяются разом.
 */
export const promiseAll = <Payload>(...promises: Array<ControlledPromise<Payload>>): Promise<Awaited<Payload>[]> =>
  Promise.all(promises).finally(
    wrap(() => {
      promises.forEach((fork) => {
        if (fork.controller) {
          fork.controller.abort('all')
        }
      })
    })
  )
