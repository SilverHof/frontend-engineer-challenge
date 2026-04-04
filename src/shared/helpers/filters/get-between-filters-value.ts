import type { Nullable } from '@/shared/@types'

export const getBetweenFiltersValue = (value: Nullable<number[]>) => {
  return value && value.join('..')
}
