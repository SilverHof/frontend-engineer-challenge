import dayjs from 'dayjs'

export const calculateDuration = (duration?: number) => {
  const dur = dayjs.duration(duration as number, 'seconds')
  const hours = Math.floor(dur.asHours())
  const minutes = dur.minutes()
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${dur.seconds().toString().padStart(2, '0')}`
}
