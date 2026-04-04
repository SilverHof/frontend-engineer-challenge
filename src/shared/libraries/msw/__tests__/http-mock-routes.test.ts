import { setupServer } from 'msw/node'

import { HttpMockRoutes } from '../http-mock-routes.class.ts'

describe('HttpMockRoutes', () => {
  let httpMockRoutes: HttpMockRoutes
  const server = setupServer()

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  beforeEach(() => {
    httpMockRoutes = new HttpMockRoutes()
  })

  const mockTemplate = {
    id: '@id',
    name: '@name',
    email: '@email',
  }

  const testPath = 'http://localhost/api/test'

  describe('GET requests', () => {
    it('should handle single item response', async () => {
      server.use(
        httpMockRoutes.get({
          path: testPath,
          mockTemplate,
          type: 'single',
        })
      )

      const response = await fetch(testPath)
      expect(response.ok).toBe(true)
      const data = await response.json()

      expect(data).toHaveProperty('id')
      expect(data).toHaveProperty('name')
      expect(data).toHaveProperty('email')
    })

    it('should handle collection response', async () => {
      server.use(
        httpMockRoutes.get({
          path: testPath,
          mockTemplate,
          type: 'collection',
        })
      )

      const response = await fetch(`${testPath}?itemsPerPage=5`)
      expect(response.ok).toBe(true)
      const data = await response.json()

      expect(data).toHaveProperty('hydra:member')
      expect(data['hydra:member']).toHaveLength(5)
      expect(data).toHaveProperty('hydra:totalItems', 5)
    })

    it('should handle error response', async () => {
      server.use(
        httpMockRoutes.get({
          path: testPath,
          mockTemplate,
          errorToEmulate: {
            status: 'BAD_REQUEST',
            errorType: 'HYDRA_ERROR',
          },
        })
      )

      const response = await fetch(testPath)
      expect(response.status).toBe(400)
    })
  })

  describe('POST requests', () => {
    it('should handle successful post request', async () => {
      server.use(
        httpMockRoutes.post({
          path: testPath,
        })
      )

      const postData = { test: 'data' }
      const response = await fetch(testPath, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toEqual(postData)
    })

    it('should handle override response', async () => {
      const overrideResponse = { success: true }
      server.use(
        httpMockRoutes.post({
          path: testPath,
          overrideResponse,
        })
      )

      const response = await fetch(testPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toHaveProperty('success', true)
    })
  })

  describe('PUT requests', () => {
    it('should handle successful put request', async () => {
      server.use(
        httpMockRoutes.put({
          path: testPath,
        })
      )

      const putData = { test: 'updated' }
      const response = await fetch(testPath, {
        method: 'PUT',
        body: JSON.stringify(putData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toEqual(putData)
    })
  })

  describe('DELETE requests', () => {
    it('should handle successful delete request', async () => {
      const deleteTestPath = `${testPath}/:id`
      server.use(
        httpMockRoutes.delete({
          path: deleteTestPath,
        })
      )

      const response = await fetch(`${testPath}/123`, {
        method: 'DELETE',
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toHaveProperty('message', 'Resource 123 deleted successfully')
      expect(response.status).toBe(200)
    })
  })

  describe('HEAD requests', () => {
    it('should handle successful head request', async () => {
      server.use(
        httpMockRoutes.head({
          path: testPath,
        })
      )

      const response = await fetch(testPath, {
        method: 'HEAD',
      })

      expect(response.ok).toBe(true)
      expect(response.headers.get('Content-Type')).toBe('application/json')
      expect(response.headers.get('Last-Modified')).toBe('Mon, 13 Jul 2024 15:00:00 GMT')
    })
  })

  describe('OPTIONS requests', () => {
    it('should handle successful options request', async () => {
      server.use(
        httpMockRoutes.options({
          path: testPath,
        })
      )

      const response = await fetch(testPath, {
        method: 'OPTIONS',
      })

      expect(response.ok).toBe(true)
      expect(response?.headers?.get('Allow')).toBe('GET,HEAD,POST')
    })
  })
})
