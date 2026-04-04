import { type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

interface AlertProps {
  variant: 'error' | 'success'
  children: ReactNode
}

export function Alert({ variant, children }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-xl border px-4 py-3 text-sm',
        variant === 'error' && 'border-red-500/30 bg-red-500/10 text-red-400',
        variant === 'success' && 'border-green-500/30 bg-green-500/10 text-green-400',
      )}
    >
      {children}
    </div>
  )
}
