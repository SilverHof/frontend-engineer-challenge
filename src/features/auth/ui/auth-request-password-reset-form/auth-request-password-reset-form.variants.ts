import { tv } from 'tailwind-variants'

export const authRequestPasswordResetFormVariants = tv({
  slots: {
    root: 'flex flex-col gap-8',
    header: '',
    titleRow: 'flex items-center gap-2',
    backButton:
      'mb-4 flex items-center gap-1.5 text-sm text-[#1E2027] transition-opacity hover:opacity-70',
    title: 'mb-2 text-[26px] font-bold text-[#1E2027]',
    description: 'text-sm text-[#6B7280]',
    form: 'flex flex-col gap-2',
    submitButton: 'mt-6 rounded-[8px] bg-[#31A0F0]',
  },
})

