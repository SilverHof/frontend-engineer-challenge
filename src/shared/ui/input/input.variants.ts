import { tv } from 'tailwind-variants'

export const inputVariants = tv({
  base: 'w-full rounded-xl border bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-0',
  variants: {
    error: {
      true: 'border-red-500 focus:ring-red-500',
      false: 'border-zinc-700 hover:border-zinc-600',
    },
  },
  defaultVariants: {
    error: false,
  },
})
