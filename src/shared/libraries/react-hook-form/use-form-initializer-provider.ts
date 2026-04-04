'use client'

import { Context, createContext, useContext } from 'react'
import { FieldValues } from 'react-hook-form'

import { OptimizeWatch } from './_types.ts'

export const FormInitializerProvider = createContext<OptimizeWatch>(undefined)

export const useFormInitializerProvider = <FormValues extends FieldValues>() => {
  const context = useContext(FormInitializerProvider as Context<OptimizeWatch<FormValues>>)
  if (context === undefined) {
    throw new Error('useCustomFormContext must be used within a FormInitializerProvider')
  }
  return context
}
