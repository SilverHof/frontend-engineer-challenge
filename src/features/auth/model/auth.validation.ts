import { z } from 'zod'

export const authLoginSchema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
  password: z.string().min(1, 'Пароль обязателен').min(4, 'Минимум 4 символа'),
})

export const authRegisterSchema = z
  .object({
    email: z.email('Введите корректный email'),
    password: z.string().min(1, 'Пароль обязателен').min(4, 'Минимум 4 символа'),
    confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export const authRequestPasswordResetSchema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
})

export const authResetPasswordSchema = z
  .object({
    password: z.string().min(1, 'Пароль обязателен').min(4, 'Минимум 4 символа'),
    confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type AuthLoginFormData = z.infer<typeof authLoginSchema>
export type AuthRegisterFormData = z.infer<typeof authRegisterSchema>
export type AuthRequestPasswordResetFormData = z.infer<typeof authRequestPasswordResetSchema>
export type AuthResetPasswordFormData = z.infer<typeof authResetPasswordSchema>
