import { ComponentProps, useState } from 'react'
import { reatomComponent } from '@reatom/react'

import { useTranslate } from '@/shared/libraries/i18n'

import { floatingPasswordInputVariants } from './floating-password-input.variants'

export interface FloatingPasswordInputProps extends ComponentProps<'input'> {
  label: string
  error?: string
}

export const FloatingPasswordInput = reatomComponent<FloatingPasswordInputProps>((props) => {
  const { t } = useTranslate()
  const { label, error, id, value, onFocus, onBlur, className, ...inputProps } = props
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const floating = focused || (typeof value === 'string' && value.length > 0)
  const styles = floatingPasswordInputVariants({ floating, error: Boolean(error), focused })

  return (
    <div className={styles.root()}>
      <label htmlFor={id} className={styles.label()}>
        {label}
      </label>

      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        placeholder=''
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={styles.input({ className })}
        {...inputProps}
      />

      {typeof value === 'string' && value.length > 0 && (
        <button
          type='button'
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? t('common.password_hide') : t('common.password_show')}
          className={styles.toggleButton()}
        >
          {visible ? (
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              aria-hidden='true'
            >
              <path d='M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19' />
              <line x1='1' y1='1' x2='23' y2='23' />
            </svg>
          ) : (
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              aria-hidden='true'
            >
              <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
              <circle cx='12' cy='12' r='3' />
            </svg>
          )}
        </button>
      )}

      {error && (
        <p id={`${id}-error`} role='alert' className={styles.error()}>
          {error}
        </p>
      )}
    </div>
  )
}, 'FloatingPasswordInput')
