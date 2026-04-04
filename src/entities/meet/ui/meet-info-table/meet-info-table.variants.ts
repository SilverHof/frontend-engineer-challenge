import { tv } from 'tailwind-variants'

export const meetInfoTableVariants = tv({
  slots: {
    card: 'bg-default-100 max-w-[600px] rounded-lg',
    container: 'flex flex-col px-2 py-2',
    row: 'flex h-9 items-center rounded-xl px-2',
    rowHighlighted: 'bg-secondary-200 flex h-9 items-center rounded-xl px-2',
    rowLabel: 'text-default-foreground flex w-1/3 justify-start text-sm font-medium',
    rowValue: 'text-default-900 w-2/3 text-[13px]',
    link: 'text-primary-500 block truncate text-sm',
  },
})
