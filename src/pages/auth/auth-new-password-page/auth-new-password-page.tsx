import { useState } from 'react'

import { newPasswordSchema, type NewPasswordFormData } from '@/shared/lib/validation'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { RecoveryLayout } from '@/pages/RecoveryLayout'

import { useNewPassword } from '@/features/auth/hooks/useNewPassword'

import { Button } from '@/shared/ui/Button'
import { FloatingPasswordInput } from '@/shared/ui/FloatingPasswordInput'

type FieldErrors = Partial<Record<keyof NewPasswordFormData, string>>

export const AuthNewPasswordPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { resetPassword, loading, error, success } = useNewPassword()
  const [fields, setFields] = useState<NewPasswordFormData>({ password: '', confirmPassword: '' })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  function handleChange(key: keyof NewPasswordFormData, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (fieldErrors[key]) setFieldErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const result = newPasswordSchema.safeParse(fields)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof NewPasswordFormData
        if (!errors[key]) errors[key] = issue.message
      }
      setFieldErrors(errors)
      return
    }
    await resetPassword({
      email: searchParams.get('email') ?? '',
      token: searchParams.get('token') ?? '',
      newPassword: result.data.password,
    })
  }

  if (success) {
    return (
      <RecoveryLayout>
        <div className='flex flex-col items-center gap-6 text-center'>
          <div>
            <h1 className='mb-3 text-[26px] font-bold text-[#1E2027]'>Пароль был восстановлен</h1>
            <p className='text-sm leading-relaxed text-[#6B7280]'>
              Перейдите на страницу авторизации, чтобы войти в систему с новым паролем
            </p>
          </div>
          <Button variant='secondary' onClick={() => navigate('/login')} className='max-w-xs'>
            Назад в авторизацию
          </Button>
        </div>
      </RecoveryLayout>
    )
  }

  if (error) {
    return (
      <RecoveryLayout>
        <div className='flex flex-col items-center gap-6 text-center'>
          <div>
            <h1 className='mb-3 text-[26px] font-bold text-[#1E2027]'>Пароль не был восстановлен</h1>
            <p className='text-sm leading-relaxed text-[#6B7280]'>
              По каким-то причинам мы не смогли изменить ваш пароль. Попробуйте ещё раз через некоторое время.
            </p>
          </div>
          <Button variant='secondary' onClick={() => navigate('/login')} className='max-w-xs'>
            Назад в авторизацию
          </Button>
          <Link to='/reset-password' className='text-sm text-[#31A0F0] hover:underline'>
            Попробовать заново
          </Link>
        </div>
      </RecoveryLayout>
    )
  }

  return (
    <RecoveryLayout>
      <div className='flex flex-col gap-8'>
        <div>
          <h1 className='mb-2 text-[26px] font-bold text-[#1E2027]'>Задайте пароль</h1>
          <p className='text-sm text-[#6B7280]'>Напишите новый пароль, который будете использовать для входа</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-2'>
          <FloatingPasswordInput
            id='password'
            label='Введите пароль'
            autoComplete='new-password'
            value={fields.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={fieldErrors.password}
            disabled={loading}
          />

          <FloatingPasswordInput
            id='confirmPassword'
            label='Повторите пароль'
            autoComplete='new-password'
            value={fields.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            error={fieldErrors.confirmPassword}
            disabled={loading}
          />

          <Button type='submit' loading={loading} className='mt-6'>
            Изменить пароль
          </Button>
        </form>
      </div>
    </RecoveryLayout>
  )
}
