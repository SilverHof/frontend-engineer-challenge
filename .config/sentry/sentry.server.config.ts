import * as SentryReact from '@sentry/react'

import { sentryBaseConfig } from './sentry.base.config'

SentryReact.init({
  ...sentryBaseConfig,
})
