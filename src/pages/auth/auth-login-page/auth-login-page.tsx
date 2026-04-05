import { reatomComponent } from '@reatom/react'

import { AuthLayout } from '@/widgets/auth-layout'

import { AuthLoginForm } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'

import { authLoginPageVariants } from './auth-login-page.variants'

export const AuthLoginPage = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = authLoginPageVariants()
  return (
    <AuthLayout
      footer={
        <>
          {i18n.t('auth.login.footer_prefix')}{' '}
          <a href={ROUTES.AUTH.REGISTER.path()} className={styles.footerLink()}>
            {i18n.t('auth.login.footer_register')}
          </a>
        </>
      }
    >
      <h1 className={styles.title()}>{i18n.t('auth.login.page_title')}</h1>
      <AuthLoginForm />
    </AuthLayout>
  )
}, 'AuthLoginPage')
