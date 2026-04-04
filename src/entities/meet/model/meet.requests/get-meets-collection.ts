import { computed, sleep, withAsyncData, wrap } from '@reatom/core'

import { apiMeetsGetCollection } from '@/shared/__api__'

import {
  meetItemsPerPageAtom,
  meetMeetEndAtAtom,
  meetMeetStartAtAtom,
  meetPageAtom,
  meetSearchAtom,
  meetSortAtom,
  meetsRefreshTriggerAtom,
} from '../meet.model'

/**
 * Получение коллекции конференций
 */
export const getMeetsCollection = computed(async () => {
  meetsRefreshTriggerAtom()

  const sortString = meetSortAtom()
  const page = meetPageAtom()
  const itemsPerPage = meetItemsPerPageAtom()
  const search = meetSearchAtom()
  const meetStartAt = meetMeetStartAtAtom()
  const meetEndAt = meetMeetEndAtAtom()

  await wrap(sleep(300))

  const params: Record<string, unknown> = {
    page,
    itemsPerPage: itemsPerPage,
  }

  // Добавляем поиск по имени
  if (search) {
    params.name = search
  }

  // Добавляем фильтры по дате начала
  if (meetStartAt) {
    const [start, end] = meetStartAt.split(',')
    if (start) {
      params['meetStartAt[after]'] = start
    }
    if (end) {
      params['meetStartAt[before]'] = end
    }
  }

  // Добавляем фильтры по дате окончания
  if (meetEndAt) {
    const [start, end] = meetEndAt.split(',')
    if (start) {
      params['meetEndAt[after]'] = start
    }
    if (end) {
      params['meetEndAt[before]'] = end
    }
  }

  // Парсим JSON строку сортировки и добавляем только один параметр сортировки
  if (sortString) {
    try {
      const sortObj = JSON.parse(sortString)
      const sortKeys = Object.keys(sortObj)
      if (sortKeys.length > 0) {
        const sortKey = sortKeys[0]
        // Если ключ уже содержит order[], используем его как есть
        // Иначе оборачиваем в order[]
        const paramKey = sortKey.startsWith('order[') ? sortKey : `order[${sortKey}]`
        params[paramKey] = sortObj[sortKey]
      }
    } catch (e) {
      // Игнорируем ошибки парсинга
    }
  }

  const response = await wrap(apiMeetsGetCollection(params))

  return response
}, 'getMeetsCollection').extend(withAsyncData())
