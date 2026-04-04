import { http, HttpResponse, type DefaultBodyType, type JsonBodyType, type StrictRequest } from 'msw'
import { mock } from 'mockjs'

import {
  MOCK_ERROR_STATUS_ENUM,
  MOCK_ERROR_TYPE_ENUM,
  type BaseMockMethodParams,
  type ErrorToEmulate,
  type GetMockMethodParams,
  type MockErrorResponses,
  type MockTemplate,
} from './_types.ts'

import { MOCK_HYDRA_ERROR_RESPONSES } from './_mock-hydra-error-responses.ts'
import { MOCK_HYDRA_ERROR_WITH_DETAIL_RESPONSES } from './_mock-hydra-error-with-detail-responses.ts'

/**
 * Класс для создания моковых HTTP маршрутов с использованием MSW (Mock Service Worker)
 * Поддерживает все стандартные HTTP методы и обработку различных типов ответов
 */
export class HttpMockRoutes {
  /**
   * Предопределенные шаблоны ответов для различных типов ошибок
   */
  private static MOCK_ERROR_RESPONSES: MockErrorResponses = {
    [MOCK_ERROR_TYPE_ENUM.HYDRA_ERROR]: MOCK_HYDRA_ERROR_RESPONSES,
    [MOCK_ERROR_TYPE_ENUM.HYDRA_ERROR_WITH_DETAIL]: MOCK_HYDRA_ERROR_WITH_DETAIL_RESPONSES,
  }

  /**
   * Создает мок-данные на основе переданного шаблона
   * @param mockTemplate Шаблон для генерации данных
   */
  private createMock(mockTemplate: MockTemplate): JsonBodyType {
    return mock(mockTemplate)
  }

  /**
   * Создает моковый ответ для одиночного ресурса
   * @param mockTemplate Шаблон для генерации данных
   */
  private getMockedSingleResponse(mockTemplate: MockTemplate): JsonBodyType {
    return this.createMock(mockTemplate)
  }

  /**
   * Создает моковый ответ для коллекции ресурсов с поддержкой пагинации
   * @param request HTTP запрос
   * @param mockTemplate Шаблон для генерации данных
   */
  private getMockedCollectionResponse(request: StrictRequest<DefaultBodyType>, mockTemplate: MockTemplate) {
    const url = new URL(request.url)
    const pageSize = +(url.searchParams.get('perPage') || 20)

    return this.createMock({
      [`member|${pageSize}`]: [mockTemplate],
      totalItems: pageSize,
    })
  }

  /**
   * Эмулирует ответ с ошибкой на основе переданных параметров
   * @param errorToEmulate Параметры эмулируемой ошибки
   */
  private emulateError(errorToEmulate: ErrorToEmulate) {
    const { status, errorType } = errorToEmulate
    const mockErrorType = HttpMockRoutes.MOCK_ERROR_RESPONSES[MOCK_ERROR_TYPE_ENUM[errorType]]
    const errorResponse = mockErrorType[MOCK_ERROR_STATUS_ENUM[status]]
    return HttpResponse.json(errorResponse?.response?.data, {
      status: errorResponse?.response?.status,
    })
  }

  /**
   * Базовый обработчик ответов с поддержкой переопределения и эмуляции ошибок
   * @param params Параметры для обработки ответа
   * @param defaultResponse Функция генерации ответа по умолчанию
   */
  private baseResponseHandler(
    { overrideResponse, errorToEmulate }: Omit<BaseMockMethodParams, 'path'>,
    defaultResponse?: () => Response | Promise<Response>
  ) {
    if (errorToEmulate) return this.emulateError(errorToEmulate)

    if (overrideResponse) return HttpResponse.json(this.createMock(overrideResponse))

    return defaultResponse?.()
  }

  /**
   * Создает обработчик GET запросов
   * @param params Параметры GET запроса
   * @param params.path Путь маршрута
   * @param params.mockTemplate Шаблон для генерации данных
   * @param params.type Тип ответа (single/collection)
   * @param params.errorToEmulate Параметры для эмуляции ошибки
   *
   * @example
   * const handler = httpMockRoutes.get({
   *   path: '/api/users',
   *   mockTemplate: userTemplate,
   *   type: 'collection'
   * });
   */
  get({ path, mockTemplate, type = 'collection', errorToEmulate }: GetMockMethodParams) {
    const httpGetHandler = http.get(path, ({ request }) => {
      if (errorToEmulate) return this.baseResponseHandler({ errorToEmulate })

      const response =
        type === 'single'
          ? this.getMockedSingleResponse(mockTemplate)
          : this.getMockedCollectionResponse(request, mockTemplate)

      return HttpResponse.json(response)
    })

    return httpGetHandler
  }

