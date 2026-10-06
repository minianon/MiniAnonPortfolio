'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

interface LazyMountProps {
  children: ReactNode
  /** Reserved height so the page doesn't jump when the content mounts */
  minHeight: number
  /** How far ahead of the viewport to start rendering */
  rootMargin?: string
}

// Defers mounting heavy below-the-fold sections until the visitor scrolls near them.
// The generous rootMargin mounts them before they're visible, so there's no visible pop-in.
export default function LazyMount({ children, minHeight, rootMargin = '800px 0px' }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMounted(true)
        observer.disconnect()
      }
    }, { rootMargin })
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} style={mounted ? undefined : { minHeight }}>
      {mounted ? children : null}
    </div>
  )
}
