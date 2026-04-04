import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/pages/AuthLayout'
import { FloatingInput } from '@/shared/ui/FloatingInput'
import { FloatingPasswordInput } from '@/shared/ui/FloatingPasswordInput'
import { Button } from '@/shared/ui/Button'
import { useRegister } from '@/features/auth/hooks/useRegister'
import { registerSchema, type RegisterFormData } from '@/shared/lib/validation'

type FieldErrors = Partial<Record<keyof RegisterFormData, string>>

export const AuthRegisterPage = () => {
  const navigate = useNavigate()
  const { register, loading, error, success } = useRegister()
  const [fields, setFields] = useState<RegisterFormData>({ email: '', password: '', confirmPassword: '' })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  function handleChange(key: keyof RegisterFormData, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (fieldErrors[key]) setFieldErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const result = registerSchema.safeParse(fields)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof RegisterFormData
        if (!errors[key]) errors[key] = issue.message
      }
      setFieldErrors(errors)
      return
    }
    const ok = await register(result.data)
    if (ok) setTimeout(() => navigate('/login'), 1800)
  }

  // Route server errors to the right field
  const emailServerError = error?.toLowerCase().includes('занят') || error?.toLowerCase().includes('exist') || error?.toLowerCase().includes('registered')
    ? error
    : undefined
  const globalError = error && !emailServerError ? error : undefined

  const footer = (
    <>
      Уже есть аккаунт?{' '}
      <Link to="/login" className="text-[#31A0F0] hover:underline font-medium">
        Войти
      </Link>
    </>
  )

  return (
    <AuthLayout footer={footer}>
      <h1 className="text-[28px] font-bold text-[#1E2027] mb-8">Регистрация в системе</h1>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
        <FloatingInput
          id="email"
          label="Введите e-mail"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={fieldErrors.email ?? emailServerError}
          disabled={loading || success}
        />

        <FloatingPasswordInput
          id="password"
          label="Введите пароль"
          autoComplete="new-password"
          value={fields.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={fieldErrors.password ?? globalError}
          disabled={loading || success}
        />

        <FloatingPasswordInput
          id="confirmPassword"
          label="Повторите пароль"
          autoComplete="new-password"
          value={fields.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={fieldErrors.confirmPassword}
          disabled={loading || success}
        />

        <Button type="submit" loading={loading} disabled={success} className="mt-6">
          {success ? 'Перенаправляем…' : 'Зарегистрироваться'}
        </Button>

        <p className="text-center text-xs text-[#9CA3AF] mt-3">
          Зарегистрировавшись пользователь принимает условия{' '}
          <span className="underline cursor-pointer">договора оферты</span> и{' '}
          <span className="underline cursor-pointer">политики конфиденциальности</span>
        </p>
      </form>
    </AuthLayout>
  )
}
