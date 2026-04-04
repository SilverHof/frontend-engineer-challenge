export const parseNumber = (value?: string, defaultValue = 1) => {
  const num = Number(value)
  return isNaN(num) ? defaultValue : num
}
