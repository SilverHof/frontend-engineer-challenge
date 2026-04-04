import { isDateObject } from './is-date-object.ts'
import { isNullOrUndefined } from './is-null-or-undefined.ts'

export const isObjectType = (value: unknown): value is object => {
  return typeof value === 'object'
}

export const isObject = <Type extends object>(value: unknown): value is Type => {
  return !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value)
}
