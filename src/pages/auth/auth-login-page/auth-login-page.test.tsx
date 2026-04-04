import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Client, Provider } from 'urql'
import { LoginPage } from './auth-login-page'

vi.mock('@/features/auth/hooks/useLogin', () => ({
  useLogin: vi.fn(() => ({ login: vi.fn().mockResolvedValue(false), loading: false, error: null })),
}))

const mockClient = { executeMutation: vi.fn(), executeQuery: vi.fn(), executeSubscription: vi.fn() } as unknown as Client

function renderPage() {
  return render(
    <Provider value={mockClient}>
      <MemoryRouter><LoginPage /></MemoryRouter>
    </Provider>,
  )
}

describe('LoginPage', () => {
  beforeEach(() => { sessionStorage.clear(); vi.clearAllMocks() })

  it('renders heading and fields', () => {
    renderPage()
    expect(screen.getByText(/войти в систему/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/введите e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/введите пароль/i)).toBeInTheDocument()
  })

  it('shows field error for empty email', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: /войти/i }))
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBeGreaterThan(0))
  })

  it('disables button when loading', async () => {
    const { useLogin } = await import('@/features/auth/hooks/useLogin')
    vi.mocked(useLogin).mockReturnValue({ login: vi.fn(), loading: true, error: null })
    renderPage()
    expect(screen.getByRole('button', { name: /войти/i })).toBeDisabled()
  })

  it('shows server error under password field', async () => {
    const { useLogin } = await import('@/features/auth/hooks/useLogin')
    vi.mocked(useLogin).mockReturnValue({ login: vi.fn(), loading: false, error: 'Введены неверные данные' })
    renderPage()
    expect(screen.getByText(/введены неверные данные/i)).toBeInTheDocument()
  })

  it('shows link to register page', () => {
    renderPage()
    expect(screen.getByRole('link', { name: /регистрация/i })).toBeInTheDocument()
  })
})
