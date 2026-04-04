'use client'

import { FieldValues, useFormContext } from 'react-hook-form'

import { useFormInitializerProvider } from './use-form-initializer-provider.ts'

export const useFormInitializerContext = <
  FormValues extends FieldValues,
  FormContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
>() => {
  const methods = useFormContext<FormValues, FormContext, TransformedValues>()
  const formInitializerMethods = useFormInitializerProvider<FormValues>()

  return {
    ...methods,
    ...formInitializerMethods,
  }
}
