import { action, withAsync, withCallHook, wrap } from '@reatom/core'

import i18next from 'i18next'

import { apiMeetsIdtranscribePatch } from '@/shared/__api__'
import { toastError } from '@/shared/libraries/reatom'

/**
 *  Транскрибация конференции
 */
export const meetToTranscription = action(async (id: string) => {
  const response = await wrap(apiMeetsIdtranscribePatch(id, {}))
  return response
}, 'meetToTranscription').extend(withAsync({ status: true }))

meetToTranscription.onReject.extend(
  withCallHook(({ error }) => {
    toastError(error, i18next.t('meets.transcription_error.title'))
  })
)
