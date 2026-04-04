import { tv } from 'tailwind-variants'

export const meetEditFormStyles = tv({
  slots: {
    form: 'flex flex-col gap-y-6 max-w-172',
    buttonsContainer: 'flex gap-x-4 pt-4',
    cancelButton: 'font-semibold text-default-500',
    submitButton: 'font-semibold',
    submitButtonText: 'text-white',
  },
})
