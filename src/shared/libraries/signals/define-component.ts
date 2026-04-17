import React, { useLayoutEffect, useEffect, useRef, useSyncExternalStore } from 'react'

import { computed as alienComputed, signal as alienSignal, effect, effectScope } from 'alien-signals'

const REF_BRAND = Symbol('alien-ref')

export type Ref<T> = {
  readonly [REF_BRAND]: true
  get value(): T
  set value(next: T)
}

export type ComputedRef<T> = {
  readonly [REF_BRAND]: true
  readonly value: T
}

type AnyRef<T = unknown> = Ref<T> | ComputedRef<T>

type UnwrapRefs<T> = {
  [K in keyof T]: T[K] extends Ref<infer V> ? V : T[K] extends ComputedRef<infer V> ? V : T[K]
}

type SetupContext = {
  onUnmounted(cb: () => void): void
}

function isRef(value: unknown): value is AnyRef {
  return Boolean(value && typeof value === 'object' && REF_BRAND in (value as object))
}

export function ref<T>(initial: T): Ref<T> {
  const s = alienSignal(initial)

  return {
    [REF_BRAND]: true as const,
    get value() {
      return s()
    },
    set value(next: T) {
      s(next)
    },
  }
}

export function computed<T>(getter: () => T): ComputedRef<T> {
  const c = alienComputed(getter)

  return {
    [REF_BRAND]: true as const,
    get value() {
      return c()
    },
  }
}

function createEmitter() {
  const listeners = new Set<() => void>()

  return {
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    emit() {
      for (const listener of listeners) {
        listener()
      }
    },
    clear() {
      listeners.clear()
    },
  }
}

function createPropsProxy<Props extends object>(getProps: () => Props): Props {
  return new Proxy({} as Props, {
    get(_, key) {
      return getProps()[key as keyof Props]
    },
    has(_, key) {
      return key in getProps()
    },
    ownKeys() {
      return Reflect.ownKeys(getProps())
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true,
      }
    },
  })
}

function createRenderProxy<T extends Record<string, unknown>>(state: T): UnwrapRefs<T> {
  return new Proxy(state, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)

      if (isRef(value)) {
        return value.value
      }

      if (typeof value === 'function') {
        return value.bind(target)
      }

      return value
    },
  }) as UnwrapRefs<T>
}

function createInstance<Props extends object, State extends Record<string, unknown>>(
  initialProps: Props,
  setup: (props: Props, ctx: SetupContext) => State,
  render: (state: UnwrapRefs<State>, props: Props) => React.ReactNode
) {
  const emitter = createEmitter()
  const cleanups: Array<() => void> = []
  const propsSignal = alienSignal(initialProps)

  let snapshot: React.ReactNode = null

  const stopScope = effectScope(() => {
    const setupState = setup(
      createPropsProxy(() => propsSignal()),
      {
        onUnmounted(cb) {
          cleanups.push(cb)
        },
      }
    )

    const renderState = createRenderProxy(setupState)

    const view = alienComputed(() => {
      return render(renderState, propsSignal())
    })

    effect(() => {
      snapshot = view()
      emitter.emit()
    })
  })

  return {
    setProps(nextProps: Props) {
      propsSignal(nextProps)
    },
    getSnapshot() {
      return snapshot
    },
    subscribe(listener: () => void) {
      return emitter.subscribe(listener)
    },
    dispose() {
      for (const cleanup of cleanups.splice(0)) {
        cleanup()
      }
      stopScope()
      emitter.clear()
    },
  }
}

function shallowEqualObject(a: object, b: object): boolean {
  if (a === b) {
    return true
  }
  const keysA = Reflect.ownKeys(a)
  const keysB = Reflect.ownKeys(b)
  if (keysA.length !== keysB.length) {
    return false
  }
  for (const k of keysA) {
    if (!Object.is(Reflect.get(a, k as string | symbol), Reflect.get(b, k as string | symbol))) {
      return false
    }
  }
  return true
}

/**
 * Компонент в духе Vue 3:
 *
 * - **`setup` вызывается ровно один раз** на жизненный цикл инстанса — внутри
 *   `effectScope` при первом `createInstance` (не на каждый ререндер React).
 * - **`props` в `setup`** — прокси к `propsSignal()`: при чтении полей подставляются
 *   актуальные пропсы без повторного вызова `setup`.
 * - **Синхронизация пропсов из React** — `useLayoutEffect`; если объект пропсов новый,
 *   но поля те же (shallow), в сигнал пишется только при реальном изменении значений.
 * - **Размонтирование** — `useEffect` cleanup: `dispose` + сброс `instanceRef` (Strict Mode).
 */
export function defineComponent<Props extends object, State extends Record<string, unknown>>(
  setup: (props: Props, ctx: SetupContext) => State,
  render: (state: UnwrapRefs<State>, props: Props) => React.ReactNode
) {
  function WrappedComponent(props: Props) {
    const instanceRef = useRef<ReturnType<typeof createInstance<Props, State>> | null>(null)
    const lastSyncedPropsRef = useRef<Props | null>(null)

    if (!instanceRef.current) {
      instanceRef.current = createInstance(props, setup, render)
    }

    const instance = instanceRef.current

    useLayoutEffect(() => {
      const prev = lastSyncedPropsRef.current
      if (prev !== null && shallowEqualObject(prev as object, props as object)) {
        return
      }
      lastSyncedPropsRef.current = props
      instance.setProps(props)
    }, [instance, props])

    useEffect(() => {
      return () => {
        instance.dispose()
        instanceRef.current = null
      }
    }, [instance])

    return useSyncExternalStore(instance.subscribe, instance.getSnapshot, instance.getSnapshot)
  }

  WrappedComponent.displayName = 'AlienSetupComponent'

  return WrappedComponent
}

