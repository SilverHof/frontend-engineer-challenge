import {
  authLoginRoute,
  authNewPasswordRoute,
  authRecoveryCheckEmailRoute,
  authRecoveryErrorRoute,
  authRecoveryNewPasswordRoute,
  authRecoveryRoute,
  authRecoverySuccessRoute,
  authRegisterRoute,
  authResetPasswordRoute,
  authRootRoute,
} from './__auth__.routes'
import { errorRoute, indexRoute, notFoundRoute } from './__common__.routes'
import { rootRoute } from './__root__.routes'
import { dashboardRootRoute } from './dashboard.routes'

/**
 * URL-модель приложения (без привязки к UI).
 * Держим отдельно от рендера, чтобы переиспользовать в сторах/сайд-эффектах.
 */

export const ROUTES = {
  COMMON: {
    INDEX: indexRoute,
    NOT_FOUND: notFoundRoute,
    ERROR: errorRoute,
  },
  AUTH: {
    INDEX: authRootRoute,
    LOGIN: authLoginRoute,
    REGISTER: authRegisterRoute,
    RESET_PASSWORD: authResetPasswordRoute,
    NEW_PASSWORD: authNewPasswordRoute,
    RECOVERY: authRecoveryRoute,
    RECOVERY_NEW_PASSWORD: authRecoveryNewPasswordRoute,
    RECOVERY_CHECK_EMAIL: authRecoveryCheckEmailRoute,
    RECOVERY_SUCCESS: authRecoverySuccessRoute,
    RECOVERY_ERROR: authRecoveryErrorRoute,
  },
  ROOT: {
    INDEX: rootRoute,
    DASHBOARD: dashboardRootRoute,
  },
} as const
