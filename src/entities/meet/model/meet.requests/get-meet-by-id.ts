import { computed, withAsyncData, wrap } from '@reatom/core'

import { routes } from '@/entities/__routes__'

import { apiMeetsIdGet } from '@/shared/__api__'

/**
 * Получение конференции по ID
 */
export const getMeetById = computed(async () => {
  const meetId = routes.meetShow()?.meetId || routes.meetEdit()?.meetId
  if (meetId === undefined) {
    throw new Error('Meet ID is undefined')
  }
  return await wrap(apiMeetsIdGet(meetId))
}, 'getMeetById').extend(withAsyncData())
