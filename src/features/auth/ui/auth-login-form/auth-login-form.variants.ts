import { tv } from "tailwind-variants";

export const authLoginFormVariants = tv({
  slots: {
    root: 'flex flex-col gap-2',
    forgotPassword: 'mt-3 text-center',
    forgotPasswordLink: 'text-sm text-[#31A0F0] hover:underline',
    errorMessage: 'mt-3 text-center',
    errorMessageText: 'text-sm text-red-500',
  },
})