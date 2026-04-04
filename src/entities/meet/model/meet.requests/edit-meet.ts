import { action, withAsync, withCallHook, wrap } from '@reatom/core'
import { addToast } from '@ant-core/ui'

import i18next from 'i18next'

import { HydraErrorWithDetail } from '@/shared/@types'
import { apiMeetsIdPatch, ApiMeetsIdPatchMutationRequest } from '@/shared/__api__'

export const editMeet = action(async (id: string, data: ApiMeetsIdPatchMutationRequest) => {
  const response = await wrap(apiMeetsIdPatch(id, data))

  return response
}, 'editMeet').extend(withAsync({ status: true }))

editMeet.onFulfill.extend(
  withCallHook(() => {
    addToast({
      title: i18next.t('meet_edit.edit.success'),
      color: 'success',
    })
  })
)

editMeet.onReject.extend(
  withCallHook(({ error }) => {
    addToast({
      title: i18next.t('meet_edit.edit.error'),
      description: (error as unknown as HydraErrorWithDetail)?.detail,
      color: 'danger',
    })
  })
)
