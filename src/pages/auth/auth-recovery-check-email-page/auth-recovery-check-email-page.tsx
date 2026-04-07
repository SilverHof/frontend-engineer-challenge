import { reatomComponent } from '@reatom/react'

import { RecoveryLayout } from '@/widgets/recovery-layout'

import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'

import { authRecoveryCheckEmailPageVariants } from './auth-recovery-check-email-page.variants'

export const AuthRecoveryCheckEmailPage = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = authRecoveryCheckEmailPageVariants()
  return (
    <RecoveryLayout>
      <div className={styles.root()}>
        <h1 className={styles.title()}>{i18n.t('auth.recovery.title')}</h1>
        <p className={styles.description()}>{i18n.t('auth.recovery.description')}</p>
        <a href={ROUTES.AUTH.LOGIN.path()} className={styles.link()}>
          {i18n.t('auth.recovery.to_login')}
        </a>
      </div>
    </RecoveryLayout>
  )
}, 'AuthRecoveryCheckEmailPage')
