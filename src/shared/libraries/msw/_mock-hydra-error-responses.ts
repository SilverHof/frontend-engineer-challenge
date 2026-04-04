import { MOCK_ERROR_STATUS_ENUM, type MockHydraError } from './_types.ts'

export const MOCK_HYDRA_ERROR_RESPONSES: MockHydraError = {
  [MOCK_ERROR_STATUS_ENUM.BAD_REQUEST]: {
    isAxiosError: true,
    message: 'Bad request',
    name: 'AxiosError',
    response: {
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: {}, // Пустой объект для config
      data: {
        '@context': 'https://www.w3.org/ns/hydra/context.jsonld',
        '@type': 'hydra:Error',
        'hydra:title': 'Bad Request',
        'hydra:description': 'Invalid input parameters.',
      },
    },
    config: {}, // Пустой объект для config
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        response: this.response,
      }
    },
  },
  [MOCK_ERROR_STATUS_ENUM.UNAUTHORIZED]: {
    isAxiosError: true,
    message: 'Unauthorized',
    name: 'AxiosError',
    response: {
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: {}, // Пустой объект для config
      data: {
        '@context': 'https://www.w3.org/ns/hydra/context.jsonld',
        '@type': 'hydra:Error',
        'hydra:title': 'Unauthorized',
        'hydra:description': 'Invalid credentials provided.',
      },
    },
    config: {}, // Пустой объект для config
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        response: this.response,
      }
    },
  },
  [MOCK_ERROR_STATUS_ENUM.UNPROCESSABLE_ENTITY]: {
    isAxiosError: true,
    message: 'Unprocessable Entity',
    name: 'AxiosError',
    response: {
      status: 422,
      statusText: 'Unprocessable Entity',
      headers: {},
      config: {}, // Пустой объект для config
      data: {
        '@context': 'https://www.w3.org/ns/hydra/context.jsonld',
        '@type': 'hydra:Error',
        'hydra:title': 'Unprocessable Entity',
        'hydra:description': 'The server understands the content type, but the content is invalid.',
      },
    },
    config: {}, // Пустой объект для config
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        response: this.response,
      }
    },
  },
  [MOCK_ERROR_STATUS_ENUM.NOT_FOUND]: {
    isAxiosError: true,
    message: 'Not Found',
    name: 'AxiosError',
    response: {
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config: {}, // Пустой объект для config
      data: {
        '@context': 'https://www.w3.org/ns/hydra/context.jsonld',
        '@type': 'hydra:Error',
        'hydra:title': 'Not Found',
        'hydra:description': 'The requested resource could not be found.',
      },
    },
    config: {}, // Пустой объект для config
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        response: this.response,
      }
    },
  },
  [MOCK_ERROR_STATUS_ENUM.TOO_MANY_REQUESTS]: {
    isAxiosError: true,
    message: 'Too Many Requests',
    name: 'AxiosError',
    response: {
      status: 429,
      statusText: 'Too Many Requests',
      headers: {},
      config: {}, // Пустой объект для config
      data: {
        '@context': 'https://www.w3.org/ns/hydra/context.jsonld',
        '@type': 'hydra:Error',
        'hydra:title': 'Too Many Requests',
        'hydra:description': 'You have sent too many requests in a given amount of time.',
      },
    },
    config: {}, // Пустой объект для config
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        response: this.response,
      }
    },
  },
  [MOCK_ERROR_STATUS_ENUM.INTERNAL_SERVER_ERROR]: {
    isAxiosError: true,
    message: 'Internal Server Error',
    name: 'AxiosError',
    response: {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      config: {}, // Пустой объект для config
      data: {
        '@context': 'https://www.w3.org/ns/hydra/context.jsonld',
        '@type': 'hydra:Error',
        'hydra:title': 'Internal Server Error',
        'hydra:description': 'Unexpected server error.',
      },
    },
    config: {}, // Пустой объект для config
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        response: this.response,
      }
    },
  },
  [MOCK_ERROR_STATUS_ENUM.BAD_GATEWAY]: {
    isAxiosError: true,
    message: 'Bad Gateway',
    name: 'AxiosError',
    response: {
      status: 502,
      statusText: 'Bad Gateway',
      headers: {},
      config: {}, // Пустой объект для config
      data: {
        '@context': 'https://www.w3.org/ns/hydra/context.jsonld',
        '@type': 'hydra:Error',
        'hydra:title': 'Bad Gateway',
        'hydra:description': 'The server received an invalid response from the upstream server.',
      },
    },
    config: {}, // Пустой объект для config
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        response: this.response,
      }
    },
  },
}
