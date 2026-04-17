import { SubmitEvent } from 'react'
import { action, atom } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button, Input } from '@heroui/react'

import { authLoginForm, authLoginFormError } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'
import { bindFieldController } from '@/shared/libraries/reatom'

import { authLoginFormVariants } from './auth-login-form.variants'

const isVisibleFirstPasswordAtom = atom(false)

export const AuthLoginForm = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = authLoginFormVariants()

  const toggleVisibleFirstPassword = action(() => {
    isVisibleFirstPasswordAtom.set(!isVisibleFirstPasswordAtom())
  })

  const isError = authLoginFormError()
  const isDisabled = !authLoginForm.submit.ready()

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    authLoginForm.submit()
  }

  const PasswordIcon = isVisibleFirstPasswordAtom() ? EyeOffIcon : EyeIcon

  return (
    <form onSubmit={onSubmit} className={styles.root()}>
      <Input
        label={i18n.t('auth.login.email_label')}
        variant='underlined'
        color='primary'
        autoComplete='email'
        isDisabled={isDisabled}
        {...bindFieldController(authLoginForm.fields.email)}
      />
      <Input
        label={i18n.t('auth.login.password_label')}
        variant='underlined'
        color='primary'
        type={isVisibleFirstPasswordAtom() ? 'text' : 'password'}
        endContent={<PasswordIcon className='cursor-pointer' onClick={toggleVisibleFirstPassword} />}
        autoComplete='current-password'
        isDisabled={isDisabled}
        {...bindFieldController(authLoginForm.fields.password)}
      />
      <Button
        type='submit'
        variant='solid'
        color='primary'
        className='mt-6 rounded-[8px] bg-[#31A0F0]'
        isDisabled={isDisabled}
        isLoading={isDisabled}
      >
        {i18n.t('auth.login.submit')}
      </Button>
      {isError && (
        <div className={styles.errorMessage()}>
          <p className={styles.errorMessageText()}>{i18n.t('errors.default')}</p>
        </div>
      )}
      <div className={styles.forgotPassword()}>
        <a href={ROUTES.AUTH.RECOVERY.path()} className={styles.forgotPasswordLink()}>
          {i18n.t('auth.login.forgot_password')}
        </a>
      </div>
    </form>
  )
}, 'AuthLoginForm')
