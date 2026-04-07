import { type ReactNode } from 'react'
import { reatomComponent } from '@reatom/react'

import { recoveryLayoutVariants } from './recovery-layout.variants'

export interface RecoveryLayoutProps {
  children: ReactNode
}

export const RecoveryLayout = reatomComponent<RecoveryLayoutProps>((props) => {
  const styles = recoveryLayoutVariants()

  return (
    <div className={styles.root()}>
      <div className={styles.card()}>{props.children}</div>
    </div>
  )
}, 'RecoveryLayout')
