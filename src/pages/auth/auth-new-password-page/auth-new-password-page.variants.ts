import { tv } from 'tailwind-variants'

export const authNewPasswordPageVariants = tv({
  slots: {
    feedbackRoot: 'flex flex-col items-center gap-6 text-center',
    feedbackTitle: 'mb-3 text-[26px] font-bold text-[#1E2027]',
    feedbackDescription: 'text-sm leading-relaxed text-[#6B7280]',
    feedbackButton: 'max-w-xs',
    retryLink: 'text-sm text-[#31A0F0] hover:underline',
  },
})
