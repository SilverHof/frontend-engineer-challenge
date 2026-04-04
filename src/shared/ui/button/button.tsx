import { ComponentProps } from 'react'
import { reatomComponent } from '@reatom/react'

import { buttonVariants } from './button.variants'

export interface ButtonProps extends ComponentProps<'button'> {
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
}

export const Button = reatomComponent<ButtonProps>((props) => {
  const { loading, variant = 'primary', className, children, disabled, ...buttonProps } = props
  return (
    <button
      className={buttonVariants({ variant, loading: !!loading, className })}
      disabled={disabled ?? loading}
      aria-busy={loading}
      {...buttonProps}
    >
      {children}
    </button>
  )
}, 'Button')
