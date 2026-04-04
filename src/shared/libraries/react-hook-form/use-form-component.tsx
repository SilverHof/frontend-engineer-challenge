'use client'

import { useCallback, useRef } from 'react'
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'

import { FormProps } from './_types.ts'

import { FormInitializerProvider as FormInitializer } from './use-form-initializer-provider.ts'

export type UseFormComponentArgs<FormValues extends FieldValues = FieldValues> = {
  methods: UseFormReturn<FormValues, any, FormValues>
  optimizeWatch: (valueToWatch: keyof FormValues) => any
}

export const useFormComponent = <FormValues extends FieldValues = FieldValues>({
  methods,
  optimizeWatch,
}: UseFormComponentArgs<FormValues>) => {
  const FormInitializerProvider = FormInitializer.Provider
  const methodsRef = useRef(methods)

  const FormComponent = useCallback(
    ({
      children,
      className = '',
      onSubmit: handleFormSubmit,
      onError: errorHandler,
      ...rest
    }: FormProps<FormValues>) => {
      const submitHandler: SubmitHandler<FormValues> = async (data) => {
        try {
          await handleFormSubmit?.(data)
        } catch (error) {
          return Promise.reject(error)
        }
      }

      const onSubmit = methods.handleSubmit(
        (data) => submitHandler(data),
        (data) => errorHandler?.(data)
      )

      return (
        <FormProvider {...methodsRef.current}>
          <FormInitializerProvider value={{ optimizeWatch }}>
            <form className={className} onSubmit={onSubmit} {...rest} noValidate>
              {children}
            </form>
          </FormInitializerProvider>
        </FormProvider>
      )
    },
    []
  )

  return FormComponent
}
