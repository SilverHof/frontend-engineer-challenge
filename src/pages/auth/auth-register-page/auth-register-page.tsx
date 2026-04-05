import { reatomComponent } from '@reatom/react'

import { AuthLayout } from '@/widgets/auth-layout'

import { AuthRegisterForm } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'

import { authRegisterPageVariants } from './auth-register-page.variants'

export const AuthRegisterPage = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = authRegisterPageVariants()

  return (
    <AuthLayout
      footer={
        <>
          {i18n.t('auth.register.footer_prefix')}{' '}
          <a href={ROUTES.AUTH.LOGIN.path()} className={styles.footerLink()}>
            {i18n.t('auth.register.footer_login')}
          </a>
        </>
      }
    >
      <h1 className={styles.title()}>{i18n.t('auth.register.page_title')}</h1>
      <AuthRegisterForm />
    </AuthLayout>
  )
}, 'AuthRegisterPage')
