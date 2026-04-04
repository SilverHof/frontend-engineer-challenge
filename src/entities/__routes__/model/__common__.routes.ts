import { reatomRoute } from '@reatom/core'

export const indexRoute = reatomRoute({
  path: '',
})

export const notFoundRoute = indexRoute.reatomRoute('not-found', 'not-found')
export const errorRoute = indexRoute.reatomRoute('error', 'error')
