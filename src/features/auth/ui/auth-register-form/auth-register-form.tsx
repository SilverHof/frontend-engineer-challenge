import { SubmitEvent } from 'react'
import { atom } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button, Input } from '@heroui/react'

import { useTranslate } from '@/shared/libraries/i18n'
import { bindFieldController } from '@/shared/libraries/reatom'

import { authRegisterForm } from '../../model/auth-register.form'

const isVisiblePasswordsAtom = atom({
  password: false,
  confirmPassword: false,
})

export const AuthRegisterForm = reatomComponent(() => {
  const i18n = useTranslate()

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    authRegisterForm.submit()
  }

  const toggleVisibleFirstPassword = () => {
    isVisiblePasswordsAtom.set({ ...isVisiblePasswordsAtom(), password: !isVisiblePasswordsAtom().password })
  }

  const toggleVisibleSecondPassword = () => {
    isVisiblePasswordsAtom.set({
      ...isVisiblePasswordsAtom(),
      confirmPassword: !isVisiblePasswordsAtom().confirmPassword,
    })
  }

  const PasswordIcon = isVisiblePasswordsAtom().password ? EyeOffIcon : EyeIcon
  const ConfirmPasswordIcon = isVisiblePasswordsAtom().confirmPassword ? EyeOffIcon : EyeIcon

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      <Input
        type='email'
        label={i18n.t('auth.register.email_label')}
        variant='underlined'
        autoComplete='new-password'
        isDisabled={!authRegisterForm.submit.ready()}
        {...bindFieldController(authRegisterForm.fields.email)}
      />

      <Input
        label={i18n.t('auth.register.password_label')}
        variant='underlined'
        type={isVisiblePasswordsAtom().password ? 'text' : 'password'}
        endContent={<PasswordIcon className='cursor-pointer' onClick={toggleVisibleFirstPassword} />}
        autoComplete='new-password'
        isDisabled={!authRegisterForm.submit.ready()}
        {...bindFieldController(authRegisterForm.fields.password)}
      />

      <Input
        type={isVisiblePasswordsAtom().confirmPassword ? 'text' : 'password'}
        endContent={<ConfirmPasswordIcon className='cursor-pointer' onClick={toggleVisibleSecondPassword} />}
        label={i18n.t('auth.register.confirm_password_label')}
        variant='underlined'
        color='primary'
        isDisabled={!authRegisterForm.submit.ready()}
        {...bindFieldController(authRegisterForm.fields.confirmPassword)}
      />

      <Button
        type='submit'
        variant='solid'
        color='primary'
        isDisabled={!authRegisterForm.submit.ready()}
        isLoading={!authRegisterForm.submit.ready()}
        className='mt-6 rounded-[8px] bg-[#31A0F0]'
      >
        {i18n.t('auth.register.submit')}
      </Button>

      <p className='mt-3 text-center text-xs text-[#9CA3AF]'>
        {i18n.t('auth.register.legal_prefix')}{' '}
        <span className='cursor-pointer underline'>{i18n.t('auth.register.legal_offer')}</span>{' '}
        {i18n.t('auth.register.legal_and')}{' '}
        <span className='cursor-pointer underline'>{i18n.t('auth.register.legal_privacy')}</span>
      </p>
    </form>
  )
}, 'AuthRegisterForm')
