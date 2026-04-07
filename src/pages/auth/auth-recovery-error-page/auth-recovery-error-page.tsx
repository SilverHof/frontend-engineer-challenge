import { reatomComponent } from '@reatom/react'

import { RecoveryLayout } from '@/widgets'

import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'

import { authRecoveryErrorPageVariants } from './auth-recovery-error-page.variants'

export const AuthRecoveryErrorPage = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = authRecoveryErrorPageVariants()
  return (
    <RecoveryLayout>
      <div className={styles.root()}>
        <h1 className={styles.title()}>{i18n.t('auth.recovery_error.title')}</h1>
        <p className={styles.description()}>{i18n.t('auth.recovery_error.description')}</p>
        <a href={ROUTES.AUTH.LOGIN.path()} className={styles.link()}>
          {i18n.t('auth.recovery_error.to_login')}
        </a>
        <a href={ROUTES.AUTH.RESET_PASSWORD.path()} className={styles.linkGhost()}>
          {i18n.t('auth.recovery_error.to_reset_password')}
        </a>
      </div>
    </RecoveryLayout>
  )
}, 'AuthRecoveryErrorPage')
