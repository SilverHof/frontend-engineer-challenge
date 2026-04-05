import { SubmitEvent } from 'react'
import { reatomComponent } from '@reatom/react'

import { Button, Input } from '@heroui/react'

import { authLoginForm } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'
import { bindFieldController } from '@/shared/libraries/reatom'

export const AuthLoginForm = reatomComponent(() => {
  const i18n = useTranslate()

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    authLoginForm.submit()
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      <Input
        label={i18n.t('auth.login.email_label')}
        variant='underlined'
        color='primary'
        isDisabled={!authLoginForm.submit.ready()}
        {...bindFieldController(authLoginForm.fields.email)}
      />
      <Input
        label={i18n.t('auth.login.password_label')}
        variant='underlined'
        color='primary'
        type='password'
        isDisabled={!authLoginForm.submit.ready()}
        {...bindFieldController(authLoginForm.fields.password)}
      />
      <Button
        type='submit'
        variant='solid'
        color='primary'
        className='mt-6'
        isDisabled={!authLoginForm.submit.ready()}
        isLoading={!authLoginForm.submit.ready()}
      >
        {i18n.t('auth.login.submit')}
      </Button>
      <div className='mt-3 text-center'>
        <a href={ROUTES.AUTH.RESET_PASSWORD.path()} className='text-sm text-[#31A0F0] hover:underline'>
          {i18n.t('auth.login.forgot_password')}
        </a>
      </div>
    </form>
  )
}, 'AuthLoginForm')
