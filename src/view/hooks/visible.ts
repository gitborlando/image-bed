import { useState } from 'react'

const beObserved = new Map<HTMLElement, (isIntersecting: boolean) => void>()

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      beObserved.get(entry.target as HTMLElement)?.(entry.isIntersecting)
    }
  })
})

export const useVisible = (ref: React.RefObject<HTMLElement | null>) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    observer.observe(element)
    beObserved.set(element, setVisible)

    return () => {
      observer.unobserve(element)
      beObserved.delete(element)
    }
  }, [ref.current])

  return visible
}
