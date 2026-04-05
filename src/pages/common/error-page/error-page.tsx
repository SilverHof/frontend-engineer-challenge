import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'

import { errorPageVariants } from './error-page.variants'

export const ErrorPage = () => {
  const { t } = useTranslate()
  const styles = errorPageVariants()

  return (
    <div className={styles.root()}>
      <h1 className={styles.title()}>{t('error_page.title')}</h1>
      <p className={styles.description()}>{t('error_page.description')}</p>
      <a href={ROUTES.ROOT.INDEX.path()} className={styles.link()}>
        {t('error_page.to_home')}
      </a>
    </div>
  )
}
