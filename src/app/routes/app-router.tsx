import { urlAtom } from '@reatom/core'

import { useAtom } from '@/shared/libraries/reatom'

import { APP_ROUTER } from './app-router.constants'

export const AppRouter = () => {
  // Подписываемся на изменения URL для реактивного обновления
  const [url] = useAtom(urlAtom)

  // Используем computed через useAtom для проверки всех маршрутов
  // Это создает реактивную подписку на изменения каждого route.exact()
  const [matchedRouteIndex] = useAtom(
    () => {
      // Проверяем каждый маршрут в порядке приоритета
      for (let i = 0; i < APP_ROUTER.length; i++) {
        if (APP_ROUTER[i].route.exact()) {
          return i
        }
      }
      return -1
    },
    // Зависимости: все маршруты и URL
    [url.pathname, url.search, url.hash, ...APP_ROUTER.map((config) => config.route)]
  )

  // Если найден совпадающий маршрут, возвращаем соответствующий элемент
  if (matchedRouteIndex >= 0 && matchedRouteIndex < APP_ROUTER.length) {
    return APP_ROUTER[matchedRouteIndex].element
  }

  if (import.meta.env.DEV) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Route not found</h2>
        <div>
          Current path: <code>{url.pathname}</code>
        </div>
      </div>
    )
  }

  return null
}
