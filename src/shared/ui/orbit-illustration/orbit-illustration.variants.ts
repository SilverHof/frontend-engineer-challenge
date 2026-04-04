import { tv } from 'tailwind-variants'

export const orbitIllustrationVariants = tv({
  slots: {
    root: 'relative w-full h-full flex items-center justify-center overflow-hidden',
    orbit: 'relative rounded-full',
    sphereLarge: 'absolute',
    sphereMedium: 'absolute',
  },
})
