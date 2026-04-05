import { tv } from 'tailwind-variants'

export const authLayoutVariants = tv({
  slots: {
    root: 'flex min-h-screen bg-[#F5F6FA]',
    leftPanel: 'relative flex w-full flex-col bg-white lg:w-[42%]',
    header: 'px-10 pt-8 pb-4',
    main: 'flex flex-1 flex-col justify-center px-10 pb-8',
    mainInner: 'w-full self-center max-w-[400px]',
    footer:
      'border-t border-[#F3F4F6] px-10 py-5 text-center text-sm text-[#6B7280]',
    rightPanel:
      'hidden flex-1 bg-[linear-gradient(145deg,#EEF0F7_0%,#E8ECF5_100%)] lg:block',
  },
})
