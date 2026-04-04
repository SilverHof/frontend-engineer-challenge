import { ElementType, ReactNode } from 'react'

export type Nullable<Type> = Type | null

export type Undefinable<Type> = Type | undefined

export type TFunction = (str: string) => string

export type ReadonlyChildren = Readonly<{
  children: ReactNode
}>

export type ChildrenReactNode = { children: ReactNode }

export type WithClassNameProps<Type = unknown> = Type & {
  className?: string
}

export type WithChildrenProps<Type = unknown> = Type & {
  children?: ReactNode
}

export type BaseProps<Type = unknown> = Type & {
  className?: string
  children?: ReactNode
}

export type As<Props = any> = ElementType<Props>

