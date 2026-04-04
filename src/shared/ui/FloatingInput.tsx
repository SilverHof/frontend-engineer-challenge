import { useState, type InputHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FloatingInput({ label, error, id, value, onFocus, onBlur, className, ...props }: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const floating = focused || (typeof value === 'string' && value.length > 0)

  return (
    <div className="relative pt-4 pb-1">
      <label
        htmlFor={id}
        className={cn(
          'absolute left-0 pointer-events-none select-none transition-all duration-150',
          floating ? 'top-0 text-[11px]' : 'top-[18px] text-sm',
          error ? 'text-[#D23939]' : focused ? 'text-[#31A0F0]' : 'text-[#9CA3AF]',
        )}
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        placeholder=""
        onFocus={(e) => { setFocused(true); onFocus?.(e) }}
        onBlur={(e) => { setFocused(false); onBlur?.(e) }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full bg-transparent border-0 border-b pb-2 text-sm text-[#1E2027] outline-none',
          'transition-colors duration-150',
          error ? 'border-[#D23939]' : focused ? 'border-[#31A0F0]' : 'border-[#E5E7EB]',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-[#D23939]">
          {error}
        </p>
      )}
    </div>
  )
}
