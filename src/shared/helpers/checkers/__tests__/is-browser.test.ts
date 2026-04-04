import { describe, expect, it } from 'vitest'

import { isBrowser } from '@/shared/helpers'

describe('isBrowser', () => {
  it('should return true in a browser environment', () => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      expect(isBrowser()).toBe(true)
    }
  })

  it('should return false in a non-browser environment', () => {
    const originalWindow = global.window
    const originalDocument = global.document

    // Переопределяем window и document для симуляции не-браузерной среды
    Object.defineProperty(global, 'window', { value: undefined, configurable: true })
    Object.defineProperty(global, 'document', { value: undefined, configurable: true })

    expect(isBrowser()).toBe(false)

    // Восстанавливаем window и document
    Object.defineProperty(global, 'window', { value: originalWindow, configurable: true })
    Object.defineProperty(global, 'document', { value: originalDocument, configurable: true })
  })
})
