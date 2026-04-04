import { type ReactNode } from 'react'
import { reatomComponent } from '@reatom/react'

import { Logo, OrbitIllustration } from '@/shared/ui'

import { authLayoutVariants } from './auth-layout.variants'

export interface AuthLayoutProps {
  children: ReactNode
  footer?: ReactNode
}

export const AuthLayout = reatomComponent<AuthLayoutProps>((props) => {
  const { children, footer } = props
  const styles = authLayoutVariants()

  return (
    <div className={styles.root()}>
      <div className={styles.leftPanel()}>
        <div className={styles.header()}>
          <Logo />
        </div>

        <div className={styles.main()}>
          <div className={styles.mainInner()}>{children}</div>
        </div>

        {footer && <div className={styles.footer()}>{footer}</div>}
      </div>

      <div className={styles.rightPanel()}>
        <OrbitIllustration />
      </div>
    </div>
  )
}, 'AuthLayout')
