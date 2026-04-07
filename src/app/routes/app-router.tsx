import { effect, urlAtom } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { NotFoundPage } from '@/pages/common'

import { ROUTES } from '@/entities/__routes__'

import { accessTokenAtom } from '@/shared/__api__/api-client/api-client.tokens'
import { ENV_VARIABLES } from '@/shared/config'

import { APP_ROUTER } from './app-router.constants'

const isProtectedRootZone = (pathname: string) => pathname === '/root' || pathname.startsWith('/root/')

const shouldSendAuthedUserToDashboard = (pathname: string) =>
  pathname === '/' || pathname === '/root' || pathname === '/auth' || pathname === '/auth/login'

const shouldSendGuestToLogin = (pathname: string) => isProtectedRootZone(pathname) || pathname === '/'

export const AppRouter = reatomComponent(() => {
  const url = urlAtom()

  let matchedRouteIndex = -1
  for (let index = 0; index < APP_ROUTER.length; index++) {
    if (APP_ROUTER[index].route.exact()) {
      matchedRouteIndex = index
      break
    }
  }

  effect(() => {
    const pathname = urlAtom().pathname || '/'

    let index = -1
    for (let i = 0; i < APP_ROUTER.length; i++) {
      if (APP_ROUTER[i].route.exact()) {
        index = i
        break
      }
    }
    if (index < 0) return

    const isAuthenticated = Boolean(accessTokenAtom())

    if (isAuthenticated && shouldSendAuthedUserToDashboard(pathname)) {
      ROUTES.ROOT.DASHBOARD.go()
    }

    if (!isAuthenticated && shouldSendGuestToLogin(pathname)) {
      ROUTES.AUTH.LOGIN.go()
    }
  })

  if (matchedRouteIndex >= 0 && matchedRouteIndex < APP_ROUTER.length) {
    const currentRouteElement = APP_ROUTER[matchedRouteIndex].element

    return currentRouteElement
  }

  if (ENV_VARIABLES.VITE_ENVIRONMENT === 'development') {
    return (
      <div style={{ padding: 24 }}>
        <h2>Route not found</h2>
        <div>
          Current path: <code>{url.pathname}</code>
        </div>
      </div>
    )
  }

  return <NotFoundPage />
}, 'AppRouter')
