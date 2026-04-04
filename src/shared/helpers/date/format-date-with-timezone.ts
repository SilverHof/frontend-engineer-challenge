import { getLocalTimeZone, parseDateTime, toZoned } from '@internationalized/date'

export const formatDateWithTimezone = (dateString: string): string => {
  const parsed = parseDateTime(dateString)
  const zoned = toZoned(parsed, getLocalTimeZone())
  return zoned.toAbsoluteString()
}
