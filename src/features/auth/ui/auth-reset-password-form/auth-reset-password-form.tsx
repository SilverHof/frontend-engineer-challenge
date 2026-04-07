import { SubmitEvent } from 'react'
import { atom } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button, Input } from '@heroui/react'

import { useTranslate } from '@/shared/libraries/i18n'
import { bindFieldController } from '@/shared/libraries/reatom'

import { authResetPasswordForm } from '../../model/auth-reset-password.form'
import { authResetPasswordFormVariants } from './auth-reset-password-form.variants'

const isVisiblePasswordAtom = atom({
  password: false,
  confirmPassword: false,
})

export const AuthResetPasswordForm = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = authResetPasswordFormVariants()

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    authResetPasswordForm.submit()
  }

  const toggleVisiblePassword = () => {
    isVisiblePasswordAtom.set({ ...isVisiblePasswordAtom(), password: !isVisiblePasswordAtom().password })
  }

  const toggleVisibleConfirmPassword = () => {
    isVisiblePasswordAtom.set({ ...isVisiblePasswordAtom(), confirmPassword: !isVisiblePasswordAtom().confirmPassword })
  }

  const PasswordIcon = isVisiblePasswordAtom().password ? EyeOffIcon : EyeIcon
  const ConfirmPasswordIcon = isVisiblePasswordAtom().confirmPassword ? EyeOffIcon : EyeIcon

  return (
    <div className={styles.root()}>
      <div className={styles.header()}>
        <h1 className={styles.title()}>{i18n.t('auth.new_password.form_title')}</h1>
        <p className={styles.description()}>{i18n.t('auth.new_password.form_description')}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className={styles.form()}>
        <Input
          type={isVisiblePasswordAtom().password ? 'text' : 'password'}
          endContent={<PasswordIcon className='cursor-pointer' onClick={toggleVisiblePassword} />}
          label={i18n.t('auth.new_password.password_label')}
          variant='underlined'
          color='primary'
          autoComplete='new-password'
          isDisabled={!authResetPasswordForm.submit.ready()}
          {...bindFieldController(authResetPasswordForm.fields.password)}
        />

        <Input
          type={isVisiblePasswordAtom().confirmPassword ? 'text' : 'password'}
          endContent={<ConfirmPasswordIcon className='cursor-pointer' onClick={toggleVisibleConfirmPassword} />}
          label={i18n.t('auth.new_password.confirm_password_label')}
          variant='underlined'
          color='primary'
          autoComplete='new-password'
          isDisabled={!authResetPasswordForm.submit.ready()}
          {...bindFieldController(authResetPasswordForm.fields.confirmPassword)}
        />

        <Button
          type='submit'
          variant='solid'
          color='primary'
          isLoading={!authResetPasswordForm.submit.ready()}
          className={styles.submitButton()}
        >
          {i18n.t('auth.new_password.submit')}
        </Button>
      </form>
    </div>
  )
}, 'AuthResetPasswordForm')
