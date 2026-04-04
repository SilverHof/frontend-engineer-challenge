import { searchParamsAtom } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { RecoveryLayout } from '@/widgets/recovery-layout'

import { AuthResetPasswordForm } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { Button } from '@/shared/ui/button'

import { authNewPasswordPageVariants } from './auth-new-password-page.variants'

export const AuthNewPasswordPage = reatomComponent(() => {
  const params = searchParamsAtom()
  const token = params['token'] ?? ''

  const styles = authNewPasswordPageVariants()

  if (authRequests.resetPassword.status().isFulfilled) {
    return (
      <RecoveryLayout>
        <div className={styles.feedbackRoot()}>
          <div>
            <h1 className={styles.feedbackTitle()}>Пароль был восстановлен</h1>
            <p className={styles.feedbackDescription()}>
              Перейдите на страницу авторизации, чтобы войти в систему с новым паролем
            </p>
          </div>
          <Button variant='secondary' onClick={() => ROUTES.AUTH.LOGIN.go()} className={styles.feedbackButton()}>
            Назад в авторизацию
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
            <h1 className={styles.feedbackTitle()}>Пароль не был восстановлен</h1>
            <p className={styles.feedbackDescription()}>
              По каким-то причинам мы не смогли изменить ваш пароль. Попробуйте ещё раз через некоторое время.
            </p>
          </div>
          <Button variant='secondary' onClick={() => ROUTES.AUTH.LOGIN.go()} className={styles.feedbackButton()}>
            Назад в авторизацию
          </Button>
          <a href={ROUTES.AUTH.RESET_PASSWORD.path()} className={styles.retryLink()}>
            Попробовать заново
          </a>
        </div>
      </RecoveryLayout>
    )
  }

  return (
    <RecoveryLayout>
      <AuthResetPasswordForm token={token} />
    </RecoveryLayout>
  )
}, 'AuthNewPasswordPage')
