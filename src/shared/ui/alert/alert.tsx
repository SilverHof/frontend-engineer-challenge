import { type ReactNode } from 'react'
import { reatomComponent } from '@reatom/react'

import { alertVariants } from './alert.variants'

export interface AlertProps {
  variant: 'error' | 'success'
  children: ReactNode
}

export const Alert = reatomComponent<AlertProps>((props) => {
  const { variant, children } = props
  return (
    <div role='alert' className={alertVariants({ variant })}>
      {children}
    </div>
  )
}, 'Alert')
