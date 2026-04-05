import { SubmitEvent } from 'react'
import { reatomComponent } from '@reatom/react'

import { Button, Input } from '@heroui/react'

import { useTranslate } from '@/shared/libraries/i18n'
import { bindFieldController } from '@/shared/libraries/reatom'

import { authRequestPasswordResetForm } from '../../model/auth-request-password-reset.form'

export interface AuthRequestPasswordResetFormProps {
  onBack?: () => void
}

export const AuthRequestPasswordResetForm = reatomComponent<AuthRequestPasswordResetFormProps>((props) => {
  const i18n = useTranslate()

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    authRequestPasswordResetForm.submit()
  }

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
        <h1 className='mb-2 text-[26px] font-bold text-[#1E2027]'>{i18n.t('auth.reset_password.title')}</h1>
        <p className='text-sm text-[#6B7280]'>{i18n.t('auth.reset_password.description')}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className='flex flex-col gap-2'>
        <Input
          label={i18n.t('auth.reset_password.email_label')}
          type='email'
          autoComplete='email'
          color='primary'
          isDisabled={!authRequestPasswordResetForm.submit.ready()}
          {...bindFieldController(authRequestPasswordResetForm.fields.email)}
        />

        <Button type='submit' isLoading={!authRequestPasswordResetForm.submit.ready()} className='mt-6'>
          {i18n.t('auth.reset_password.submit')}
        </Button>
      </form>
    </div>
  )
}, 'AuthRequestPasswordResetForm')
