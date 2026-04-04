import { parseDate } from '@internationalized/date'

export const parseDateRange = (value: string) => {
  if (!value) return null
  const [start, end] = value.split(',')
  // Если обе даты пустые - возвращаем null
  if (!start && !end) return null

  // Возвращаем диапазон даже если одна из дат отсутствует
  return {
    start: start ? parseDate(start) : null,
    end: end ? parseDate(end) : null,
  }
}
