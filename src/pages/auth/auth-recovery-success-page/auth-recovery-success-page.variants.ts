import { tv } from 'tailwind-variants'

export const authRecoverySuccessPageVariants = tv({
  slots: {
    root: 'flex flex-col items-center gap-6',
    title: 'w-full mb-3 text-[26px] font-bold text-[#1E2027]',
    description: 'text-sm leading-relaxed text-[#6B7280]',
    link: 'block w-full rounded  bg-[#31A0F01A] px-4 py-2.5 text-center text-sm font-medium text-[#4B96E8] transition-colors hover:bg-blue-50',
  },
})
