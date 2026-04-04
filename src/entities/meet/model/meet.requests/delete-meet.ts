import { action, withAsync, withCallHook, wrap } from '@reatom/core'
import { addToast } from '@ant-core/ui'

import i18next from 'i18next'

import { apiMeetsIdDelete } from '@/shared/__api__'
import { toastError } from '@/shared/libraries/reatom'

/**
 * Удаление конференции
 */
export const deleteMeet = action(async (id: string) => {
  const response = await wrap(apiMeetsIdDelete(id))
  return response
}, 'deleteMeet').extend(withAsync({ status: true }))

deleteMeet.onFulfill.extend(
  withCallHook(() => {
    addToast({
      title: i18next.t('meets.delete.success'),
      color: 'success',
    })
  })
)

deleteMeet.onReject.extend(
  withCallHook(({ error }) => {
    toastError(error, i18next.t('meets.delete.error'))
  })
)
