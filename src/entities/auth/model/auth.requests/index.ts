import { authLoginRequest } from './auth-login.request'
import { authRefreshRequest } from './auth-refresh.request'
import { authRegisterRequest } from './auth-register.request'
import { authRequestPasswordResetRequest } from './auth-request-password-reset.request'
import { authResetPasswordRequest } from './auth-reset-password.request'

export const authRequests = {
  login: authLoginRequest,
  register: authRegisterRequest,
  refresh: authRefreshRequest,
  requestPasswordReset: authRequestPasswordResetRequest,
  resetPassword: authResetPasswordRequest,
} as const
