import * as SentryJs from '@sentry/browser'
import * as SentryReact from '@sentry/react'

import {
  formatBreadcrumbsToFakeDomainInProd,
  networkDetailAllowUrls,
  networkDetailDenyUrls,
} from '../../src/shared/libraries'
import { sentryBaseConfig } from './sentry.base.config'

SentryReact.init({
  ...sentryBaseConfig,
  //Настройка для сохранения логов сентри в оффлайн
  transport: SentryReact.makeBrowserOfflineTransport(SentryReact.makeFetchTransport),

  // Если 0 - не записывает видео с ошибками
  // Если 1 - записывает видео только с ошибками
  replaysOnErrorSampleRate: 0,

  // Если 0 - не записывает видео всей сессии
  // Если 1 - записывает видео всей пользовательской сессии
  replaysSessionSampleRate: 1,

  maxBreadcrumbs: 15,

  // You can remove this option if you're not planning to use the Sentry SessionReplay feature:
  integrations: [
    SentryJs.replayIntegration({
      //Настройка для блокировки контента текст/инпутов/медиа
      // Разблокируем любые блокировки(из-за внутреннего контура - это безопасно)
      maskAllText: false,
      maskAllInputs: false,
      blockAllMedia: false,

      //Настройка отправка тела запросов
      networkDetailAllowUrls: networkDetailAllowUrls,
      networkDetailDenyUrls: networkDetailDenyUrls,
      minReplayDuration: 15000,
    }),
    SentryJs.browserTracingIntegration(),
  ],

  beforeBreadcrumb(breadcrumb) {
    //return breadcrumb
    //если сентри лежит на том же домене, что и бекенд
    //без api. - то в логах отрежется домен и лог xhr превартиться в navigation
    //чтобы обойти подменяем домен
    return formatBreadcrumbsToFakeDomainInProd(breadcrumb)
  },

  async beforeSend(event) {
    /***
     * Тут можно обработать евент перед логированием в сентри
     ***/
    return event
  },
})
