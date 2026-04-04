import { action, withAsync, withCallHook, wrap } from '@reatom/core'

import i18next from 'i18next'

import { apiMeetsIdsummaryPatch } from '@/shared/__api__'
import { toastError } from '@/shared/libraries/reatom'

/**
 *  Суммаризация конференции
 */
export const meetToSummarization = action(async (id: string) => {
  const response = await wrap(apiMeetsIdsummaryPatch(id, {}))
  return response
}, 'meetToSummarization').extend(withAsync({ status: true }))

meetToSummarization.onReject.extend(
  withCallHook(({ error }) => {
    toastError(error, i18next.t('meets.summarization_error.title'))
  })
)
