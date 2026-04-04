import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/shared/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={error ?? false}
        className={cn(
          'w-full rounded-xl border bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-0',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-zinc-700 hover:border-zinc-600',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
