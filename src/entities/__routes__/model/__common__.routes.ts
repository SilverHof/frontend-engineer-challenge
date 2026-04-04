import { reatomRoute } from '@reatom/core'

export const indexRoute = reatomRoute({
  path: '',
})

export const notFoundRoute = reatomRoute('not-found', 'not-found')
export const errorRoute = reatomRoute('error', 'error')
