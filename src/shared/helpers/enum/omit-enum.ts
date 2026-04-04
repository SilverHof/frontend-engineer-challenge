export const omitEnum = <TEnum extends Record<string, string>>(
  enumeration: TEnum,
  excludeKeys: (keyof TEnum)[]
): Partial<TEnum> => {
  const omittedEnum: Partial<TEnum> = {}

  for (const key in enumeration) {
    if (!excludeKeys.includes(key as keyof TEnum)) {
      omittedEnum[key] = enumeration[key]
    }
  }

  return omittedEnum
}
