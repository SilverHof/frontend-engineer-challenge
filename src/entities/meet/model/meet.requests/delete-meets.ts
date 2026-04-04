import { action, withAsync, withCallHook, wrap } from '@reatom/core'
import { addToast } from '@ant-core/ui'

import i18next from 'i18next'

import { meetsRefreshTriggerAtom } from '@/entities/meet'

import { apiMeetsmassDeletePost, ApiMeetsmassDeletePostMutationRequest } from '@/shared/__api__'

/**
 * Массовое удаление конференций
 */
export const deleteMeetsMass = action(async (data: ApiMeetsmassDeletePostMutationRequest) => {
  const response = await wrap(apiMeetsmassDeletePost(data))
  return response
}, 'deleteMeets').extend(withAsync())

deleteMeetsMass.onFulfill.extend(
  withCallHook(() => {
    addToast({
      title: i18next.t('meets.deleteMass.success'),
      color: 'success',
    })
    meetsRefreshTriggerAtom.set((v) => v + 1)
  })
)

deleteMeetsMass.onReject.extend(
  withCallHook(({ error }) => {
    addToast({
      title: i18next.t('meets.deleteMass.error'),
      description: error?.message,
      color: 'danger',
    })
  })
)
