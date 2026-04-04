import { ComponentProps, useState } from 'react'
import { reatomComponent } from '@reatom/react'

import { floatingInputVariants } from './floating-input.variants'

export interface FloatingInputProps extends ComponentProps<'input'> {
  label: string
  error?: string
}

export const FloatingInput = reatomComponent<FloatingInputProps>((props) => {
  const { label, error, id, value, onFocus, onBlur, className, ...inputProps } = props
  const [focused, setFocused] = useState(false)
  const floating = focused || (typeof value === 'string' && value.length > 0)
  const styles = floatingInputVariants({ floating, error: Boolean(error), focused })

  return (
    <div className={styles.root()}>
      <label htmlFor={id} className={styles.label()}>
        {label}
      </label>
      <input
        id={id}
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
      {error && (
        <p id={`${id}-error`} role='alert' className={styles.error()}>
          {error}
        </p>
      )}
    </div>
  )
}, 'FloatingInput')
