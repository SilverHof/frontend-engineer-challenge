import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { WidgetPattern } from './widget-pattern.tsx'

test('WidgetPattern renders correctly', () => {
  render(<WidgetPattern />)

  const footer = screen.getByRole('contentinfo')
  expect(footer).toBeDefined()

  const heading = screen.getByRole('heading', { name: /footer/i })

  expect(heading).toBeDefined()
  expect(heading.textContent).toBe('Footer')
})
