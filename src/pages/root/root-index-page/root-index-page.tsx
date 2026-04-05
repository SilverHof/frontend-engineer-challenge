import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'

export const RootIndexPage = () => {
  const i18n = useTranslate()
  return (
    <div className='flex min-h-screen flex-col gap-4 p-8'>
      <h1 className='text-2xl font-bold'>{i18n.t('root.title')}</h1>
      <p className='text-sm text-[#6B7280]'>{i18n.t('root.description')}</p>
      <p className='text-sm text-[#1E2027]'>{i18n.t('root.index_placeholder')}</p>
      <a href={ROUTES.ROOT.DASHBOARD.path()} className='text-sm font-medium text-[#31A0F0] hover:underline'>
        {i18n.t('dashboard.title')}
      </a>
    </div>
  )
}
