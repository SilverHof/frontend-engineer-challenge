import { z } from 'zod'

const IS_STORYBOOK = Boolean(import.meta.env.STORYBOOK_ENV)

const viteEnvBoolean = z.preprocess((value: unknown) => {
  if (value === undefined || value === '') return false
  if (typeof value === 'boolean') return value
  return String(value) === 'true'
}, z.boolean())

export const envSchema = z.object({
  VITE_TARGET: z.string().url('VITE_TARGET должен быть валидным URL'),
  VITE_ENVIRONMENT: z.enum(['development', 'staging', 'production']),
  VITE_API_MOCKING: viteEnvBoolean,
})

export const safeParseEnvVariables = envSchema.safeParse({
  VITE_TARGET: IS_STORYBOOK ? 'http://storybook.mocks:3000' : import.meta.env.VITE_TARGET,
  VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
  VITE_API_MOCKING: import.meta.env.VITE_API_MOCKING,
})

if (!safeParseEnvVariables.success) {
  const details = safeParseEnvVariables.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ')

  throw new Error(`Ошибка валидации окружения: ${details}`)
}

export const ENV_VARIABLES = safeParseEnvVariables.data

export const VITE_TARGET = ENV_VARIABLES.VITE_TARGET

export type Env = z.infer<typeof envSchema>
