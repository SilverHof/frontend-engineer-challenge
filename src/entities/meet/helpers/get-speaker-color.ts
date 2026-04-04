/**
 * Функция для генерации цвета на основе имени спикера
 * @param speaker - имя спикера
 * @returns CSS класс цвета текста
 */
export const getSpeakerColor = (speaker: string): string => {
  const colors = [
    'text-primary',
    'text-pink',
    'text-blue-600',
    'text-green-600',
    'text-purple-600',
    'text-teal-600',
    'text-indigo-600',
    'text-rose-600',
  ]

  // Простой хеш на ос��ове строки
  let hash = 0
  for (let i = 0; i < speaker.length; i++) {
    hash = speaker.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash) % colors.length
  return colors[index]
}
