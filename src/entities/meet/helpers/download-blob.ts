/**
 * Создает blob из данных и инициирует скачивание файла
 * @param data - данные для скачивания
 * @param filename - имя файла с расширением
 */
export const downloadBlob = (data: BlobPart, filename: string) => {
  const blob = new Blob([data])

  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()

  URL.revokeObjectURL(url)
}
