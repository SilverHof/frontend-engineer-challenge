import { tv } from 'tailwind-variants'

export const alertVariants = tv({
  base: 'rounded-xl border px-4 py-3 text-sm',
  variants: {
    variant: {
      error: 'border-red-500/30 bg-red-500/10 text-red-400',
      success: 'border-green-500/30 bg-green-500/10 text-green-400',
    },
  },
})
