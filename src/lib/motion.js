import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** gsap.context scoped to a ref; reverted on unmount. */
export function useGsap(scope, fn, deps = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(fn, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

let lenis = null

export function initSmoothScroll() {
  if (reducedMotion()) return () => {}
  lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(raf)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1.4 })
  else el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
  history.replaceState(null, '', id === 'home' ? location.pathname : `#${id}`)
}

export function lockScroll(on) {
  if (lenis) on ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = on ? 'hidden' : ''
}

/** Click handler for in-page anchors: smooth-scrolls and keeps the URL tidy. */
export const anchor = (id, after) => (e) => {
  e.preventDefault()
  after?.()
  lockScroll(false) // a closing menu unlocks in an effect later; scroll must not wait for it
  scrollToId(id)
}
