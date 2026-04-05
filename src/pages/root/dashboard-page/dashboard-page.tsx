import { reatomComponent } from '@reatom/react'

import { Button } from '@heroui/react'

import { logoutAction } from '@/features/auth'

import { ROUTES } from '@/entities/__routes__'

import {
  accessTokenAtom,
  expiresInAtom,
  refreshTokenAtom,
  tokenTypeAtom,
} from '@/shared/__api__/api-client/api-client.tokens'
import { useTranslate } from '@/shared/libraries/i18n'

import { dashboardPageVariants } from './dashboard-page.variants'

export const DashboardPage = reatomComponent(() => {
  const i18n = useTranslate()
  const styles = dashboardPageVariants()

  console.log('accessToken', accessTokenAtom())
  console.log('refreshToken', refreshTokenAtom())
  console.log('expiresIn', expiresInAtom())
  console.log('tokenType', tokenTypeAtom())

  return (
    <div className={styles.root()}>
      <h1 className={styles.title()}>{i18n.t('dashboard.title')}</h1>
      <p className={styles.description()}>{i18n.t('dashboard.description')}</p>
      <p className={styles.placeholder()}>{i18n.t('dashboard.placeholder')}</p>
      <div className={styles.actions()}>
        <Button
          type='button'
          color='danger'
          variant='flat'
          className={styles.logoutButton()}
          onPress={() => logoutAction()}
        >
          {i18n.t('dashboard.logout')}
        </Button>
        <a href={ROUTES.ROOT.INDEX.path()} className={styles.link()}>
          {i18n.t('root.title')}
        </a>
      </div>
    </div>
  )
}, 'DashboardPage')
