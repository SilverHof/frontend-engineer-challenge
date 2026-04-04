import { tv } from 'tailwind-variants'

export const meetEditServiceOptionsStyles = tv({
  slots: {
    container: 'grid grid-cols-2 gap-x-6',
    optionWrapper: 'flex flex-col gap-y-2',
    switchContainer: 'flex items-center gap-x-3',
    label: 'font-medium',
    labelDisabled: 'font-medium text-default-400',
    description: 'text-secondary-500 text-sm',
    price: 'bg-primary-100 text-primary-500 w-fit rounded-md px-2 py-1 text-xs',
    tooltipIcon: 'text-default-500 h-6 w-7 cursor-help',
  },
})
