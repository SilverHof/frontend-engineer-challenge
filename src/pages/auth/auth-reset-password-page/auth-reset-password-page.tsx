import { reatomComponent } from '@reatom/react'

import { Button } from '@heroui/react'

import { RecoveryLayout } from '@/widgets/recovery-layout'

import { AuthRequestPasswordResetForm } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { useTranslate } from '@/shared/libraries/i18n'

import { authResetPasswordPageVariants } from './auth-reset-password-page.variants'

export const AuthResetPasswordPage = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = authResetPasswordPageVariants()

  if (authRequests.requestPasswordReset.status().isFulfilled) {
    return (
      <RecoveryLayout>
        <div className={styles.successRoot()}>
          <div>
            <h1 className={styles.successTitle()}>{i18n.t('auth.reset_password.success_title')}</h1>
            <p className={styles.successDescription()}>{i18n.t('auth.reset_password.success_description')}</p>
          </div>
          <Button
            variant='bordered'
            color='primary'
            onPress={() => ROUTES.AUTH.LOGIN.go()}
            className={styles.successButton()}
          >
            {i18n.t('auth.reset_password.back_to_auth')}
          </Button>
        </div>
      </RecoveryLayout>
    )
  }

  return (
    <RecoveryLayout>
      <AuthRequestPasswordResetForm onBack={() => ROUTES.AUTH.LOGIN.go()} />
    </RecoveryLayout>
  )
}, 'AuthResetPasswordPage')
