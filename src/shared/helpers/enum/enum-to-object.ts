export const enumToObject = <TEnum extends Record<string, string>>(
  enumeration: TEnum
): { [key in keyof TEnum]: string } => {
  const obj: { [key: string]: string } = {}

  Object.keys(enumeration).forEach((key) => {
    obj[key] = enumeration[key]
  })

  return obj as { [key in keyof TEnum]: string }
}
