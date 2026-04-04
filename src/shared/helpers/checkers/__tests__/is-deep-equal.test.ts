import { describe, expect, it } from 'vitest'

import { isDeepEqual } from '@/shared/helpers'

describe('isDeepEqual', () => {
  it('should return false when two sets not match', () => {
    expect(isDeepEqual([{ test: '123' }, { test: '455' }, { test: '455' }], [])).toBeFalsy()

    expect(
      isDeepEqual(
        [{ test: '123' }, { test: '455' }, { test: '455' }],
        [{ test: '123' }, { test: '455' }, { test: '455', test1: 'what' }]
      )
    ).toBeFalsy()

    expect(isDeepEqual([{}], [])).toBeFalsy()

    expect(isDeepEqual([], [{}])).toBeFalsy()
    expect(isDeepEqual(new Date(), new Date('1999'))).toBeFalsy()

    expect(
      isDeepEqual(
        {
          unknown: undefined,
          userName: '',
          fruit: '',
        },
        {
          userName: '',
          fruit: '',
          break: {},
        }
      )
    ).toBeFalsy()
  })

  it('should return false when either type is primitive', () => {
    expect(isDeepEqual(null, [])).toBeFalsy()
    expect(isDeepEqual([], null)).toBeFalsy()
    expect(isDeepEqual({}, undefined)).toBeFalsy()
    expect(isDeepEqual(undefined, {})).toBeFalsy()
  })

  it('should return true when two sets matches', () => {
    expect(isDeepEqual([{ name: 'useFieldArray' }], [{ name: 'useFieldArray' }])).toBeTruthy()

    expect(
      isDeepEqual(
        [{ test: '123' }, { test: '455' }, { test: '455' }],
        [{ test: '123' }, { test: '455' }, { test: '455' }]
      )
    ).toBeTruthy()

    expect(isDeepEqual({}, {})).toBeTruthy()

    expect(isDeepEqual([], [])).toBeTruthy()

    expect(isDeepEqual([{ test: '123' }, { test: '455' }], [{ test: '123' }, { test: '455' }])).toBeTruthy()

    expect(
      isDeepEqual(
        [
          {
            test: '123',
            nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }],
          },
          {
            test: '455',
            nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }],
          },
        ],
        [
          {
            test: '123',
            nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }],
          },
          {
            test: '455',
            nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }],
          },
        ]
      )
    ).toBeTruthy()
  })

  it('should compare date time object valueOf', () => {
    expect(isDeepEqual({ test: new Date('1990') }, { test: new Date('1990') })).toBeTruthy()
  })
})
