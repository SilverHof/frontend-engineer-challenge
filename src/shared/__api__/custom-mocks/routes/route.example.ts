import { createHttpMockRoutes } from '@/shared/libraries/msw'

export const EXAMPLE_ENTITY_MOCK = {
  id: '@guid',
  userId: '@guid',
  title: '@word',
  body: '@word',
}

export const EXAMPLE_MOCK_ROUTE = createHttpMockRoutes({
  mockTemplate: EXAMPLE_ENTITY_MOCK,
  routes: [
    {
      method: 'GET',
      path: '/posts',
      type: 'collection',
    },
    { method: 'GET', path: '/posts/:id', type: 'single' },
    { method: 'POST', path: '/posts' },
    { method: 'PUT', path: '/posts' },
    { method: 'PATCH', path: '/posts', errorToEmulate: { status: 'BAD_REQUEST', errorType: 'HYDRA_ERROR' } },
    { method: 'DELETE', path: '/posts' },
    { method: 'OPTIONS', path: '/posts' },
    { method: 'HEAD', path: '/posts' },
  ],
})
