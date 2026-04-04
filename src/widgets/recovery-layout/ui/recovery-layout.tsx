import { type ReactNode } from 'react'
import { reatomComponent } from '@reatom/react'

import { Logo } from '@/shared/ui/logo'

import { recoveryLayoutVariants } from './recovery-layout.variants'

export interface RecoveryLayoutProps {
  children: ReactNode
}

export const RecoveryLayout = reatomComponent<RecoveryLayoutProps>((props) => {
  const styles = recoveryLayoutVariants()

  return (
    <div className={styles.root()}>
      <div className={styles.card()}>
        <div className={styles.header()}>
          <Logo />
        </div>
        {props.children}
      </div>
    </div>
  )
}, 'RecoveryLayout')
