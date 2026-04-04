import { reatomComponent } from '@reatom/react'

import { AuthLayout } from '@/widgets/auth-layout'

import { AuthRegisterForm } from '@/features/auth/ui/auth-register-form'

import { ROUTES } from '@/entities/__routes__'

import { authRegisterPageVariants } from './auth-register-page.variants'

export const AuthRegisterPage = reatomComponent(() => {
  const styles = authRegisterPageVariants()
  return (
    <AuthLayout
      footer={
        <>
          Уже есть аккаунт?{' '}
          <a href={ROUTES.AUTH.LOGIN.path()} className={styles.footerLink()}>
            Войти
          </a>
        </>
      }
    >
      <h1 className={styles.title()}>Регистрация в системе</h1>
      <AuthRegisterForm onSuccess={() => ROUTES.AUTH.LOGIN.go()} />
    </AuthLayout>
  )
}, 'AuthRegisterPage')
