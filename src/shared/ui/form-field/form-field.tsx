import { cloneElement, isValidElement, type ReactNode } from 'react'
import { reatomComponent } from '@reatom/react'

import { formFieldVariants } from './form-field.variants'

export interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}

export const FormField = reatomComponent<FormFieldProps>((props) => {
  const { label, htmlFor, error, children } = props
  const styles = formFieldVariants()
  const errorId = error ? `${htmlFor}-error` : undefined

  const childWithA11y =
    isValidElement<{ 'aria-describedby'?: string }>(children) && errorId
      ? cloneElement(children, { 'aria-describedby': errorId })
      : children

  return (
    <div className={styles.root()}>
      <label htmlFor={htmlFor} className={styles.label()}>
        {label}
      </label>
      {childWithA11y}
      {error && (
        <p id={errorId} role='alert' className={styles.error()}>
          {error}
        </p>
      )}
    </div>
  )
}, 'FormField')
