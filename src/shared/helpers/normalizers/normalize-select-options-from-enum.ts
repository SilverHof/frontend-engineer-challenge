import type { SelectOption } from '@/shared/@types'
import { isFunction, isUndefined } from '@/shared/helpers'
import type { DynamicTranslationKeys, UseDynamicTranslateReturnType } from '@/shared/libraries'

export const normalizeSelectOptionsFromEnum = <TEnum extends Record<string, string>>(
  data: TEnum,
  t: UseDynamicTranslateReturnType,
  config?: {
    translatePrefix?: string
    postfix?: string | ((value: string) => string)
    disabledOptions?: string[]
    permittedOptions?: string[]
  }
): SelectOption[] => {
  const translatePrefix = config?.translatePrefix || ''
  return Object.values(data)
    .filter((entity) => {
      if (!isUndefined(config?.permittedOptions)) return !config.permittedOptions.includes(entity)
      return entity
    })
    .map((entity) => ({
      id: entity,
      label:
        t((translatePrefix + entity) as DynamicTranslationKeys) +
        ((isFunction(config?.postfix) ? config?.postfix?.(entity) : config?.postfix) || ''),
      disabled: config?.disabledOptions?.includes(entity),
    }))
}
