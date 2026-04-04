import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { EntityPattern } from './entity-pattern.tsx'

test('EntityPattern renders correctly', () => {
  render(<EntityPattern />)

  const footer = screen.getByRole('contentinfo')
  expect(footer).toBeDefined()

  const heading = screen.getByRole('heading', { name: /footer/i })

  expect(heading).toBeDefined()
  expect(heading.textContent).toBe('Footer')
})
