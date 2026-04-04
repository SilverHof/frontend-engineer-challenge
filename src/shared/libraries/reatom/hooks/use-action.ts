import { useEffect, useInsertionEffect, useLayoutEffect, useMemo } from 'react'

import { action, bind, isAction, isAtom, ReatomError } from '@reatom/core'
import { _getComponentDebugName, useFrame } from '@reatom/react'

export const useAction = <Params extends any[] = any[], Payload = any>(
  target: (...params: Params) => Payload,
  deps: Array<any> = [],
  name?: string
): ((...params: Params) => Payload) => {
  const frame = useFrame()
  deps.push(frame)
  if (isAction(target)) deps.push(target)
  else if (isAtom(target)) {
    throw new ReatomError('useAction expects an action, got an atom')
  }

  const ref = useMemo(() => {
    let theAction = target

    if (!isAction(target)) {
      theAction = action(
        // @ts-ignore
        (...a: any[]) => ref.target(...a),
        name ?? _getComponentDebugName(`useAction`)
      )
    }

    return { target, cb: bind(theAction, frame) }
  }, deps)

  if (!isAction(target)) {
    ;(useInsertionEffect ?? (typeof document !== 'undefined' ? useLayoutEffect : useEffect))(() => {
      ref!.target = target
    })
  }

  return ref.cb
}
