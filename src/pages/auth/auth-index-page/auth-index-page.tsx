import { ROUTES } from '@/entities/__routes__'

import { useTranslate } from '@/shared/libraries/i18n'

export const AuthIndexPage = () => {
  const i18n = useTranslate()

  return (
    <div className='flex min-h-screen flex-col gap-6 bg-[#F5F6FA] p-8'>
      <div>
        <h1 className='text-2xl font-bold text-[#1E2027]'>{i18n.t('auth.hub.title')}</h1>
        <p className='mt-2 text-sm text-[#6B7280]'>{i18n.t('auth.hub.description')}</p>
      </div>
      <ul className='flex flex-col gap-3 text-[#31A0F0]'>
        <li>
          <a href={ROUTES.AUTH.LOGIN.path()} className='font-medium hover:underline'>
            {i18n.t('auth.hub.login')}
          </a>
        </li>
        <li>
          <a href={ROUTES.AUTH.REGISTER.path()} className='font-medium hover:underline'>
            {i18n.t('auth.hub.register')}
          </a>
        </li>
      </ul>
    </div>
  )
}
