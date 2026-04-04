import { type Primitive } from './_types.ts'

import { isNullOrUndefined } from './is-null-or-undefined.ts'
import { isObjectType } from './is-object.ts'

export const isPrimitive = (value: unknown): value is Primitive => {
  return isNullOrUndefined(value) || !isObjectType(value)
}
