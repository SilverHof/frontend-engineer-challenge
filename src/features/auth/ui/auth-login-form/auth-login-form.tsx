import { FormEvent } from 'react'
import { effect } from '@reatom/core'
import { reatomComponent, bindField } from '@reatom/react'

import { Button, Input } from '@heroui/react'

import { authLoginForm } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

export interface AuthLoginFormProps {
  onSuccess?: () => void
}

export const AuthLoginForm = reatomComponent<AuthLoginFormProps>(({ onSuccess }) => {
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    authLoginForm.submit()
  }

  effect(() => {
    if (authRequests.login.status().isFulfilled) {
      onSuccess?.()
    }
  })

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      <Input
        label='Введите e-mail'
        variant='underlined'
        isDisabled={!authLoginForm.submit.ready()}
        {...bindField(authLoginForm.fields.email)}
      />
      <Input
        label='Введите пароль'
        variant='underlined'
        type='password'
        isDisabled={!authLoginForm.submit.ready()}
        {...bindField(authLoginForm.fields.password)}
      />
      <Button
        type='submit'
        variant='solid'
        color='primary'
        className='mt-6'
        isDisabled={!authLoginForm.submit.ready()}
        isLoading={!authLoginForm.submit.ready()}
      >
        Войти
      </Button>
      <div className='mt-3 text-center'>
        <a href={ROUTES.AUTH.RESET_PASSWORD.path()} className='text-sm text-[#31A0F0] hover:underline'>
          Забыли пароль?
        </a>
      </div>
    </form>
  )
}, 'AuthLoginForm')
