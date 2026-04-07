import { reatomComponent } from '@reatom/react'

import { RecoveryLayout } from '@/widgets/recovery-layout'

import { AuthResetPasswordForm } from '@/features/auth'

export const AuthRecoveryNewPasswordPage = reatomComponent(() => {
  return (
    <RecoveryLayout>
      <AuthResetPasswordForm />
    </RecoveryLayout>
  )
}, 'AuthRecoveryNewPasswordPage')
