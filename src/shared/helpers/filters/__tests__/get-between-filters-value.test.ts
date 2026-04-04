import { describe, expect, it } from 'vitest'

import { getBetweenFiltersValue } from '@/shared/helpers'

describe('getBetweenFiltersValue', () => {
  it('should return a string with values joined by ".." when value is an array', () => {
    const value = [1, 2, 3]
    const expected = '1..2..3'

    const result = getBetweenFiltersValue(value)

    expect(result).toEqual(expected)
  })

  it('should return null when value is null', () => {
    const value = null

    const result = getBetweenFiltersValue(value)

    expect(result).toBeNull()
  })

  it('should return an empty string when value is an empty array', () => {
    const value: number[] = []
    const expected = ''

    const result = getBetweenFiltersValue(value)

    expect(result).toEqual(expected)
  })

  it('should return a string with a single value when value is an array with one element', () => {
    const value = [42]
    const expected = '42'

    const result = getBetweenFiltersValue(value)

    expect(result).toEqual(expected)
  })
})
