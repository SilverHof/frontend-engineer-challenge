import { reatomComponent } from '@reatom/react'

import i18next from 'i18next'

import { AuthLayout } from '@/widgets/auth-layout'

import { AuthLoginForm } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'

import { authLoginPageVariants } from './auth-login-page.variants'

export const AuthLoginPage = reatomComponent(() => {
  const styles = authLoginPageVariants()

  return (
    <AuthLayout
      footer={
        <>
          {i18next.t('auth.login.footer_prefix')}{' '}
          <a href={ROUTES.AUTH.REGISTER.path()} className={styles.footerLink()}>
            {i18next.t('auth.login.footer_register')}
          </a>
        </>
      }
    >
      <h1 className={styles.title()}>{i18next.t('auth.login.page_title')}</h1>
      <AuthLoginForm />
    </AuthLayout>
  )
}, 'AuthLoginPage')
