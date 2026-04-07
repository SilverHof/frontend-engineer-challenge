import { reatomComponent } from '@reatom/react'

import { RecoveryLayout } from '@/widgets/recovery-layout/ui/recovery-layout'

import { AuthRequestPasswordResetForm } from '@/features/auth'

export const AuthRecoveryPage = reatomComponent(() => {
  return (
    <RecoveryLayout>
      <AuthRequestPasswordResetForm />
    </RecoveryLayout>
  )
}, 'AuthRecoveryPage')
