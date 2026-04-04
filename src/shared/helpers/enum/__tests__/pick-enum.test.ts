import { describe, expect, it } from 'vitest'

import { pickEnum } from '@/shared/helpers'

describe('pickEnum', () => {
  it('should pick specified keys from the enumeration', () => {
    const enumeration = {
      KEY1: 'value1',
      KEY2: 'value2',
      KEY3: 'value3',
    } as const

    const includeKeys = ['KEY1', 'KEY3'] as (keyof typeof enumeration)[]

    const expected = {
      KEY1: 'value1',
      KEY3: 'value3',
    }

    const result = pickEnum(enumeration, includeKeys)

    expect(result).toEqual(expected)
  })

  it('should handle empty enumeration', () => {
    const enumeration = {} as const
    const includeKeys = [] as (keyof typeof enumeration)[]

    const expected = {}

    const result = pickEnum(enumeration, includeKeys)

    expect(result).toEqual(expected)
  })

  it('should handle enumeration with one key', () => {
    const enumeration = {
      KEY1: 'value1',
    } as const

    const includeKeys = ['KEY1'] as (keyof typeof enumeration)[]

    const expected = {
      KEY1: 'value1',
    }

    const result = pickEnum(enumeration, includeKeys)

    expect(result).toEqual(expected)
  })

  it('should handle enumeration with special characters in keys', () => {
    const enumeration = {
      'KEY-1': 'value1',
      KEY_2: 'value2',
      'KEY.3': 'value3',
    } as const

    const includeKeys = ['KEY-1', 'KEY.3'] as (keyof typeof enumeration)[]

    const expected = {
      'KEY-1': 'value1',
      'KEY.3': 'value3',
    }

    const result = pickEnum(enumeration, includeKeys)

    expect(result).toEqual(expected)
  })

  it('should handle multiple keys to include', () => {
    const enumeration = {
      KEY1: 'value1',
      KEY2: 'value2',
      KEY3: 'value3',
    } as const

    const includeKeys = ['KEY1', 'KEY2'] as (keyof typeof enumeration)[]

    const expected = {
      KEY1: 'value1',
      KEY2: 'value2',
    }

    const result = pickEnum(enumeration, includeKeys)

    expect(result).toEqual(expected)
  })
})
