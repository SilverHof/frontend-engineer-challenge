'use client'

import { useEffect, useRef } from 'react'
import { FieldValues, UseFormSetFocus, UseFormWatch } from 'react-hook-form'

import { CompoundSchema, ValidationSchema } from './_types.ts'

export type UseCompoundValidationArgs<FormValues extends FieldValues = FieldValues> = {
  baseSchema: ValidationSchema<FormValues> | undefined
  compoundSchemas: CompoundSchema<FormValues>[] | undefined
  watch: UseFormWatch<FormValues>
  setFocus: UseFormSetFocus<FormValues>
  updateCurrentValidationSchema: (value: ValidationSchema<FormValues> | undefined) => void
}

export const useCompoundValidation = <FormValues extends FieldValues = FieldValues>({
  baseSchema,
  compoundSchemas,
  watch,
  updateCurrentValidationSchema,
}: UseCompoundValidationArgs<FormValues>) => {
  const currentValidationSchemaRef = useRef(baseSchema)

  useEffect(() => {
    const subscription = watch((formValues) => {
      if (baseSchema) {
        let newSchema = baseSchema

        const isCompoundSchemas = compoundSchemas && compoundSchemas.length !== 0

        if (isCompoundSchemas) {
          for (const compoundSchema of compoundSchemas) {
            if (formValues[compoundSchema.key as string] === compoundSchema.valueToMatch) {
              newSchema = baseSchema.concat(compoundSchema.schema) as ValidationSchema<FormValues>
              break
            }
          }

          if (JSON.stringify(newSchema) !== JSON.stringify(currentValidationSchemaRef.current)) {
            currentValidationSchemaRef.current = newSchema
            updateCurrentValidationSchema(newSchema)
          }
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, baseSchema, compoundSchemas, updateCurrentValidationSchema])
}
