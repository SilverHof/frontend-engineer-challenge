import { tv } from 'tailwind-variants'

export const authResetPasswordFormVariants = tv({
  slots: {
    root: 'flex flex-col gap-8',
    header: '',
    title: 'mb-2 text-[26px] font-bold text-[#1E2027]',
    description: 'text-sm text-[#6B7280]',
    form: 'flex flex-col gap-2',
    submitButton: 'mt-6 rounded-[8px] bg-[#31A0F0]',
  },
})

