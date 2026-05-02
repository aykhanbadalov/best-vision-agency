import { useEffect, useRef, useState } from 'react'

export function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const E = 'cubic-bezier(0.22,1,0.36,1)'

export function anim(visible, delay = 0, from = 'bottom', duration = 0.6) {
  const t = { bottom: 'translateY(1.5rem)', left: 'translateX(-3.75rem)', right: 'translateX(2.5rem)' }
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : (t[from] ?? t.bottom),
    transition: `opacity ${duration}s ${E} ${delay}s, transform ${duration}s ${E} ${delay}s`,
  }
}
