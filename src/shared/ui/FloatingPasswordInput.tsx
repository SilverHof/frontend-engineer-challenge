import { useState, type InputHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

interface FloatingPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
}

export function FloatingPasswordInput({
  label, error, id, value, onFocus, onBlur, className, ...props
}: FloatingPasswordInputProps) {
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
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
        type={visible ? 'text' : 'password'}
        value={value}
        placeholder=""
        onFocus={(e) => { setFocused(true); onFocus?.(e) }}
        onBlur={(e) => { setFocused(false); onBlur?.(e) }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full bg-transparent border-0 border-b pb-2 pr-7 text-sm text-[#1E2027] outline-none',
          'transition-colors duration-150',
          error ? 'border-[#D23939]' : focused ? 'border-[#31A0F0]' : 'border-[#E5E7EB]',
          className,
        )}
        {...props}
      />

      {(typeof value === 'string' && value.length > 0) && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'}
          className="absolute right-0 bottom-2.5 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
        >
          {visible ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-[#D23939]">
          {error}
        </p>
      )}
    </div>
  )
}
