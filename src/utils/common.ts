import { FastAverageColor } from 'fast-average-color'

export const getTypeFromUrl = (url: string) => {
  if (url.match(/\.(jpeg|jpg|gif|png|webp)$/)) return 'image'
  if (url.match(/\.(json|txt)$/)) return 'text'
  return 'tree'
}

export const getTimePrefix = () => {
  const date = new Date()
  const year = date.getFullYear()
  let month: any = date.getMonth() + 1
  if (month < 10) month = `0${month}`
  return `${year}-${month}`
}

const fac = new FastAverageColor()

export const getColor = async (buffer: ArrayBuffer) => {
  const img = new Image()
  img.src = URL.createObjectURL(new Blob([buffer]))
  return new Promise<string>((resolve) => {
    img.onload = () => {
      const color = fac.getColor(img)
      URL.revokeObjectURL(img.src)
      resolve(color.rgba)
    }
  })
}
