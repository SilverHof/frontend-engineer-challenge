import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: 'flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31A0F0] focus-visible:ring-offset-2 disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary: 'bg-[#31A0F0] text-white hover:bg-[#2890d8] active:bg-[#2080c8]',
      secondary: 'bg-[#31A0F01A] text-[#31A0F0] hover:bg-[#31A0F030]',
      ghost: 'w-auto text-[#31A0F0] hover:text-[#2890d8]',
    },
    loading: {
      true: 'pointer-events-none cursor-wait opacity-75 saturate-75',
      false: '',
    },
  },
  compoundVariants: [
    {
      loading: false,
      class: 'disabled:opacity-50',
    },
    {
      variant: 'primary',
      loading: false,
      class:
        'disabled:bg-[#31A0F0]/50 disabled:text-white/90 disabled:hover:bg-[#31A0F0]/50 disabled:active:bg-[#31A0F0]/50',
    },
    {
      variant: 'secondary',
      loading: false,
      class: 'disabled:bg-[#31A0F008] disabled:text-[#31A0F0]/45 disabled:hover:bg-[#31A0F008]',
    },
    {
      variant: 'ghost',
      loading: false,
      class: 'disabled:text-[#31A0F0]/35 disabled:hover:text-[#31A0F0]/35',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    loading: false,
  },
})
