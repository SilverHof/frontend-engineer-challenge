import { RouteAtom } from "@reatom/core"
import { ReactNode } from "react"

export type AppRouterItem = {
  route: RouteAtom
  element: ReactNode
}