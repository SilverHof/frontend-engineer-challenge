import { Action } from '@reatom/core'
import { AxiosError } from 'axios'

export type ActionError<T = unknown, D = any> = Action<
  [error: AxiosError<T, D>, params: []],
  { error: AxiosError<T, D>; params: [] }
>
