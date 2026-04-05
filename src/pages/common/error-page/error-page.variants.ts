import { tv } from 'tailwind-variants'

export const errorPageVariants = tv({
  slots: {
    root: 'flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F5F6FA] p-8 text-center',
    title: 'text-2xl font-bold text-[#1E2027]',
    description: 'max-w-md text-sm text-[#6B7280]',
    link: 'text-sm font-medium text-[#31A0F0] hover:underline',
  },
})
