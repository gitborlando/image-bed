export const getTypeFromUrl = (url: string) => {
  if (url.match(/\.(jpeg|jpg|gif|png|webp)$/)) return 'image'
  if (url.match(/\.(json|txt)$/)) return 'text'
  return 'tree'
}
