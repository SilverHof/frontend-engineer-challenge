import { saveAs } from 'file-saver'

const FILE_MIME_TYPES: Record<string, string> = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  json: 'application/json;charset=utf-8',
  md: 'text/markdown;charset=utf-8',
  txt: 'text/plain;charset=utf-8',
}

const getFileMimeType = (extension: string) => FILE_MIME_TYPES[extension] || 'application/octet-stream'

const arrayBufferViewToBlob = (result: ArrayBufferView, extension: string) => {
  const bytes = new Uint8Array(result.byteLength)

  bytes.set(new Uint8Array(result.buffer, result.byteOffset, result.byteLength))

  return new Blob([bytes.buffer], { type: getFileMimeType(extension) })
}

const toBlob = (result: unknown, extension: string): Blob | null => {
  if (!result) return null

  if (result instanceof Blob) return result

  if (result instanceof ArrayBuffer) {
    return new Blob([result], { type: getFileMimeType(extension) })
  }

  if (ArrayBuffer.isView(result)) {
    return arrayBufferViewToBlob(result, extension)
  }

  if (typeof result === 'string') {
    return new Blob([result], { type: getFileMimeType(extension) })
  }

  if (typeof result === 'object' && 'data' in result) {
    return toBlob(result.data, extension)
  }

  if (typeof result === 'object') {
    return new Blob([JSON.stringify(result, null, 2)], { type: getFileMimeType('json') })
  }

  return new Blob([String(result)], { type: getFileMimeType(extension) })
}

export const fileSave = (result: unknown, filename: string, extension: string) => {
  const blob = toBlob(result, extension)

  if (!blob) return

  saveAs(blob, `${filename}.${extension}`)
}
