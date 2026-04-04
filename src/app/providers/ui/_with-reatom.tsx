import { connectLogger, context } from '@reatom/core'
import { reatomContext } from '@reatom/react'

import { ChildrenReactNode } from '@/shared/@types'

const rootFrame = context.start()

if (import.meta.env.DEV) {
  rootFrame.run(connectLogger)
}

export const WithReatom = ({ children }: ChildrenReactNode) => (
  <reatomContext.Provider value={rootFrame}>{children}</reatomContext.Provider>
)
