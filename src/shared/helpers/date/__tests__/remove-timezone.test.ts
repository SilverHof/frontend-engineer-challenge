import { describe, expect, it } from 'vitest'

import { removeTimezone } from '@/shared/helpers'

describe('removeTimezone', () => {
  it('should remove the timezone and return the date in YYYY-MM-DD format', () => {
    const dateString = '2023-10-05T14:48:00.000Z'
    const expectedResult = '2023-10-05'

    const result = removeTimezone(dateString)

    expect(result).toBe(expectedResult)
  })

  it('should handle dates without timezone information', () => {
    const dateString = '2023-10-05T14:48:00'
    const expectedResult = '2023-10-05'

    const result = removeTimezone(dateString)

    expect(result).toBe(expectedResult)
  })

  it('should handle dates with different formats', () => {
    const dateString = '2023-10-05'
    const expectedResult = '2023-10-05'

    const result = removeTimezone(dateString)

    expect(result).toBe(expectedResult)
  })
})
