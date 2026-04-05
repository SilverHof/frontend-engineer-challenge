import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'

import { notFoundPageVariants } from './not-found-page.variants'

export const NotFoundPage = () => {
  const { t } = useTranslate()
  const styles = notFoundPageVariants()

  return (
    <div className={styles.root()}>
      <h1 className={styles.title()}>{t('not_found.title')}</h1>
      <p className={styles.description()}>{t('not_found.description')}</p>
      <a href={ROUTES.ROOT.INDEX.path()} className={styles.link()}>
        {t('not_found.to_home')}
      </a>
    </div>
  )
}
