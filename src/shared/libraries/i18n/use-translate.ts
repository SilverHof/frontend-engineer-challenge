import { useTranslation } from 'react-i18next'

import ru from '../../../../public/translate/ru.json'

type RuMessages = typeof ru

export interface IntlMessages extends RuMessages {}

// Рекурсивная утилита для получения всех возможных путей
type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never

type Path<T> = PathImpl<T, keyof T>

// Все возможные ключи, например: "home.welcome" | "home.description" | "header.title"
export type MessageKeys = Path<IntlMessages>

export const useTranslate = () => {
  const { t: translation } = useTranslation()

  const t = (fullKey: MessageKeys) => {
    // const [namespace, key] = fullKey.split(".") as [keyof IntlMessages, string];
    return translation(fullKey)
  }

  return { t }
}

export type TranslateFunction = (key: MessageKeys) => string
