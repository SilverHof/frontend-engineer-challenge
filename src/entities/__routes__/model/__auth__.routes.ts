import { reatomRoute } from '@reatom/core'

export const authRootRoute = reatomRoute('auth', 'auth')

export const authLoginRoute = authRootRoute.reatomRoute('login', 'auth-login')
export const authRegisterRoute = authRootRoute.reatomRoute('register', 'auth-register')
export const authResetPasswordRoute = authRootRoute.reatomRoute('reset-password', 'auth-reset-password')
export const authNewPasswordRoute = authRootRoute.reatomRoute('new-password', 'auth-new-password')

export const authRecoveryRoute = authRootRoute.reatomRoute('recovery', 'auth-recovery')
export const authRecoveryNewPasswordRoute = authRecoveryRoute.reatomRoute('new-password', 'auth-recovery-new-password')
export const authRecoveryCheckEmailRoute = authRecoveryRoute.reatomRoute('check-email', 'auth-recovery-check-email')
export const authRecoverySuccessRoute = authRecoveryRoute.reatomRoute('success', 'auth-recovery-success')
export const authRecoveryErrorRoute = authRecoveryRoute.reatomRoute('error', 'auth-recovery-error')
