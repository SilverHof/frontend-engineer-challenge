'use client'

import { useMemo, useRef } from 'react'
import { FieldValues, Resolver, useForm, useFormState } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormInitializerArgs } from './_types.ts'

import { useCompoundValidation } from './use-compound-validation.ts'
import { useFormComponent } from './use-form-component.tsx'
import { useOptimizeWatch } from './use-optimize-watch.ts'

export const useFormInitializer = <FormValues extends FieldValues = FieldValues>(
  props?: UseFormInitializerArgs<FormValues>
) => {
  const { baseSchema, compoundSchemas, hookParams } = props || {}

  const validationSchemaRef = useRef(baseSchema)

  const getResolver = () => ({
    ...(validationSchemaRef.current && {
      resolver: yupResolver(validationSchemaRef.current) as unknown as Resolver<FormValues>,
    }),
  })

  const methods = useForm({
    reValidateMode: 'onBlur',
    ...getResolver(),
    ...hookParams,
  })

  const { isValid } = useFormState({ control: methods.control })

  const optimizeWatch = useOptimizeWatch<FormValues>(methods.watch)

  const FormComponent = useFormComponent<FormValues>({ methods, optimizeWatch })

  useCompoundValidation({
    baseSchema,
    compoundSchemas,
    watch: methods.watch,
    setFocus: methods.setFocus,
    updateCurrentValidationSchema: (schema) => {
      validationSchemaRef.current = schema
    },
  })

  return useMemo(
    () => ({
      ...methods,
      optimizeWatch,
      Form: FormComponent,
    }),
    [isValid]
  )
}
