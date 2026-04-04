import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecoveryLayout } from '@/pages/RecoveryLayout'
import { FloatingInput } from '@/shared/ui/FloatingInput'
import { Button } from '@/shared/ui/Button'
import { useResetPassword } from '@/features/auth/hooks/useResetPassword'
import { resetPasswordSchema } from '@/shared/lib/validation'

export const AuthResetPasswordPage = () => {
  const navigate = useNavigate()
  const { requestReset, loading, error, success } = useResetPassword()
  const [email, setEmail] = useState('')
  const [fieldError, setFieldError] = useState<string | undefined>()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const result = resetPasswordSchema.safeParse({ email })
    if (!result.success) {
      setFieldError(result.error.issues[0]?.message)
      return
    }
    setFieldError(undefined)
    await requestReset(result.data)
  }

  if (success) {
    return (
      <RecoveryLayout>
        <div className="flex flex-col items-center text-center gap-6">
          <div>
            <h1 className="text-[26px] font-bold text-[#1E2027] mb-3">Проверьте свою почту</h1>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Мы отправили на почту письмо с ссылкой для восстановления пароля
            </p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/login')} className="max-w-xs">
            Назад в авторизацию
          </Button>
        </div>
      </RecoveryLayout>
    )
  }

  return (
    <RecoveryLayout>
      <div className="flex flex-col gap-8">
        <div>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 text-sm text-[#1E2027] mb-4 hover:opacity-70 transition-opacity"
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
              <path d="M6 1L1 6l5 5" stroke="#1E2027" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-[26px] font-bold text-[#1E2027] mb-2">Восстановление пароля</h1>
          <p className="text-sm text-[#6B7280]">
            Укажите адрес почты на который был зарегистрирован аккаунт
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
          <FloatingInput
            id="email"
            label="Введите e-mail"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (fieldError) setFieldError(undefined) }}
            error={fieldError ?? error ?? undefined}
            disabled={loading}
          />

          <Button type="submit" loading={loading} variant="secondary" className="mt-6">
            Восстановить пароль
          </Button>
        </form>
      </div>
    </RecoveryLayout>
  )
}
