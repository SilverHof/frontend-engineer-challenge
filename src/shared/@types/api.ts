export interface CollectionResponse<Member = object> {
  '@context': string
  '@id': string
  '@type': string
  member: Member[]
  count?: number
  totalItems: number
  view: {
    '@id': string
    '@type': string
    'hydra:first': string
    'hydra:last': string
    'hydra:next': string
  }
}

export interface BaseEntity {
  '@context': string
  '@id': string
  '@type': string
  id: string
  dateCreate: string
  dateUpdate: string
}

export interface HydraError {
  '@context': string
  '@type': string
  'hydra:description': string
  'hydra:title': string
}

export interface HydraErrorWithDetail extends HydraError {
  detail: string
  status: 401 | 401 | 404 | 429 | 500 | 501 | 502 | 503 | 504
  violations: {
    propertyPath: string
    message: string
  }[]
}
