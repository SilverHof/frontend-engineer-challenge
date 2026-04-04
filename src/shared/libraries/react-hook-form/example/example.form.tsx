'use client'

import { ComponentProps } from 'react'
import { Controller } from 'react-hook-form'
import * as yup from 'yup'

import { createValidationSchema } from '../../yup'
import { useFormInitializer } from '../use-form-initializer.ts'

// 1. Создание схема происходит через createValidationSchema,
// если типизировать его дженериком, то TS будет подсказывать поля для ввода

// 2. Для работы с формой используем хук useFormInitializer

// 3. Если в baseSchema добавить валидацию то форма уже станет типизированной

// 4. При добавлении defaultValues или values в параметры, то нужно приводить их типу формы,
// чтобы при необходимости compoundSchemas правильно подсказывал ключи

// 5. Если нужно следить за изменением инпута, то нужно использовать optimizeWatch,
// иначе подойдет обычный watch

// 6. Для использования контекста внутри компонентов хук useFormInitializerContext

enum CITIZENSHIP_ENUM {
  Citizen = 'CITIZEN',
  Resident = 'RESIDENT',
  Foreigner = 'FOREIGNER',
  Stateless = 'STATELESS',
}

interface ExampleForm {
  firstName: string
  middleName: string
  lastName: string
  address?: string
  inn?: string
  citizenship: CITIZENSHIP_ENUM
}

const exampleValidationSchema = createValidationSchema<ExampleForm>({
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
  citizenship: yup.string().optional(),
})

const citizenValidationSchema = createValidationSchema<ExampleForm>({
  inn: yup.string().required(),
})

const EXAMPLE_FORM_DEFAULT_VALUES: ExampleForm = {
  firstName: 'example firstName',
  middleName: 'example middleName',
  lastName: 'example lastName',
  citizenship: CITIZENSHIP_ENUM.Citizen,
}

const EXAMPLE_FORM_VALUES: ExampleForm = {
  firstName: 'example firstName',
  middleName: 'example middleName',
  lastName: 'example lastName',
  citizenship: CITIZENSHIP_ENUM.Citizen,
}

export const FormComponentExample = () => {
  const { Form, control } = useFormInitializer<ExampleForm>({
    baseSchema: exampleValidationSchema,
    compoundSchemas: [{ key: 'citizenship', schema: citizenValidationSchema, valueToMatch: CITIZENSHIP_ENUM.Citizen }],
    hookParams: { defaultValues: EXAMPLE_FORM_DEFAULT_VALUES, values: EXAMPLE_FORM_VALUES },
  })

  return (
    <Form
      onSubmit={(data) => {
        alert(data)
      }}
    >
      <Controller
        name='firstName'
        control={control}
        render={({ field }) => {
          return <Input {...field} />
        }}
      />
    </Form>
  )
}

type InputProps = ComponentProps<'input'>

const Input = (props?: InputProps) => {
  return <input {...props} />
}
