import { atom, withSearchParams } from '@reatom/core'

// Выбранные строки
export const meetSelectedIdsAtom = atom<string[]>([], 'meetSelectedIdsAtom')

// ===== URL-синхронизированные атомы =====

// Поиск
export const meetSearchAtom = atom('', 'meetSearchAtom').extend(withSearchParams('search'))

// Диапазон дат начала конференции
export const meetMeetStartAtAtom = atom<string>('', 'meetMeetStartAtAtom').extend(withSearchParams('meetStartAt'))

// Диапазон дат окончания конференции
export const meetMeetEndAtAtom = atom<string>('', 'meetMeetEndAtAtom').extend(withSearchParams('meetEndAt'))

// Страница (сбрасывается при изменении поиска)
export const meetPageAtom = atom(1, 'meetPageAtom')

// Количество элементов на странице
export const meetItemsPerPageAtom = atom(10, 'meetItemsPerPageAtom')

// Сортировка
export const meetSortAtom = atom('', 'meetSortAtom').extend(withSearchParams('sort'))

// Сортировка истории статусов
export const meetStatusHistorySortAtom = atom('', 'meetStatusHistorySortAtom')
export const meetsRefreshTriggerAtom = atom(0, 'meetsRefreshTriggerAtom')
