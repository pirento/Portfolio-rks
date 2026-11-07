import { useEffect, useRef, useState } from 'react'
import { gsap, finePointer, reducedMotion } from '../lib/motion'

/**
 * Dot + trailing ring on mouse devices. Interactive elements grow the ring;
 * elements with data-cursor="Label" show that label inside it.
 */
export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled] = useState(() => finePointer() && !reducedMotion())
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.1, ease: 'power3' })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.1, ease: 'power3' })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })
    let shown = false

    const move = (e) => {
      if (!shown) {
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 })
        shown = true
      }
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
    }
    const over = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, textarea, select')
      const text = target?.closest('[data-cursor]')?.dataset.cursor || ''
      setLabel(text)
      gsap.to(ring.current, { scale: text ? 2.6 : target ? 1.7 : 1, duration: 0.35, ease: 'power3.out' })
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.25 })
    }
    const leave = () => {
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 })
      shown = false
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={ring}
        className={`invisible fixed left-0 top-0 -ml-5 -mt-5 flex size-10 items-center justify-center rounded-full border opacity-0 transition-colors duration-300 ${
          label ? 'border-accent bg-accent' : 'border-ink bg-transparent'
        }`}
      >
        <span className="scale-[0.385] whitespace-nowrap text-[0.95rem] font-semibold text-on-accent">{label}</span>
      </div>
      <div ref={dot} className="invisible fixed left-0 top-0 -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-ink opacity-0" />
    </div>
  )
}
