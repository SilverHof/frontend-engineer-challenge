import { tv } from 'tailwind-variants'

export const meetShowHeaderVariants = tv({
  slots: {
    root: 'flex flex-col gap-8',
    backButton: 'h-6 bg-transparent! px-0! self-start',
    backButtonIcon: 'text-secondary-700 h-5 w-5',
    backButtonText: 'text-secondary-700',
    headerRow: 'flex items-center justify-between',
    titleGroup: 'flex items-center gap-x-2.5',
    title: 'text-[32px] font-bold',
    actionsGroup: 'flex items-center gap-x-2.5',
    actionButton: 'bg-default-300 text-default-500 font-semibold',
    actionButtonIcon: 'text-default-500 h-5 w-5',
    deleteButton: 'bg-danger-100 font-semibold',
    deleteButtonIcon: 'text-danger h-5 w-5',
    deleteButtonText: 'text-danger',
  },
})
