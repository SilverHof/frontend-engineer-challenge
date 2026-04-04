export const removeEmptyFilters = (filters: Record<string, unknown>) =>
  Object.keys(filters).reduce(
    (acc, key) => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        return { ...acc, [key]: filters[key] }
      }
      return acc
    },
    {} as Record<string, unknown>
  )
