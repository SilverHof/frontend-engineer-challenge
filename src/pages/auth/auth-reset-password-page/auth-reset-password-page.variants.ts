import { tv } from 'tailwind-variants'

export const authResetPasswordPageVariants = tv({
  slots: {
    successRoot: 'flex flex-col items-center gap-6 text-center',
    successTitle: 'mb-3 text-[26px] font-bold text-[#1E2027]',
    successDescription: 'text-sm leading-relaxed text-[#6B7280]',
    successButton: 'max-w-xs',
  },
})
