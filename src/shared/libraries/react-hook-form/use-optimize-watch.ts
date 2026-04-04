'use client'

import { useEffect, useRef } from 'react'
import { FieldValues, UseFormWatch } from 'react-hook-form'

export const useOptimizeWatch = <FormValues extends FieldValues = FieldValues>(watch: UseFormWatch<FormValues>) => {
  const changes = useRef<Partial<Record<keyof FormValues, unknown>>>({})

  useEffect(() => {
    const subscription = watch((formValues, { name, type }) => {
      if (name && type === 'change') {
        changes.current[name] = formValues[name]
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (valueToWatch?: keyof FormValues) => {
    return valueToWatch ? changes.current[valueToWatch] : changes.current
  }
}
