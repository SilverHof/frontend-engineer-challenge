import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/pages/AuthLayout'
import { FloatingInput } from '@/shared/ui/FloatingInput'
import { FloatingPasswordInput } from '@/shared/ui/FloatingPasswordInput'
import { Button } from '@/shared/ui/Button'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { loginSchema, type LoginFormData } from '@/shared/lib/validation'

type FieldErrors = Partial<Record<keyof LoginFormData, string>>

export const AuthLoginPage = () => {
  const navigate = useNavigate()
  const { login, loading, error } = useLogin()
  const [fields, setFields] = useState<LoginFormData>({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  function handleChange(key: keyof LoginFormData, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (fieldErrors[key]) setFieldErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const result = loginSchema.safeParse(fields)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LoginFormData
        if (!errors[key]) errors[key] = issue.message
      }
      setFieldErrors(errors)
      return
    }
    const ok = await login(result.data)
    if (ok) navigate('/dashboard')
  }

  const serverError = error ?? null

  const footer = (
    <>
      Еще не зарегистрированы?{' '}
      <Link to="/register" className="text-[#31A0F0] hover:underline font-medium">
        Регистрация
      </Link>
    </>
  )

  return (
    <AuthLayout footer={footer}>
      <h1 className="text-[28px] font-bold text-[#1E2027] mb-8">Войти в систему</h1>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
        <FloatingInput
          id="email"
          label="Введите e-mail"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={fieldErrors.email ?? (serverError ? ' ' : undefined)}
          disabled={loading}
        />

        <FloatingPasswordInput
          id="password"
          label="Введите пароль"
          autoComplete="current-password"
          value={fields.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={fieldErrors.password ?? serverError ?? undefined}
          disabled={loading}
        />

        <Button type="submit" loading={loading} className="mt-6">
          Войти
        </Button>

        <div className="text-center mt-3">
          <Link to="/reset-password" className="text-sm text-[#31A0F0] hover:underline">
            Забыли пароль?
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
