import { reatomComponent } from '@reatom/react'

import { Button } from '@heroui/react'

import { RecoveryLayout } from '@/widgets/recovery-layout'

import { AuthRequestPasswordResetForm } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'
import { authRequests } from '@/entities/auth'

import { authResetPasswordPageVariants } from './auth-reset-password-page.variants'

export const AuthResetPasswordPage = reatomComponent(() => {
  const styles = authResetPasswordPageVariants()

  if (authRequests.requestPasswordReset.status().isFulfilled) {
    return (
      <RecoveryLayout>
        <div className={styles.successRoot()}>
          <div>
            <h1 className={styles.successTitle()}>Проверьте свою почту</h1>
            <p className={styles.successDescription()}>
              Мы отправили на почту письмо с ссылкой для восстановления пароля
            </p>
          </div>
          <Button
            variant='bordered'
            color='primary'
            onPress={() => ROUTES.AUTH.LOGIN.go()}
            className={styles.successButton()}
          >
            Назад в авторизацию
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
