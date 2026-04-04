import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Client, Provider } from 'urql'
import { NewPasswordPage } from './auth-new-password-page'

vi.mock('@/features/auth/hooks/useNewPassword', () => ({
  useNewPassword: vi.fn(() => ({ resetPassword: vi.fn().mockResolvedValue(false), loading: false, error: null, success: false })),
}))

const mockClient = { executeMutation: vi.fn(), executeQuery: vi.fn(), executeSubscription: vi.fn() } as unknown as Client

function renderPage(search = '') {
  return render(
    <Provider value={mockClient}>
      <MemoryRouter initialEntries={[`/new-password${search}`]}>
        <NewPasswordPage />
      </MemoryRouter>
    </Provider>,
  )
}

describe('NewPasswordPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders 2 password fields', () => {
    renderPage()
    expect(screen.getByLabelText(/введите пароль/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/повторите пароль/i)).toBeInTheDocument()
  })

  it('validates passwords match', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/введите пароль/i), 'Secret123!')
    await user.type(screen.getByLabelText(/повторите пароль/i), 'Different!')
    await user.click(screen.getByRole('button', { name: /изменить пароль/i }))
    await waitFor(() => expect(screen.getByText(/не совпадают/i)).toBeInTheDocument())
  })

  it('validates password length', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/введите пароль/i), 'abc')
    await user.click(screen.getByRole('button', { name: /изменить пароль/i }))
    await waitFor(() => expect(screen.getByText(/короче 8/i)).toBeInTheDocument())
  })

  it('shows success state', async () => {
    const { useNewPassword } = await import('@/features/auth/hooks/useNewPassword')
    vi.mocked(useNewPassword).mockReturnValue({ resetPassword: vi.fn(), loading: false, error: null, success: true })
    renderPage()
    expect(screen.getByText(/пароль был восстановлен/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /изменить/i })).not.toBeInTheDocument()
  })

  it('shows error state with retry link', async () => {
    const { useNewPassword } = await import('@/features/auth/hooks/useNewPassword')
    vi.mocked(useNewPassword).mockReturnValue({ resetPassword: vi.fn(), loading: false, error: 'Токен недействителен', success: false })
    renderPage()
    expect(screen.getByText(/не был восстановлен/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /попробовать заново/i })).toBeInTheDocument()
  })
})
