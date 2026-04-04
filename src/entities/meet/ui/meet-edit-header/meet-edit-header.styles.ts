import { tv } from 'tailwind-variants'

export const meetEditHeaderStyles = tv({
  slots: {
    container: 'flex items-center justify-between',
    title: 'text-[32px] font-bold',
    deleteButton: 'bg-danger-100 font-semibold',
    deleteButtonIcon: 'text-danger h-5 w-5',
    deleteButtonText: 'text-danger',
  },
})
