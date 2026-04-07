import { effect, urlAtom } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { NotFoundPage } from '@/pages/common'

import { ROUTES } from '@/entities/__routes__'

import { accessTokenAtom } from '@/shared/__api__/api-client/api-client.tokens'
import { ENV_VARIABLES } from '@/shared/config'

import { APP_ROUTER } from './app-router.constants'

export const AppRouter = reatomComponent(() => {
  const url = urlAtom()

  let matchedRouteIndex = -1
  for (let index = 0; index < APP_ROUTER.length; index++) {
    if (APP_ROUTER[index].route.exact()) {
      matchedRouteIndex = index
      break
    }
  }

  const isProtectedRootZone = (pathname: string) => {
    return pathname === '/root' || pathname.startsWith('/root/')
  }

  const shouldRedirectToRoot = (pathname: string) => {
    return pathname === '/' || pathname === '/root' || pathname === '/auth' || pathname === '/auth/login'
  }

  const shouldRedirectToAuth = (pathname: string) => {
    return isProtectedRootZone(pathname) || pathname === '/'
  }

  effect(() => {
    const pathname = urlAtom().pathname || '/'
    const isAuthenticated = Boolean(accessTokenAtom())

    if (isAuthenticated && shouldRedirectToRoot(pathname)) {
      ROUTES.ROOT.DASHBOARD.go()
    }

    if (!isAuthenticated && shouldRedirectToAuth(pathname)) {
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
