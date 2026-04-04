export const omitObjectProperty = <TData extends object, Keys extends keyof TData>(
  object: TData,
  keys: Keys[]
): Omit<TData, Keys> => {
  const result: Partial<TData> = {}

  for (const key in object) {
    if (!(keys as (keyof TData)[]).includes(key as keyof TData)) {
      result[key as keyof TData] = object[key as keyof TData]
    }
  }

  return result as Omit<TData, Keys>
}
