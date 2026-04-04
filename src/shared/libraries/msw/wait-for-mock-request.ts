import { matchRequestUrl } from 'msw'
import type { SetupServer } from 'msw/node'

export const waitForRequest = (server: SetupServer, method: string, url: string) => {
  let localRequestId = ''
  return new Promise((resolve, reject) => {
    server.events.on('request:start', ({ request, requestId }) => {
      const matchesMethod = request.method.toLowerCase() === method.toLowerCase()
      const matchesUrl = matchRequestUrl(new URL(request.url), url).matches
      if (matchesMethod && matchesUrl) {
        localRequestId = requestId
      }
    })
    server.events.on('request:match', ({ request, requestId }) => {
      if (requestId === localRequestId) {
        resolve(request)
      }
    })
    server.events.on('request:unhandled', ({ request, requestId }) => {
      if (requestId === localRequestId) {
        reject(new Error(`The ${request.method} ${request.url} request was unhandled.`))
      }
    })
  })
}
