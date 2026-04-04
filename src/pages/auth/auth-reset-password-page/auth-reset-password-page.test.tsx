import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Client, Provider } from 'urql'
import { ResetPasswordPage } from './auth-reset-password-page'

vi.mock('@/features/auth/hooks/useResetPassword', () => ({
  useResetPassword: vi.fn(() => ({ requestReset: vi.fn(), loading: false, error: null, success: false })),
}))

const mockClient = { executeMutation: vi.fn(), executeQuery: vi.fn(), executeSubscription: vi.fn() } as unknown as Client

function renderPage() {
  return render(<Provider value={mockClient}><MemoryRouter><ResetPasswordPage /></MemoryRouter></Provider>)
}

describe('ResetPasswordPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders heading and email field', () => {
    renderPage()
    expect(screen.getByText(/восстановление пароля/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/введите e-mail/i)).toBeInTheDocument()
  })

  it('validates email before submit', async () => {
    renderPage()
    await userEvent.type(screen.getByLabelText(/введите e-mail/i), 'bad')
    await userEvent.click(screen.getByRole('button', { name: /восстановить/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
  })

  it('shows success screen (check email) with no form', async () => {
    const { useResetPassword } = await import('@/features/auth/hooks/useResetPassword')
    vi.mocked(useResetPassword).mockReturnValue({ requestReset: vi.fn(), loading: false, error: null, success: true })
    renderPage()
    expect(screen.getByText(/проверьте свою почту/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /восстановить/i })).not.toBeInTheDocument()
  })

  it('shows server error under email field', async () => {
    const { useResetPassword } = await import('@/features/auth/hooks/useResetPassword')
    vi.mocked(useResetPassword).mockReturnValue({ requestReset: vi.fn(), loading: false, error: 'Нет аккаунтов с таким e-mail', success: false })
    renderPage()
    expect(screen.getByRole('alert')).toHaveTextContent(/нет аккаунтов/i)
  })
})
