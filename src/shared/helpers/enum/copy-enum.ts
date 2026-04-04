export const copyEnum = <TEnum extends Record<string, string>>(enumeration: TEnum): TEnum => {
  return JSON.parse(JSON.stringify(enumeration))
}
