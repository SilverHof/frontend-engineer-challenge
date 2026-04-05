import { reatomComponent } from '@reatom/react'

import { RecoveryLayout } from '@/widgets/recovery-layout'

import { AuthResetPasswordForm } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { useTranslate } from '@/shared/libraries/i18n'
import { Button } from '@/shared/ui'

import { authNewPasswordPageVariants } from './auth-new-password-page.variants'

export const AuthNewPasswordPage = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = authNewPasswordPageVariants()

  if (authRequests.resetPassword.status().isFulfilled) {
    return (
      <RecoveryLayout>
        <div className={styles.feedbackRoot()}>
          <div>
            <h1 className={styles.feedbackTitle()}>{i18n.t('auth.new_password.success_title')}</h1>
            <p className={styles.feedbackDescription()}>{i18n.t('auth.new_password.success_description')}</p>
          </div>
          <Button variant='secondary' onClick={() => ROUTES.AUTH.LOGIN.go()} className={styles.feedbackButton()}>
            {i18n.t('auth.new_password.back_to_auth')}
          </Button>
        </div>
      </RecoveryLayout>
    )
  }

  if (authRequests.resetPassword.status().isRejected) {
    return (
      <RecoveryLayout>
        <div className={styles.feedbackRoot()}>
          <div>
            <h1 className={styles.feedbackTitle()}>{i18n.t('auth.new_password.error_title')}</h1>
            <p className={styles.feedbackDescription()}>{i18n.t('auth.new_password.error_description')}</p>
          </div>
          <Button variant='secondary' onClick={() => ROUTES.AUTH.LOGIN.go()} className={styles.feedbackButton()}>
            {i18n.t('auth.new_password.back_to_auth')}
          </Button>
          <a href={ROUTES.AUTH.RESET_PASSWORD.path()} className={styles.retryLink()}>
            {i18n.t('auth.new_password.retry')}
          </a>
        </div>
      </RecoveryLayout>
    )
  }

  return (
    <RecoveryLayout>
      <AuthResetPasswordForm />
    </RecoveryLayout>
  )
}, 'AuthNewPasswordPage')
