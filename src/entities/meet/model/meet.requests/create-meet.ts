import { action, withAsync, withCallHook, wrap } from '@reatom/core'
import { addToast } from '@ant-core/ui'

import i18next from 'i18next'

import { meetsRefreshTriggerAtom } from '@/entities/meet'

import { HydraErrorWithDetail } from '@/shared/@types'
import { apiMeetsPost, ApiMeetsPostMutationRequest } from '@/shared/__api__'

/**
 * Создание конференции
 */
export const createMeet = action(async (data: ApiMeetsPostMutationRequest) => {
  return await wrap(apiMeetsPost(data))
}, 'createMeet').extend(withAsync({ status: true }))

createMeet.onFulfill.extend(
  withCallHook(() => {
    meetsRefreshTriggerAtom.set((v) => v + 1)
    addToast({
      title: i18next.t('meets.create.success'),
      color: 'success',
    })
    meetsRefreshTriggerAtom.set((v) => v + 1)
  })
)

createMeet.onReject.extend(
  withCallHook(({ error }) => {
    addToast({
      title: i18next.t('meets.create.error'),
      description: (error as unknown as HydraErrorWithDetail)?.detail,
      color: 'danger',
    })
  })
)
