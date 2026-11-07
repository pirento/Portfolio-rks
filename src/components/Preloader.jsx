import { useRef, useState } from 'react'
import { gsap, useGsap, reducedMotion } from '../lib/motion'

/** Counts 0 → 100, then lifts away. Calls onDone as the curtain starts to rise. */
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const [gone, setGone] = useState(false)

  useGsap(root, () => {
    if (reducedMotion()) {
      onDone()
      setGone(true)
      return
    }
    const counter = { v: 0 }
    const num = root.current.querySelector('[data-count]')
    const tl = gsap.timeline({ onComplete: () => setGone(true) })
    tl.from('[data-word]', { yPercent: 110, duration: 0.7, ease: 'power3.out', stagger: 0.08 })
      .to(counter, {
        v: 100,
        duration: 1.1,
        ease: 'power2.inOut',
        onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, '0')),
      }, 0)
      .to('[data-bar]', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
      .add(onDone)
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' })
  }, [])

  if (gone) return null

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0f2620] p-5 text-[#eef2ee] sm:p-8 lg:p-12"
    >
      <div className="flex justify-between overflow-hidden font-display text-sm tracking-tight">
        <span data-word>Ravikant Soni</span>
        <span data-word className="text-[#93a79e]">Portfolio ©{new Date().getFullYear()}</span>
      </div>
      <div>
        <div className="overflow-hidden">
          <span data-count className="block font-display text-[clamp(5rem,20vw,16rem)] font-medium leading-[0.85] tracking-[-0.06em] tabular-nums">
            000
          </span>
        </div>
        <div className="mt-6 h-px w-full bg-[#24443a]">
          <div data-bar className="h-px origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  )
}