  /**
   * Создает обработчик HEAD запросов
   * @param params Параметры HEAD запроса
   * @param params.path Путь маршрута
   * @param params.overrideResponse Переопределение ответа
   * @param params.errorToEmulate Параметры для эмуляции ошибки
   *
   * @example
   * const handler = httpMockRoutes.head({
   *   path: '/api/users',
   *   errorToEmulate: { status: 'NOT_FOUND', errorType: 'HYDRA_ERROR' }
   * });
   */
  head({ path, overrideResponse, errorToEmulate }: BaseMockMethodParams) {
    const httpHeadHandler = http.head(path, () =>
      this.baseResponseHandler(
        { overrideResponse, errorToEmulate },
        () =>
          new Response(null, {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Last-Modified': 'Mon, 13 Jul 2024 15:00:00 GMT',
            },
          })
      )
    )

    return httpHeadHandler
  }

  /**
   * Создает обработчик POST запросов
   * @param params Параметры POST запроса
   * @param params.path Путь маршрута
   * @param params.overrideResponse Переопределение ответа
   * @param params.errorToEmulate Параметры для эмуляции ошибки
   *
   * @example
   * const handler = httpMockRoutes.post({
   *   path: '/api/users',
   *   overrideResponse: { id: 1, name: 'Новый пользователь' }
   * });
   */
  post({ path, overrideResponse, errorToEmulate }: BaseMockMethodParams) {
    const httpPostHandler = http.post(path, async ({ request }) =>
      this.baseResponseHandler({ overrideResponse, errorToEmulate }, async () =>
        HttpResponse.json(await request.json())
      )
    )

    return httpPostHandler
  }

  /**
   * Создает обработчик PUT запросов
   * @param params Параметры PUT запроса
   * @param params.path Путь маршрута
   * @param params.overrideResponse Переопределение ответа
   * @param params.errorToEmulate Параметры для эмуляции ошибки
   *
   * @example
   * const handler = httpMockRoutes.put({
   *   path: '/api/users/1',
   *   overrideResponse: { id: 1, name: 'Обновленный пользователь' }
   * });
   */
  put({ path, overrideResponse, errorToEmulate }: BaseMockMethodParams) {
    const httpPutHandler = http.put(path, async ({ request }) =>
      this.baseResponseHandler({ overrideResponse, errorToEmulate }, async () =>
        HttpResponse.json(await request.json())
      )
    )

    return httpPutHandler
  }

  /**
   * Создает обработчик PATCH запросов
   * @param params Параметры PATCH запроса
   * @param params.path Путь маршрута
   * @param params.overrideResponse Переопределение ответа
   * @param params.errorToEmulate Параметры для эмуляции ошибки
   *
   * @example
   * const handler = httpMockRoutes.patch({
   *   path: '/api/users/1',
   *   overrideResponse: { status: 'active' }
   * });
   */
  patch({ path, overrideResponse, errorToEmulate }: BaseMockMethodParams) {
    const httpPatchHandler = http.patch(path, async ({ request }) =>
      this.baseResponseHandler({ overrideResponse, errorToEmulate }, async () =>
        HttpResponse.json(await request.json())
      )
    )

    return httpPatchHandler
  }

  /**
   * Создает обработчик DELETE запросов
   * @param params Параметры DELETE запроса
   * @param params.path Путь маршрута
   * @param params.overrideResponse Переопределение ответа
   * @param params.errorToEmulate Параметры для эмуляции ошибки
   *
   * @example
   * const handler = httpMockRoutes.delete({
   *   path: '/api/users/1',
   *   errorToEmulate: { status: 'FORBIDDEN', errorType: 'HYDRA_ERROR' }
   * });
   */
  delete({ path, overrideResponse, errorToEmulate }: BaseMockMethodParams) {
    const httpDeleteHandler = http.delete(path, ({ params: routeParams }) =>
      this.baseResponseHandler({ overrideResponse, errorToEmulate }, () =>
        HttpResponse.json({ message: `Resource ${routeParams.id} deleted successfully` }, { status: 200 })
      )
    )

    return httpDeleteHandler
  }

  /**
   * Создает обработчик OPTIONS запросов
   * @param params Параметры OPTIONS запроса
   * @param params.path Путь маршрута
   * @param params.overrideResponse Переопределение ответа
   * @param params.errorToEmulate Параметры для эмуляции ошибки
   *
   * @example
   * const handler = httpMockRoutes.options({
   *   path: '/api/users',
   *   overrideResponse: { methods: ['GET', 'POST'] }
   * });
   */
  options({ path, overrideResponse, errorToEmulate }: BaseMockMethodParams) {
    const httpOptionsHandler = http.options(path, () =>
      this.baseResponseHandler(
        { overrideResponse, errorToEmulate },
        () =>
          new Response(null, {
            status: 200,
            headers: {
              Allow: 'GET,HEAD,POST',
            },
          })
      )
    )

    return httpOptionsHandler
  }
}
