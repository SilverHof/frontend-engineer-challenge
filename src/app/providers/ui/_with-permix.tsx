import { PermixProvider } from 'permix/react'

import type { ChildrenReactNode } from '@/shared/@types'
import { permixInstance } from '@/shared/libraries/permix'

export const WithPermix = ({ children }: ChildrenReactNode) => (
  <PermixProvider permix={permixInstance}>{children}</PermixProvider>
)
