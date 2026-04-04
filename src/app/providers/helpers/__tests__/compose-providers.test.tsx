import { FC, ReactNode } from 'react'

import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import { composeProviders } from '../compose-providers.tsx'

describe('composeProviders', () => {
  const Provider1: FC<{ children: ReactNode }> = ({ children }) => <div data-testid='provider1'>{children}</div>

  const Provider2: FC<{ children: ReactNode }> = ({ children }) => <div data-testid='provider2'>{children}</div>

  const Provider3: FC<{ children: ReactNode }> = ({ children }) => <div data-testid='provider3'>{children}</div>

  it('should compose multiple providers correctly', async () => {
    const ComposedProviders = composeProviders(Provider1, Provider2, Provider3)

    render(
      <ComposedProviders>
        <div data-testid='content'>Content</div>
      </ComposedProviders>
    )

    await waitFor(() => {
      expect(screen.getByTestId('provider1')).toBeDefined()
      expect(screen.getByTestId('provider2')).toBeDefined()
      expect(screen.getByTestId('provider3')).toBeDefined()
      expect(screen.getByTestId('content')).toBeDefined()
    })
  })

  it('should handle a single provider', async () => {
    const ComposedProviders = composeProviders(Provider1)

    render(
      <ComposedProviders>
        <div data-testid='content'>Content</div>
      </ComposedProviders>
    )

    await waitFor(() => {
      expect(screen.getByTestId('provider1')).toBeDefined()
      expect(screen.getByTestId('content')).toBeDefined()
    })
  })

  it('should handle no providers', async () => {
    const ComposedProviders = composeProviders()

    render(
      <ComposedProviders>
        <div data-testid='content'>Content</div>
      </ComposedProviders>
    )

    await waitFor(() => {
      expect(screen.getByTestId('content')).toBeDefined()
    })
  })
})
