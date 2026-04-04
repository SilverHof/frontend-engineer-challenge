import { describe, expect, it } from 'vitest'

import { copyEnum } from '@/shared/helpers'

describe('copyEnum', () => {
  it('should create a deep copy of the enumeration', () => {
    const enumeration = {
      KEY1: 'value1',
      KEY2: 'value2',
      KEY3: 'value3',
    } as const

    const result = copyEnum(enumeration)

    expect(result).toEqual(enumeration)
    expect(result).not.toBe(enumeration)
  })

  it('should handle empty enumeration', () => {
    const enumeration = {} as const

    const result = copyEnum(enumeration)

    expect(result).toEqual(enumeration)
    expect(result).not.toBe(enumeration)
  })

  it('should handle enumeration with one key', () => {
    const enumeration = {
      KEY1: 'value1',
    } as const

    const result = copyEnum(enumeration)

    expect(result).toEqual(enumeration)
    expect(result).not.toBe(enumeration)
  })

  it('should handle enumeration with special characters in keys', () => {
    const enumeration = {
      'KEY-1': 'value1',
      KEY_2: 'value2',
      'KEY.3': 'value3',
    } as const

    const result = copyEnum(enumeration)

    expect(result).toEqual(enumeration)
    expect(result).not.toBe(enumeration)
  })
})
