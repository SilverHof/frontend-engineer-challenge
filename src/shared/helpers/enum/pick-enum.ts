export const pickEnum = <TEnum extends Record<string, string>, TKeys extends keyof TEnum>(
  enumeration: TEnum,
  includeKeys: TKeys[]
): Pick<TEnum, TKeys> => {
  const pickedEnum: Partial<TEnum> = {}

  for (const key of includeKeys) {
    pickedEnum[key] = enumeration[key]
  }

  return pickedEnum as Pick<TEnum, TKeys>
}
