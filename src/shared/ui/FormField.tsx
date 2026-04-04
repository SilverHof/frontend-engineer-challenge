import { type ReactNode, cloneElement, isValidElement } from 'react'

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined

  const childWithA11y = isValidElement<{ 'aria-describedby'?: string }>(children) && errorId
    ? cloneElement(children, { 'aria-describedby': errorId })
    : children

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      {childWithA11y}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
