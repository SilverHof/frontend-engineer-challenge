import { ENV_VARIABLES } from '@/shared/config'

export const withMsw = async (): Promise<void> => {
  if (!ENV_VARIABLES.VITE_API_MOCKING) {
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
