import { action, withAsync, wrap } from '@reatom/core'

import { apiMeetsIddownloadtranscribePatch } from '@/shared/__api__'

/**
 * Скачивает расшифровку встречи по её ID
 */
export const downloadMeetTranscribe = action(async (id: string, format: string) => {
  return await wrap(
    apiMeetsIddownloadtranscribePatch(id, undefined, {
      responseType: 'blob',
      params: { format },
    })
  )
}, 'downloadMeetTranscribe')

export const downloadMeetTranscribeTxt = action(
  async (meetId: string) =>
    await wrap(
      apiMeetsIddownloadtranscribePatch(
        meetId,
        { format: 'txt' },
        {
          responseType: 'blob',
        }
      )
    ),
  'downloadMeetTranscribeTxt'
).extend(withAsync({ status: true }))

export const downloadMeetTranscribeDocx = action(
  async (meetId: string) =>
    await wrap(
      apiMeetsIddownloadtranscribePatch(
        meetId,
        { format: 'docx' },
        {
          responseType: 'blob',
        }
      )
    ),
  'downloadMeetTranscribeDocx'
).extend(withAsync({ status: true }))

export const downloadMeetTranscribeMd = action(
  async (meetId: string) =>
    await wrap(
      apiMeetsIddownloadtranscribePatch(
        meetId,
        { format: 'md' },
        {
          responseType: 'blob',
        }
      )
    ),
  'downloadMeetTranscribeMd'
).extend(withAsync({ status: true }))
