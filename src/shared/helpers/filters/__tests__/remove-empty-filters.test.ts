import { describe, expect, it } from 'vitest'

import { removeEmptyFilters } from '@/shared/helpers'

describe('removeEmptyFilters', () => {
  it('should remove filters with null, undefined, or empty string values', () => {
    const filters = {
      key1: 'value1',
      key2: null,
      key3: undefined,
      key4: '',
      key5: 0,
      key6: false,
    }

    const expected = {
      key1: 'value1',
      key5: 0,
      key6: false,
    }

    const result = removeEmptyFilters(filters)

    expect(result).toEqual(expected)
  })

  it('should handle empty filters object', () => {
    const filters = {}

    const expected = {}

    const result = removeEmptyFilters(filters)

    expect(result).toEqual(expected)
  })

  it('should handle filters object with all valid values', () => {
    const filters = {
      key1: 'value1',
      key2: 42,
      key3: true,
    }

    const expected = {
      key1: 'value1',
      key2: 42,
      key3: true,
    }

    const result = removeEmptyFilters(filters)

    expect(result).toEqual(expected)
  })

  it('should handle filters object with all empty values', () => {
    const filters = {
      key1: null,
      key2: undefined,
      key3: '',
    }

    const expected = {}

    const result = removeEmptyFilters(filters)

    expect(result).toEqual(expected)
  })
})
