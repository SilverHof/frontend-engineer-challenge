import { SubmitEvent } from 'react'
import { reatomComponent } from '@reatom/react'

import { Button, Input } from '@heroui/react'

import { useTranslate } from '@/shared/libraries/i18n'
import { bindFieldController } from '@/shared/libraries/reatom'

import { authResetPasswordForm } from '../../model/auth-reset-password.form'

export const AuthResetPasswordForm = reatomComponent(() => {
  const i18n = useTranslate()

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    authResetPasswordForm.submit()
  }

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h1 className='mb-2 text-[26px] font-bold text-[#1E2027]'>{i18n.t('auth.new_password.form_title')}</h1>
        <p className='text-sm text-[#6B7280]'>{i18n.t('auth.new_password.form_description')}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className='flex flex-col gap-2'>
        <Input
          type='password'
          label={i18n.t('auth.new_password.password_label')}
          color='primary'
          isDisabled={!authResetPasswordForm.submit.ready()}
          {...bindFieldController(authResetPasswordForm.fields.password)}
        />

        <Input
          type='password'
          label={i18n.t('auth.new_password.confirm_password_label')}
          color='primary'
          isDisabled={!authResetPasswordForm.submit.ready()}
          {...bindFieldController(authResetPasswordForm.fields.confirmPassword)}
        />

        <Button type='submit' isLoading={!authResetPasswordForm.submit.ready()} className='mt-6'>
          {i18n.t('auth.new_password.submit')}
        </Button>
      </form>
    </div>
  )
}, 'AuthResetPasswordForm')
