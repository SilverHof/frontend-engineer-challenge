import { FormEvent } from 'react'
import { effect } from '@reatom/core'
import { reatomComponent, bindField } from '@reatom/react'

import { Button, Input } from '@heroui/react'

import { authRegisterForm } from '../../model/auth-register.form'

export interface AuthRegisterFormProps {
  onSuccess?: () => void
}

export const AuthRegisterForm = reatomComponent<AuthRegisterFormProps>((props) => {
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    authRegisterForm.submit()
  }

  effect(() => {
    if (authRegisterForm.submit.status().isFulfilled) {
      props.onSuccess?.()
    }
  })

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      <Input
        type='email'
        label='Введите e-mail'
        isDisabled={!authRegisterForm.submit.ready()}
        {...bindField(authRegisterForm.fields.email)}
      />

      <Input
        type='password'
        label='Введите пароль'
        isDisabled={!authRegisterForm.submit.ready()}
        {...bindField(authRegisterForm.fields.password)}
      />

      <Input
        type='password'
        label='Повторите пароль'
        autoComplete='new-password'
        isDisabled={!authRegisterForm.submit.ready()}
        {...bindField(authRegisterForm.fields.confirmPassword)}
      />

      <Button
        type='submit'
        isDisabled={!authRegisterForm.submit.ready()}
        isLoading={!authRegisterForm.submit.ready()}
        className='mt-6'
      >
        {authRegisterForm.submit.status().isFulfilled ? 'Перенаправляем…' : 'Зарегистрироваться'}
      </Button>

      <p className='mt-3 text-center text-xs text-[#9CA3AF]'>
        Зарегистрировавшись пользователь принимает условия{' '}
        <span className='cursor-pointer underline'>договора оферты</span> и{' '}
        <span className='cursor-pointer underline'>политики конфиденциальности</span>
      </p>
    </form>
  )
}, 'AuthRegisterForm')
