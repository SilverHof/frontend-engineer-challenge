import { useMemo, useSyncExternalStore } from 'react'

import { atom, Atom, AtomLike, AtomState, bind, computed, Computed, Frame, isAtom, notify } from '@reatom/core'
import { _getComponentDebugName, useFrame } from '@reatom/react'

export const useAtom: {
  <Target extends AtomLike>(
    target: Target,
    deps?: Array<any>,
    options?: { subscribe?: boolean }
  ): [
    AtomState<Target>,
    Target extends Atom<any, infer Params> ? (...args: Params) => AtomState<Target> : undefined,
    Target,
    Frame,
  ]

  <State>(
    computed: () => State,
    deps?: Array<any>,
    options?: string | { name?: string; subscribe?: boolean }
  ): [State, undefined, Computed<State>, Frame]

  <State>(
    initState: State,
    deps?: Array<any>,
    options?: string | { name?: string; subscribe?: boolean }
  ): [State, (value: State | ((prev: State) => State)) => State, Atom<State>, Frame]
} = (anAtom: any, userDeps: Array<any> = [], options: string | { name?: string; subscribe?: boolean } = '') => {
  const { name, subscribe = true } = typeof options === 'string' ? { name: options } : (options ?? {})
  const frame = useFrame()
  const deps: any[] = [frame]
  if (isAtom(anAtom)) deps.push(anAtom)

  const ref = useMemo(() => {
    const atomName = name ?? _getComponentDebugName(`useAtom#${typeof anAtom}`)
    const depsAtom = atom<any[]>([], `${atomName}._depsAtom`)
    let theAtom = anAtom
    if (!isAtom(theAtom)) {
      if (typeof anAtom === 'function') {
        theAtom = computed(() => {
          depsAtom()
          return ref.anAtom()
        }, atomName)
      } else {
        theAtom = atom(anAtom, atomName)
      }
    }

    const update =
      'set' in theAtom
        ? bind((...a: any[]) => {
            theAtom.set(...a)
            notify()
          }, frame)
        : undefined

    return {
      anAtom,
      depsAtom,
      theAtom,
      update,
      sub: bind((theAtom as AtomLike).subscribe, frame),
      get: bind(theAtom, frame),
    }
  }, deps)
  ref.anAtom = anAtom
  const { theAtom, depsAtom, update, sub, get } = ref

  if (!isAtom(anAtom)) {
    const prevDeps = frame.run(depsAtom)
    if (userDeps.length !== prevDeps.length || userDeps.some((dep, i) => !Object.is(dep, prevDeps[i]))) {
      if (theAtom.set) {
        update?.(theAtom)
      } else {
        frame.run(depsAtom.set, userDeps)
      }
    }
  }

  return [subscribe ? useSyncExternalStore(sub, get, get) : get(), update, theAtom, frame] as any
}
