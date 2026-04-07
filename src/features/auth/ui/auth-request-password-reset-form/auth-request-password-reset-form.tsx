import { SubmitEvent } from 'react'
import { reatomComponent } from '@reatom/react'

import { Button, Input } from '@heroui/react'

import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'
import { bindFieldController } from '@/shared/libraries/reatom'

import { authRequestPasswordResetForm } from '../../model/auth-request-password-reset.form'
import { authRequestPasswordResetFormVariants } from './auth-request-password-reset-form.variants'

export const AuthRequestPasswordResetForm = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = authRequestPasswordResetFormVariants()

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    authRequestPasswordResetForm.submit()
  }

  return (
    <div className={styles.root()}>
      <div className={styles.header()}>
        <div className={styles.titleRow()}>
          <Button isIconOnly variant='light' onPress={() => ROUTES.AUTH.LOGIN.go()} className={styles.backButton()}>
            <svg width='7' height='12' viewBox='0 0 7 12' fill='none' aria-hidden='true'>
              <path d='M6 1L1 6l5 5' stroke='#1E2027' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </Button>
          <h1 className={styles.title()}>{i18n.t('auth.reset_password.title')}</h1>
        </div>
        <p className={styles.description()}>{i18n.t('auth.reset_password.description')}</p>
      </div>

      <form onSubmit={onSubmit} className={styles.form()}>
        <Input
          label={i18n.t('auth.reset_password.email_label')}
          variant='underlined'
          type='email'
          autoComplete='email'
          color='primary'
          isDisabled={!authRequestPasswordResetForm.submit.ready()}
          {...bindFieldController(authRequestPasswordResetForm.fields.email)}
        />
        <Button
          type='submit'
          variant='solid'
          color='primary'
          isLoading={!authRequestPasswordResetForm.submit.ready()}
          className={styles.submitButton()}
        >
          {i18n.t('auth.reset_password.submit')}
        </Button>
      </form>
    </div>
  )
}, 'AuthRequestPasswordResetForm')
