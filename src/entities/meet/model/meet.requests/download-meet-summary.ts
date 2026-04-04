import { action, withAsync, wrap } from '@reatom/core'

import { apiMeetsIddownloadsummaryPatch } from '@/shared/__api__'

/**
 * Скачивает суммаризацию встречи по её ID
 */
export const downloadMeetSummary = action(async (id: string, format: string) => {
  return await wrap(
    apiMeetsIddownloadsummaryPatch(id, undefined, {
      responseType: 'blob',
      params: { format },
    })
  )
}, 'downloadMeetSummary')

export const downloadMeetSummaryTxt = action(
  async (meetId: string) =>
    await wrap(
      apiMeetsIddownloadsummaryPatch(
        meetId,
        { format: 'txt' },
        {
          responseType: 'blob',
        }
      )
    ),
  'downloadMeetSummaryTxt'
).extend(withAsync({ status: true }))

export const downloadMeetSummaryDocx = action(
  async (meetId: string) =>
    await wrap(
      apiMeetsIddownloadsummaryPatch(
        meetId,
        { format: 'docx' },
        {
          responseType: 'blob',
        }
      )
    ),
  'downloadMeetSummaryDocx'
).extend(withAsync({ status: true }))

export const downloadMeetSummaryMd = action(
  async (meetId: string) =>
    await wrap(
      apiMeetsIddownloadsummaryPatch(
        meetId,
        { format: 'md' },
        {
          responseType: 'blob',
        }
      )
    ),
  'downloadMeetSummaryMd'
).extend(withAsync({ status: true }))
