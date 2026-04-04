export const getIdFromIri = (iri: string) => {
  const segments = iri.split('/')
  return segments[segments.length - 1]
}
