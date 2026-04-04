import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Client, Provider } from 'urql'
import { RegisterPage } from './auth-register-page'

vi.mock('@/features/auth/hooks/useRegister', () => ({
  useRegister: vi.fn(() => ({ register: vi.fn().mockResolvedValue(false), loading: false, error: null, success: false })),
}))

const mockClient = { executeMutation: vi.fn(), executeQuery: vi.fn(), executeSubscription: vi.fn() } as unknown as Client

function renderPage() {
  return render(
    <Provider value={mockClient}>
      <MemoryRouter><RegisterPage /></MemoryRouter>
    </Provider>,
  )
}

describe('RegisterPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders all 3 fields', () => {
    renderPage()
    expect(screen.getByLabelText(/введите e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/введите пароль/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/повторите пароль/i)).toBeInTheDocument()
  })

  it('shows "passwords do not match" error', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/введите e-mail/i), 'user@test.com')
    await user.type(screen.getByLabelText(/введите пароль/i), 'Password1!')
    await user.type(screen.getByLabelText(/повторите пароль/i), 'Different1!')
    await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }))
    await waitFor(() => expect(screen.getByText(/не совпадают/i)).toBeInTheDocument())
  })

  it('shows "too short" error for password < 8 chars', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/введите e-mail/i), 'user@test.com')
    await user.type(screen.getByLabelText(/введите пароль/i), 'abc')
    await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }))
    await waitFor(() => expect(screen.getByText(/менее 8 символов/i)).toBeInTheDocument())
  })

  it('shows email server error under email field', async () => {
    const { useRegister } = await import('@/features/auth/hooks/useRegister')
    vi.mocked(useRegister).mockReturnValue({ register: vi.fn(), loading: false, error: 'Пользователь с таким email уже существует', success: false })
    renderPage()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('disables fields after success', async () => {
    const { useRegister } = await import('@/features/auth/hooks/useRegister')
    vi.mocked(useRegister).mockReturnValue({ register: vi.fn(), loading: false, error: null, success: true })
    renderPage()
    expect(screen.getByLabelText(/введите e-mail/i)).toBeDisabled()
  })
})
