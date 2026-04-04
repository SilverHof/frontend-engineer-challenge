import { reatomComponent } from '@reatom/react'

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
          Еще не зарегистрированы?{' '}
          <a href={ROUTES.AUTH.REGISTER.path()} className={styles.footerLink()}>
            Регистрация
          </a>
        </>
      }
    >
      <h1 className={styles.title()}>Войти в систему</h1>
      <AuthLoginForm onSuccess={() => ROUTES.ROOT.DASHBOARD.go()} />
    </AuthLayout>
  )
}, 'AuthLoginPage')
