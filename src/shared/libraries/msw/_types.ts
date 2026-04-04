import { AxiosError } from 'axios'

import type { HydraError, HydraErrorWithDetail } from '@/shared/@types'

export type HttpGetType = 'collection' | 'single'

export interface BaseMockRoute {
  method: keyof typeof HTTP_METHODS_ENUM
  path: string
  errorToEmulate?: ErrorToEmulate
  overrideResponse?: MockTemplate
}

export interface GetMockRoute extends BaseMockRoute {
  method: 'GET'
  type: HttpGetType
  errorToEmulate?: ErrorToEmulate
  overrideResponse?: never
}

export interface NonGetMockRoute extends BaseMockRoute {
  method: Exclude<keyof typeof HTTP_METHODS_ENUM, 'GET'>
  type?: never
  errorToEmulate?: ErrorToEmulate
  overrideResponse?: MockTemplate
}

export type MockRoutes = GetMockRoute | NonGetMockRoute

export type CreateHttpMockRoutesParams = {
  mockTemplate: Record<string, unknown>
  routes: MockRoutes[]
  overrideBaseUrl?: string
}

export interface GetMockMethodParams {
  path: string
  mockTemplate: MockTemplate
  type?: HttpGetType
  errorToEmulate?: ErrorToEmulate
}

// HEAD, OPTIONS, POST, PATCH, PUT, DELETE
export interface BaseMockMethodParams {
  path: string
  errorToEmulate?: ErrorToEmulate
  overrideResponse?: MockTemplate
}

export enum HTTP_METHODS_ENUM {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

export enum MOCK_ERROR_STATUS_ENUM {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  UNPROCESSABLE_ENTITY = 422,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
}

export type MockTemplate = Record<string, unknown>
export type MockHydraError = Record<MOCK_ERROR_STATUS_ENUM, AxiosError<HydraError>>
export type MockHydraErrorWithDetail = Record<MOCK_ERROR_STATUS_ENUM, AxiosError<HydraErrorWithDetail>>
export type MockErrorResponses = Record<MOCK_ERROR_TYPE_ENUM, MockHydraError | MockHydraErrorWithDetail>

export interface ErrorToEmulate {
  status: keyof typeof MOCK_ERROR_STATUS_ENUM
  errorType: keyof typeof MOCK_ERROR_TYPE_ENUM
}

export enum MOCK_ERROR_TYPE_ENUM {
  HYDRA_ERROR = 'hydra-error',
  HYDRA_ERROR_WITH_DETAIL = 'hydra-error-with-detail',
}
