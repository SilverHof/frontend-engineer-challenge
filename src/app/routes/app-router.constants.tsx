import {
  AuthIndexPage,
  AuthLoginPage,
  AuthNewPasswordPage,
  AuthRegisterPage,
  AuthResetPasswordPage,
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
    route: ROUTES.AUTH.RESET_PASSWORD,
    element: <AuthResetPasswordPage />,
  },
  {
    route: ROUTES.AUTH.NEW_PASSWORD,
    element: <AuthNewPasswordPage />,
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
