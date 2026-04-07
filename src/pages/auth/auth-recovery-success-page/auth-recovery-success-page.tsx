import { reatomComponent } from '@reatom/react'

import { RecoveryLayout } from '@/widgets/recovery-layout'

import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'

import { authRecoverySuccessPageVariants } from './auth-recovery-success-page.variants'

export const AuthRecoverySuccessPage = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = authRecoverySuccessPageVariants()
  return (
    <RecoveryLayout>
      <div className={styles.root()}>
        <h1 className={styles.title()}>{i18n.t('auth.recovery_success.title')}</h1>
        <p className={styles.description()}>{i18n.t('auth.recovery_success.description')}</p>
        <a href={ROUTES.AUTH.LOGIN.path()} className={styles.link()}>
          {i18n.t('auth.recovery_success.to_login')}
        </a>
      </div>
    </RecoveryLayout>
  )
}, 'AuthRecoverySuccessPage')
