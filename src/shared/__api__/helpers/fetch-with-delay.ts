import { delay } from './delay'

export const fetchWithDelay = async <T>(data: T, ms = 0): Promise<T> => {
  await delay(ms)
  return data
}
