import { FormEvent } from 'react'
import { effect } from '@reatom/core'
import { reatomComponent, bindField } from '@reatom/react'

import { Button, Input } from '@heroui/react'

import { authRequests } from '@/entities/auth'

import { authResetPasswordForm } from '../../model/auth-reset-password.form'

export interface AuthResetPasswordFormProps {
  token: string
  onSuccess?: () => void
}

export const AuthResetPasswordForm = reatomComponent<AuthResetPasswordFormProps>((props) => {
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    authResetPasswordForm.submit()
  }

  effect(() => {
    if (authRequests.resetPassword.status().isFulfilled) {
      props.onSuccess?.()
    }
  })

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h1 className='mb-2 text-[26px] font-bold text-[#1E2027]'>Задайте пароль</h1>
        <p className='text-sm text-[#6B7280]'>Напишите новый пароль, который будете использовать для входа</p>
      </div>

      <form onSubmit={onSubmit} noValidate className='flex flex-col gap-2'>
        <Input
          type='password'
          label='Введите пароль'
          autoComplete='new-password'
          isDisabled={!authResetPasswordForm.submit.ready()}
          {...bindField(authResetPasswordForm.fields.password)}
        />

        <Input
          type='password'
          label='Повторите пароль'
          autoComplete='new-password'
          isDisabled={!authResetPasswordForm.submit.ready()}
          {...bindField(authResetPasswordForm.fields.confirmPassword)}
        />

        <Button type='submit' isLoading={!authResetPasswordForm.submit.ready()} className='mt-6'>
          Изменить пароль
        </Button>
      </form>
    </div>
  )
}, 'AuthResetPasswordForm')
