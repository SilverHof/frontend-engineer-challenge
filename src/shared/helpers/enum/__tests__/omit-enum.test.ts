import { describe, expect, it } from 'vitest'

import { omitEnum } from '@/shared/helpers'

describe('omitEnum', () => {
  it('should omit specified keys from the enumeration', () => {
    const enumeration = {
      KEY1: 'value1',
      KEY2: 'value2',
      KEY3: 'value3',
    } as const

    const excludeKeys = ['KEY2'] as (keyof typeof enumeration)[]

    const expected = {
      KEY1: 'value1',
      KEY3: 'value3',
    }

    const result = omitEnum(enumeration, excludeKeys)

    expect(result).toEqual(expected)
  })

  it('should handle empty enumeration', () => {
    const enumeration = {} as const
    const excludeKeys = [] as (keyof typeof enumeration)[]

    const expected = {}

    const result = omitEnum(enumeration, excludeKeys)

    expect(result).toEqual(expected)
  })

  it('should handle enumeration with one key', () => {
    const enumeration = {
      KEY1: 'value1',
    } as const

    const excludeKeys = ['KEY1'] as (keyof typeof enumeration)[]

    const expected = {}

    const result = omitEnum(enumeration, excludeKeys)

    expect(result).toEqual(expected)
  })

  it('should handle enumeration with special characters in keys', () => {
    const enumeration = {
      'KEY-1': 'value1',
      KEY_2: 'value2',
      'KEY.3': 'value3',
    } as const

    const excludeKeys = ['KEY_2'] as (keyof typeof enumeration)[]

    const expected = {
      'KEY-1': 'value1',
      'KEY.3': 'value3',
    }

    const result = omitEnum(enumeration, excludeKeys)

    expect(result).toEqual(expected)
  })

  it('should handle multiple keys to exclude', () => {
    const enumeration = {
      KEY1: 'value1',
      KEY2: 'value2',
      KEY3: 'value3',
    } as const

    const excludeKeys = ['KEY1', 'KEY3'] as (keyof typeof enumeration)[]

    const expected = {
      KEY2: 'value2',
    }

    const result = omitEnum(enumeration, excludeKeys)

    expect(result).toEqual(expected)
  })
})
