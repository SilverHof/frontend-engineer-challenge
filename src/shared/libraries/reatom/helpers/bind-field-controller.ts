import type { ChangeEvent, ReactNode } from 'react'
import type { FieldAtom, Rec } from '@reatom/core'
import { abortVar, memoKey, notify, wrap } from '@reatom/core'

export const bindFieldController = <TValue = unknown>(
  field: FieldAtom<any, TValue>,
  withErrorProps: boolean = true
): {
  value: TValue extends boolean ? undefined : TValue
  checked: TValue extends boolean ? boolean : undefined
  onChange: (
    value:
      | TValue
      | { currentTarget: TValue extends boolean ? { checked: TValue } : { value: TValue } }
      | ChangeEvent<{ value: TValue }>
  ) => void
  onBlur: () => void
  onFocus: () => void
  errorMessage: ReactNode
  isInvalid: boolean
  error: undefined | string
} => {
  const create = () => {
    const onChange = wrap((event: any) => {
      const isEvent = !!event?.currentTarget?.addEventListener
      const value = isEvent
        ? event.currentTarget.type === 'checkbox'
          ? event.currentTarget.checked
          : event.currentTarget.value
        : event

      field.change(value)
      notify()
    })

    const onBlur = wrap(() => {
      field.focus.out()
      notify()
    })

    const onFocus = wrap(() => {
      field.focus.in()
      notify()
    })

    const controller = abortVar.get()

    return { onChange, onBlur, onFocus, field, controller }
  }

  const value = field.value()

  let ref = memoKey(field.name, () => ({
    current: create(),
  }))
  if (ref.current.controller?.signal.aborted || ref.current.field !== field) {
    ref.current = create()
  }

  const { onChange, onBlur, onFocus } = ref.current

  const { error } = field.validation()

  const result: Rec = {
    onChange,
    onBlur,
    onFocus,
    error,
    ...(withErrorProps && {
      errorMessage: error,
      isInvalid: !!error,
    }),
  }

  if (typeof value === 'boolean') {
    result.checked = value
  } else {
    result.value = value
  }

  // @ts-expect-error generic overloads
  return result
}
