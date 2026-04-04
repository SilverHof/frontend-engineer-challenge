import { tv } from 'tailwind-variants'

export const meetSummaryResultStyles = tv({
  slots: {
    container: 'flex flex-col gap-y-4',
    header: 'flex items-center justify-between',
    title: 'text-2xl font-semibold mt-2.5',
  },
})
