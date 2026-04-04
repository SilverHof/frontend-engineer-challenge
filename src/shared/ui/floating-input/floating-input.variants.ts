import { tv } from 'tailwind-variants'

export const floatingInputVariants = tv({
  slots: {
    root: 'relative pt-4 pb-1',
    label: 'absolute left-0 pointer-events-none select-none transition-all duration-150',
    input:
      'w-full bg-transparent border-0 border-b pb-2 text-sm text-[#1E2027] outline-none transition-colors duration-150',
    error: 'mt-1 text-xs text-[#D23939]',
  },
  variants: {
    floating: {
      true: {
        label: 'top-0 text-[11px]',
      },
      false: {
        label: 'top-[18px] text-sm',
      },
    },
    error: {
      true: {
        label: 'text-[#D23939]',
        input: 'border-[#D23939]',
      },
      false: {},
    },
    focused: {
      true: {
        label: 'text-[#31A0F0]',
        input: 'border-[#31A0F0]',
      },
      false: {
        label: 'text-[#9CA3AF]',
        input: 'border-[#E5E7EB]',
      },
    },
  },
  compoundVariants: [
    {
      error: true,
      class: {
        label: 'text-[#D23939]',
      },
    },
  ],
})
