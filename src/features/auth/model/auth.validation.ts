import i18next from 'i18next'
import { z } from 'zod'

export const authLoginSchema = z
  .object({
    email: z.email(i18next.t('auth.validation.email_invalid')),
    password: z.string().min(8, i18next.t('auth.validation.password_min')),
  })
  .refine((data) => data.email.length > 0, {
    message: i18next.t('auth.validation.email_required'),
    path: ['email'],
  })
  .refine((data) => data.password.length > 0, {
    message: i18next.t('auth.validation.password_required'),
    path: ['password'],
  })

export const authRegisterSchema = z
  .object({
    email: z.email(i18next.t('auth.validation.email_invalid')),
    password: z
      .string()
      .min(1, i18next.t('auth.validation.password_required'))
      .min(4, i18next.t('auth.validation.password_min')),
    confirmPassword: z.string().min(1, i18next.t('auth.validation.confirm_required')),
  })
  .refine((data) => data.email.length > 0, {
    message: i18next.t('auth.validation.email_required'),
    path: ['email'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18next.t('auth.validation.passwords_mismatch'),
    path: ['confirmPassword'],
  })

export const authRequestPasswordResetSchema = z
  .object({
    email: z.email(i18next.t('auth.validation.email_invalid')),
  })
  .refine((data) => data.email.length > 0, {
    message: i18next.t('auth.validation.email_required'),
    path: ['email'],
  })

export const authResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, i18next.t('auth.validation.password_required'))
      .min(4, i18next.t('auth.validation.password_min')),
    confirmPassword: z.string().min(8, i18next.t('auth.validation.password_min')),
  })
  .refine((data) => data.password.length > 0, {
    message: i18next.t('auth.validation.password_required'),
    path: ['password'],
  })
  .refine((data) => data.confirmPassword.length > 0, {
    message: i18next.t('auth.validation.confirm_required'),
    path: ['confirmPassword'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18next.t('auth.validation.passwords_mismatch'),
    path: ['confirmPassword'],
  })

export type AuthLoginFormData = z.infer<typeof authLoginSchema>
export type AuthRegisterFormData = z.infer<typeof authRegisterSchema>
export type AuthRequestPasswordResetFormData = z.infer<typeof authRequestPasswordResetSchema>
export type AuthResetPasswordFormData = z.infer<typeof authResetPasswordSchema>
