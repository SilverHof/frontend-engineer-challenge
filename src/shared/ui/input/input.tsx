import { ComponentProps } from 'react'
import { reatomComponent } from '@reatom/react'

import { inputVariants } from './input.variants'

export interface InputProps extends ComponentProps<'input'> {
  error?: boolean
}

export const Input = reatomComponent<InputProps>((props) => {
  const { error, className, ref, ...inputProps } = props
  return (
    <input ref={ref} aria-invalid={error ?? false} className={inputVariants({ error, className })} {...inputProps} />
  )
}, 'Input')
