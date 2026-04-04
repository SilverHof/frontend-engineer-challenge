export const serializeNumber = (value: number, defaultValue = 1) => {
  return value === defaultValue ? undefined : String(value)
}
