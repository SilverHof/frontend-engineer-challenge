import { get } from 'es-toolkit/compat'

import type { SelectOption } from '@/shared/@types'
import { isFunction } from '@/shared/helpers'

export const normalizeSelectOptions = <TData extends object[]>(
  data?: TData,
  options?: {
    labelKey?: string | ((entity: TData[number]) => string)
    valueKey?: string
    defaultValue?: SelectOption[]
    validate?: (item: TData[number]) => boolean
  },
  additionalFields?: string[]
): SelectOption[] => {
  const { defaultValue, labelKey, valueKey, validate } = {
    defaultValue: [],
    labelKey: 'name',
    valueKey: '@id',
    ...options,
  }

  const getCustomFiled = (el: object) => {
    return additionalFields?.reduce(
      (acc, field) => {
        acc[field] = get(el, field)
        return acc
      },
      {} as Record<string, unknown>
    )
  }

  const reducedData = data
    ? data.reduce<SelectOption[]>((acc, el) => {
        if (!validate || validate(el)) {
          const id = get(el, valueKey) as string
          const label = isFunction(labelKey) ? labelKey(el) : (get(el, labelKey, '') as string)
          const customFields = {
            ...(additionalFields?.length && {
              ...getCustomFiled(el),
            }),
          }

          acc.push({
            id,
            label,
            ...customFields,
          })
        }
        return acc
      }, [])
    : []

  return [...defaultValue, ...reducedData]
}
