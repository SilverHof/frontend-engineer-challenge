import { ReactNode } from "react"

export type AppRouterItem = {
  route: { exact: () => boolean }
  element: ReactNode
}