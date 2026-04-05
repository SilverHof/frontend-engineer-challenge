import { tv } from 'tailwind-variants'

export const dashboardPageVariants = tv({
  slots: {
    root: 'flex min-h-screen flex-col gap-4 p-8',
    title: 'text-2xl font-bold',
    description: 'text-sm text-[#6B7280]',
    placeholder: 'text-sm text-[#1E2027]',
    link: 'text-sm font-medium text-[#31A0F0] hover:underline',
    actions: 'flex flex-wrap items-center gap-3',
    logoutButton: 'w-fit',
  },
})
