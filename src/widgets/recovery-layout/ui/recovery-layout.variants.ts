import { tv } from 'tailwind-variants'

export const recoveryLayoutVariants = tv({
  slots: {
    root: 'flex min-h-screen items-center justify-center bg-[#F5F6FA] p-4',
    card: 'w-full max-w-[440px] rounded-2xl bg-white px-10 py-10 shadow-sm',
    header: 'mb-6',
  },
})
