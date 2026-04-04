import { describe, expect, it } from 'vitest'

import { omitObjectProperty } from '@/shared/helpers'

describe('omitObjectProperty', () => {
  it('should omit specified keys from the object', () => {
    const object = {
      KEY1: 'value1',
      KEY2: 'value2',
      KEY3: 'value3',
    }

    const keys = ['KEY2'] as (keyof typeof object)[]

    const expected = {
      KEY1: 'value1',
      KEY3: 'value3',
    }

    const result = omitObjectProperty(object, keys)

    expect(result).toEqual(expected)
  })

  it('should handle empty object', () => {
    const object = {}
    const keys = [] as (keyof typeof object)[]

    const expected = {}

    const result = omitObjectProperty(object, keys)

    expect(result).toEqual(expected)
  })

  it('should handle object with one key', () => {
    const object = {
      KEY1: 'value1',
    }

    const keys = ['KEY1'] as (keyof typeof object)[]

    const expected = {}

    const result = omitObjectProperty(object, keys)

    expect(result).toEqual(expected)
  })

  it('should handle object with special characters in keys', () => {
    const object = {
      'KEY-1': 'value1',
      KEY_2: 'value2',
      'KEY.3': 'value3',
    }

    const keys = ['KEY_2'] as (keyof typeof object)[]

    const expected = {
      'KEY-1': 'value1',
      'KEY.3': 'value3',
    }

    const result = omitObjectProperty(object, keys)

    expect(result).toEqual(expected)
  })

  it('should handle multiple keys to omit', () => {
    const object = {
      KEY1: 'value1',
      KEY2: 'value2',
      KEY3: 'value3',
    }

    const keys = ['KEY1', 'KEY3'] as (keyof typeof object)[]

    const expected = {
      KEY2: 'value2',
    }

    const result = omitObjectProperty(object, keys)

    expect(result).toEqual(expected)
  })
})
