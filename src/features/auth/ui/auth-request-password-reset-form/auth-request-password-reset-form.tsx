import { FormEvent } from 'react'
import { effect } from '@reatom/core'
import { reatomComponent, bindField } from '@reatom/react'

import { Button, Input } from '@heroui/react'

import { authRequests } from '@/entities/auth'

import { authRequestPasswordResetForm } from '../../model/auth-request-password-reset.form'

export interface AuthRequestPasswordResetFormProps {
  onSuccess?: () => void
  onBack?: () => void
}

export const AuthRequestPasswordResetForm = reatomComponent<AuthRequestPasswordResetFormProps>((props) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    authRequestPasswordResetForm.submit()
  }

  effect(() => {
    if (authRequests.requestPasswordReset.status().isFulfilled) {
      props.onSuccess?.()
    }
  })

  return (
    <div className='flex flex-col gap-8'>
      <div>
        {props.onBack && (
          <button
            type='button'
            onClick={props.onBack}
            className='mb-4 flex items-center gap-1.5 text-sm text-[#1E2027] transition-opacity hover:opacity-70'
          >
            <svg width='7' height='12' viewBox='0 0 7 12' fill='none' aria-hidden='true'>
              <path d='M6 1L1 6l5 5' stroke='#1E2027' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
        )}
        <h1 className='mb-2 text-[26px] font-bold text-[#1E2027]'>Восстановление пароля</h1>
        <p className='text-sm text-[#6B7280]'>Укажите адрес почты на который был зарегистрирован аккаунт</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-2'>
        <Input
          label='Введите e-mail'
          type='email'
          autoComplete='email'
          isDisabled={!authRequestPasswordResetForm.submit.ready()}
          {...bindField(authRequestPasswordResetForm.fields.email)}
        />

        <Button type='submit' isLoading={!authRequestPasswordResetForm.submit.ready()} className='mt-6'>
          Восстановить пароль
        </Button>
      </form>
    </div>
  )
}, 'AuthRequestPasswordResetForm')
