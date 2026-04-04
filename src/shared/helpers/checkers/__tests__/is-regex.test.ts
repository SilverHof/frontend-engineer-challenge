import { describe, expect, it } from 'vitest'

import { isRegex } from '@/shared/helpers'

describe('isRegex', () => {
  it('should return true when it is a regex', () => {
    expect(isRegex(/[a-z]/)).toBeTruthy()
  })
})
