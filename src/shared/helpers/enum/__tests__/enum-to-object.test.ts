import { describe, expect, it } from 'vitest'

import { enumToObject } from '@/shared/helpers'

describe('enumToObject', () => {
  it('should convert an enumeration to an object', () => {
    const enumeration = {
      KEY1: 'value1',
      KEY2: 'value2',
      KEY3: 'value3',
    } as const

    const expected = {
      KEY1: 'value1',
      KEY2: 'value2',
      KEY3: 'value3',
    }

    const result = enumToObject(enumeration)

    expect(result).toEqual(expected)
  })

  it('should handle empty enumeration', () => {
    const enumeration = {} as const

    const expected = {}

    const result = enumToObject(enumeration)

    expect(result).toEqual(expected)
  })

  it('should handle enumeration with one key', () => {
    const enumeration = {
      KEY1: 'value1',
    } as const

    const expected = {
      KEY1: 'value1',
    }

    const result = enumToObject(enumeration)

    expect(result).toEqual(expected)
  })

  it('should handle enumeration with special characters in keys', () => {
    const enumeration = {
      'KEY-1': 'value1',
      KEY_2: 'value2',
      'KEY.3': 'value3',
    } as const

    const expected = {
      'KEY-1': 'value1',
      KEY_2: 'value2',
      'KEY.3': 'value3',
    }

    const result = enumToObject(enumeration)

    expect(result).toEqual(expected)
  })
})
