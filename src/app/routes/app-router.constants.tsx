import {
  AuthIndexPage,
  AuthLoginPage,
  AuthRecoveryCheckEmailPage,
  AuthRecoveryErrorPage,
  AuthRecoveryNewPasswordPage,
  AuthRecoveryPage,
  AuthRecoverySuccessPage,
  AuthRegisterPage,
} from '@/pages/auth'
import { ErrorPage, IndexPage, NotFoundPage } from '@/pages/common'
import { DashboardPage, RootIndexPage } from '@/pages/root'

import { ROUTES } from '@/entities/__routes__'

import { AppRouterItem } from './app-router.types'

export const APP_ROUTER: AppRouterItem[] = [
  {
    route: ROUTES.COMMON.INDEX,
    element: <IndexPage />,
  },
  {
    route: ROUTES.COMMON.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    route: ROUTES.COMMON.ERROR,
    element: <ErrorPage />,
  },
  {
    route: ROUTES.AUTH.INDEX,
    element: <AuthIndexPage />,
  },
  {
    route: ROUTES.AUTH.LOGIN,
    element: <AuthLoginPage />,
  },
  {
    route: ROUTES.AUTH.REGISTER,
    element: <AuthRegisterPage />,
  },
  {
    route: ROUTES.AUTH.RECOVERY,
    element: <AuthRecoveryPage />,
  },
  {
    route: ROUTES.AUTH.RECOVERY_CHECK_EMAIL,
    element: <AuthRecoveryCheckEmailPage />,
  },
  {
    route: ROUTES.AUTH.RECOVERY_NEW_PASSWORD,
    element: <AuthRecoveryNewPasswordPage />,
  },
  {
    route: ROUTES.AUTH.RECOVERY_SUCCESS,
    element: <AuthRecoverySuccessPage />,
  },
  {
    route: ROUTES.AUTH.RECOVERY_ERROR,
    element: <AuthRecoveryErrorPage />,
  },
  {
    route: ROUTES.ROOT.INDEX,
    element: <RootIndexPage />,
  },
  {
    route: ROUTES.ROOT.DASHBOARD,
    element: <DashboardPage />,
  },
]
