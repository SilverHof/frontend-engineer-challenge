import { BASE_URL } from '@/shared/config'

import { HTTP_METHODS_ENUM, type CreateHttpMockRoutesParams } from './_types.ts'

import { HttpMockRoutes } from './http-mock-routes.class.ts'

/**
 * Создает моковые HTTP маршруты для тестирования с использованием MSW (Mock Service Worker)
 *
 * @param params Параметры для создания моковых HTTP маршрутов
 * @param params.routes Массив конфигураций маршрутов
 * @param params.routes[].method HTTP метод (GET, POST, PUT и т.д.)
 * @param params.routes[].path Путь маршрута для мокирования
 * @param params.routes[].type Тип мокового ответа (для GET запросов)
 * @param params.routes[].errorToEmulate Ошибка для симуляции в ответе
 * @param params.routes[].overrideResponse Пользовательский ответ для переопределения поведения по умолчанию
 * @param params.mockTemplate Шаблон для моковых ответов
 * @param params.overrideBaseUrl Опциональный базовый URL для переопределения BASE_URL
 *
 * @returns Массив обработчиков запросов MSW
 *
 * @example
 * Пример 1: Базовый GET запрос
 * const routes = createHttpMockRoutes({
 *   routes: [{
 *     method: HTTP_METHODS_ENUM.GET,
 *     path: '/api/users',
 *     type: 'success'
 *   }],
 *   mockTemplate: usersMockData,
 * });
 *
 * @example
 * Пример 2: POST запрос с переопределением ответа
 * const routesWithOverride = createHttpMockRoutes({
 *   routes: [{
 *     method: HTTP_METHODS_ENUM.POST,
 *     path: '/api/users',
 *     overrideResponse: { id: 1, name: 'Новый пользователь' }
 *   }],
 *   mockTemplate: usersMockData,
 * });
 *
 * @example
 * Пример 3: Эмуляция ошибки
 * const routesWithError = createHttpMockRoutes({
 *   routes: [{
 *     method: HTTP_METHODS_ENUM.GET,
 *     path: '/api/users',
 *     errorToEmulate: new Error('Ошибка сервера 500')
 *   }],
 *   mockTemplate: usersMockData,
 * });
 *
 * @example
 * Пример 4: Переопределение базового URL
 * const routesWithCustomBaseUrl = createHttpMockRoutes({
 *   routes: [{
 *     method: HTTP_METHODS_ENUM.GET,
 *     path: '/users',
 *   }],
 *   mockTemplate: usersMockData,
 *   overrideBaseUrl: 'https://api.example.com',
 * });
 */

export const createHttpMockRoutes = ({ routes, mockTemplate, overrideBaseUrl }: CreateHttpMockRoutesParams) => {
  const httpMockRoutesInstance = new HttpMockRoutes()

  const createdRoutes = routes.map((route) => {
    const { method, path, type, errorToEmulate, overrideResponse } = route
    const currentPath = overrideBaseUrl || BASE_URL + path

    const HTTP_ROUTES = {
      [HTTP_METHODS_ENUM.GET]: httpMockRoutesInstance.get({
        path: currentPath,
        mockTemplate: mockTemplate,
        type: type,
        errorToEmulate: errorToEmulate,
      }),
      [HTTP_METHODS_ENUM.POST]: httpMockRoutesInstance.post({
        path: currentPath,
        errorToEmulate: errorToEmulate,
        overrideResponse: overrideResponse,
      }),
      [HTTP_METHODS_ENUM.PUT]: httpMockRoutesInstance.put({
        path: currentPath,
        errorToEmulate: errorToEmulate,
        overrideResponse: overrideResponse,
      }),
      [HTTP_METHODS_ENUM.PATCH]: httpMockRoutesInstance.patch({
        path: currentPath,
        errorToEmulate: errorToEmulate,
        overrideResponse: overrideResponse,
      }),
      [HTTP_METHODS_ENUM.DELETE]: httpMockRoutesInstance.delete({
        path: currentPath,
        errorToEmulate: errorToEmulate,
        overrideResponse: overrideResponse,
      }),
      [HTTP_METHODS_ENUM.HEAD]: httpMockRoutesInstance.head({
        path: currentPath,
        errorToEmulate: errorToEmulate,
        overrideResponse: overrideResponse,
      }),
      [HTTP_METHODS_ENUM.OPTIONS]: httpMockRoutesInstance.options({
        path: currentPath,
        errorToEmulate: errorToEmulate,
        overrideResponse: overrideResponse,
      }),
    }

    return HTTP_ROUTES[method]
  })

  return createdRoutes
}
