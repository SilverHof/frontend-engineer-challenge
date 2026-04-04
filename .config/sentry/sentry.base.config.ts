import {
  isDevEnv,
  isProdEnv,
  PROJECT_LAST_BUILD_DATE,
  PROJECT_VERSION,
  SENTRY_DSN,
  SENTRY_ENABLED_FORCE,
} from '../../src/shared/config/env'
import { getSentryEnvironment } from '../../src/shared/libraries/sentry'

export const sentryBaseConfig = {
  dsn: SENTRY_DSN as string,
  environment: getSentryEnvironment(),
  enabled: isDevEnv || isProdEnv || !!SENTRY_ENABLED_FORCE,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
  normalizeDepth: 100,
  initialScope: {
    tags: {
      version: String(PROJECT_VERSION ?? 'unknown'),
      last_build_time: new Date(PROJECT_LAST_BUILD_DATE as Date).toLocaleString(),
    },
  },

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
}
