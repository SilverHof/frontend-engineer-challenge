import { reatomRoute } from '@reatom/core'

export const authRootRoute = reatomRoute('auth', 'auth')

export const authLoginRoute = authRootRoute.reatomRoute('login', 'auth-login')
export const authRegisterRoute = authRootRoute.reatomRoute('register', 'auth-register')
export const authResetPasswordRoute = authRootRoute.reatomRoute('reset-password', 'auth-reset-password')
export const authNewPasswordRoute = authRootRoute.reatomRoute('new-password', 'auth-new-password')
