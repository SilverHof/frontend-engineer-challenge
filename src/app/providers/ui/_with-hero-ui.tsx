import { HeroUIProvider } from '@heroui/react'

import type { ChildrenReactNode } from '@/shared/@types'

export const WithHeroUi = ({ children }: ChildrenReactNode) => <HeroUIProvider>{children}</HeroUIProvider>
