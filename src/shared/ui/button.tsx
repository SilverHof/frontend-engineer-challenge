import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ loading, variant = 'primary', className, children, disabled, ...props }: ButtonProps) {
  const base = 'flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31A0F0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary: 'bg-[#31A0F0] text-white hover:bg-[#2890d8] active:bg-[#2080c8]',
    secondary: 'bg-[#31A0F01A] text-[#31A0F0] hover:bg-[#31A0F030]',
    ghost: 'text-[#31A0F0] hover:text-[#2890d8] w-auto',
  }

  return (
    <button
      className={cn(base, variants[variant], className)}
      disabled={disabled ?? loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
