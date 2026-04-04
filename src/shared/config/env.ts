export type EnvRuntime = 'test' | 'local' | 'development' | 'production'

export type EnvConfigKeys = keyof typeof ENV_CONFIG

export const getProcessEnv = (): Partial<Record<EnvConfigKeys, string | boolean | Date>> => {
  const envValues: Partial<Record<EnvConfigKeys, string | boolean | Date>> = {}

  Object.entries(ENV_CONFIG).forEach(([key, { value, target }]) => {
    if (value === undefined || value === null) {
      throw new Error(`Required environment variable ${target} is undefined.`)
    }
    envValues[key as EnvConfigKeys] = value
  })

  return envValues
}

export const IS_STORYBOOK = import.meta.env.STORYBOOK_ENV

// Режим запуска программы
export const NODE_ENV = (import.meta.env.VITE_NODE_ENV || import.meta.env.MODE) as EnvRuntime
// Режим тестирования
export const isLocalEnv = NODE_ENV === 'local'
// Режим тестирования
export const isTestEnv = NODE_ENV === 'test'
// Режим разработки
export const isDevEnv = NODE_ENV === 'development'
// Режим продакшена
export const isProdEnv = NODE_ENV === 'production'

export const ENV_CONFIG = {
  BASE_URL: {
    value: IS_STORYBOOK ? 'http://storybook.mocks:3000' : import.meta.env.VITE_TARGET,
    target: 'VITE_TARGET',
  },
  TOKEN_PATH: {
    value: IS_STORYBOOK ? 'token' : import.meta.env.VITE_TOKEN_PATH,
    target: 'VITE_TOKEN_PATH',
  },
  REFRESH_TOKEN_REQUEST_TARGET: {
    value: import.meta.env.VITE_REFRESH_TOKEN_REQUEST_TARGET,
    target: 'VITE_REFRESH_TOKEN_REQUEST_TARGET',
  },
  REFRESH_TOKEN_GRANT_TYPE: {
    value: import.meta.env.VITE_REFRESH_TOKEN_GRANT_TYPE,
    target: 'VITE_REFRESH_TOKEN_GRANT_TYPE',
  },
  REFRESH_TOKEN_SCOPE: {
    value: import.meta.env.VITE_REFRESH_TOKEN_SCOPE,
    target: 'VITE_REFRESH_TOKEN_SCOPE',
  },
  API_MOCKING: {
    value: import.meta.env.VITE_API_MOCKING === 'true',
    target: 'VITE_API_MOCKING',
  },
  MERCURE_TARGET: {
    value:
      (IS_STORYBOOK ? 'http://storybook.mocks:3000' : import.meta.env.VITE_TARGET) +
      (import.meta.env.VITE_MERCURE_TARGET || ''),
    target: 'VITE_MERCURE_TARGET',
  },
  PROJECT_VERSION: {
    value: import.meta.env.VITE_PROJECT_VERSION,
    target: 'VITE_PROJECT_VERSION',
  },
  PROJECT_LAST_BUILD_DATE: {
    value: import.meta.env.VITE_PROJECT_LAST_BUILD_DATE,
    target: 'VITE_PROJECT_LAST_BUILD_DATE',
  },
  SENTRY_DSN: {
    value: isProdEnv ? import.meta.env.VITE_SENTRY_DSN_PROD : import.meta.env.VITE_SENTRY_DSN_DEV,
    target: isProdEnv ? 'VITE_SENTRY_DSN_PROD' : 'VITE_SENTRY_DSN_DEV',
  },
  SENTRY_AUTH_TOKEN: {
    value: isProdEnv ? import.meta.env.VITE_SENTRY_AUTH_TOKEN_PROD : import.meta.env.VITE_SENTRY_AUTH_TOKEN_DEV,
    target: isProdEnv ? 'VITE_SENTRY_AUTH_TOKEN_PROD' : 'VITE_SENTRY_AUTH_TOKEN_DEV',
  },
  SENTRY_ENABLED_FORCE: {
    value: import.meta.env.VITE_SENTRY_ENABLED_FORCE === 'true',
    target: 'VITE_SENTRY_ENABLED_FORCE',
  },
  SENTRY_DISABLED_FORCE: {
    value: import.meta.env.VITE_SENTRY_DISABLED_FORCE === 'true',
    target: 'VITE_SENTRY_DISABLED_FORCE',
  },
  KEYCLOAK_CLIENT_ID: {
    value: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    target: 'VITE_KEYCLOAK_CLIENT_ID',
  },
  KEYCLOAK_SERVER_URL: {
    value: import.meta.env.VITE_KEYCLOAK_SERVER_URL,
    target: 'VITE_KEYCLOAK_SERVER_URL',
  },
  KEYCLOAK_REALM: {
    value: import.meta.env.VITE_KEYCLOAK_REALM,
    target: 'VITE_KEYCLOAK_REALM',
  },
  KEYCLOAK_SESSION_STORAGE_NAME: {
    value: import.meta.env.VITE_KEYCLOAK_SESSION_STORAGE_NAME,
    target: 'VITE_KEYCLOAK_SESSION_STORAGE_NAME',
  },
  TENANT_DOMAIN: {
    value: import.meta.env.VITE_TENANT_DOMAIN,
    target: 'VITE_TENANT_DOMAIN',
  },
}

export const {
  BASE_URL,
  TOKEN_PATH,
  REFRESH_TOKEN_REQUEST_TARGET,
  REFRESH_TOKEN_GRANT_TYPE,
  REFRESH_TOKEN_SCOPE,
  API_MOCKING,
  MERCURE_TARGET,
  PROJECT_VERSION,
  PROJECT_LAST_BUILD_DATE,
  SENTRY_DSN,
  SENTRY_AUTH_TOKEN,
  SENTRY_ENABLED_FORCE,
  SENTRY_DISABLED_FORCE,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_SERVER_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_SESSION_STORAGE_NAME,
  TENANT_DOMAIN,
} = getProcessEnv()
