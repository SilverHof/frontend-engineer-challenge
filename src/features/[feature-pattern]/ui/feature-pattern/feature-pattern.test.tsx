import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { FeaturePattern } from './feature-pattern.tsx'

test('FeaturePattern renders correctly', () => {
  render(<FeaturePattern />)

  const footer = screen.getByRole('contentinfo')
  expect(footer).toBeDefined()

  const heading = screen.getByRole('heading', { name: /footer/i })

  expect(heading).toBeDefined()
  expect(heading.textContent).toBe('Footer')
})
