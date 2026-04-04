import { API_MOCKING } from '@/shared/config'

export const withMsw = async (): Promise<void> => {
  console.log('API_MOCKING', API_MOCKING)
  if (!API_MOCKING) {
    return
  }

  const { worker } = await import('@/shared/__api__/custom-mocks/browser')

  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })

  console.log('MSW worker started')
}
