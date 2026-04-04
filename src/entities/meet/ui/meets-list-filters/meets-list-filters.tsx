import { useState } from 'react'
import type { DateValue, RangeValue } from '@ant-core/ui'
import { CalendarClock, Search } from 'lucide-react'

import { meetMeetStartAtAtom, meetSearchAtom } from '@/entities/meet'

import { parseDateRange } from '@/shared/helpers'
import { useTranslate } from '@/shared/libraries/i18n'
import { useAction, useAtom } from '@/shared/libraries/reatom'
import { CustomDateRangePicker, CustomInput } from '@/shared/ui'

export const MeetsListFilters = () => {
  const { t } = useTranslate()

  const [search] = useAtom(meetSearchAtom)
  const [meetStartAt] = useAtom(meetMeetStartAtAtom)

  // Локальный стейт для хранения текущего значения (включая невалидные даты)
  const [localValue, setLocalValue] = useState<RangeValue<DateValue> | null>(
    () => parseDateRange(meetStartAt) as RangeValue<DateValue> | null
  )

  const setSearch = useAction(meetSearchAtom.set)
  const setMeetStartAt = useAction(meetMeetStartAtAtom.set)

  return (
    <>
      <CustomInput
        placeholder={t('common.search')}
        startContent={<Search className='text-secondary-500 h-6 w-6' />}
        value={search}
        color={'default'}
        className={'pb-3'}
        onChange={(event) => setSearch(event.target.value)}
        classNames={{
          base: 'w-4/5',
        }}
      />
      <CustomDateRangePicker
        endContent={<CalendarClock className='text-secondary-500 h-6 w-6' />}
        classNames={{
          base: 'w-1/5',
        }}
        color={'default'}
        showMonthAndYearPickers
        errorMessage={(valid) => {
          if (!valid.isInvalid) {
            return t('common.invalidDateRange')
          }
        }}
        value={localValue}
        onChange={(range) => {
          // Всегда обновляем локальное значение
          setLocalValue(range)

          if (!range) {
            setMeetStartAt('')
            return
          }

          const start = range.start
          const end = range.end

          // Проверяем валидность каждой даты отдельно (год > 999)
          const isStartValid = start && start.year > 999
          const isEndValid = end && end.year > 999

          // Сохраняем если хотя бы одна дата валидна
          if (isStartValid || isEndValid) {
            const startStr = isStartValid && start ? start.toString() : ''
            const endStr = isEndValid && end ? end.toString() : ''

            // Всегда сохраняем через запятую для единообразия
            setMeetStartAt(`${startStr},${endStr}`)
          } else {
            // Если обе даты невалидны, очищаем фильтр
            setMeetStartAt('')
          }
        }}
      />
    </>
  )
}
