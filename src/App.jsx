import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGsap, initSmoothScroll, scrollToId, reducedMotion } from './lib/motion'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedProjects from './components/FeaturedProjects'
import Products from './components/Products'
import Skills from './components/Skills'
import Journey from './components/Journey'
import Principles from './components/Principles'
import CurrentFocus from './components/CurrentFocus'
import Contact from './components/Contact'
import Footer from './components/Footer'

const paint = (mode) => {
  document.documentElement.dataset.mode = mode
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'dark' ? '#0b1a16' : '#f1f3f0')
}

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.mode || 'light')

  // Follow a host page's theme (e.g. the Claude preview sets data-theme on <html>) and the OS setting.
  useEffect(() => {
    const root = document.documentElement
    const set = (mode) => {
      paint(mode)
      setTheme(mode)
    }
    const hostTheme = () => {
      const t = root.getAttribute('data-theme')
      return t === 'dark' || t === 'light' ? t : null
    }
    const syncHost = () => hostTheme() && set(hostTheme())
    syncHost()
    const mo = new MutationObserver(syncHost)
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] })

    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onOs = (e) => {
      let saved = null
      try {
        saved = localStorage.getItem('theme')
      } catch {
        /* storage blocked */
      }
      if (!saved && !hostTheme()) set(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onOs)
    return () => {
      mo.disconnect()
      mq.removeEventListener('change', onOs)
    }
  }, [])

  const toggle = useCallback(
    (e) => {
      const next = theme === 'dark' ? 'light' : 'dark'
      const apply = () => {
        paint(next)
        try {
          localStorage.setItem('theme', next)
        } catch {
          /* private mode */
        }
        setTheme(next)
      }
      if (!document.startViewTransition || reducedMotion()) return apply()

      // Circular reveal from the toggle button.
      const r = e.currentTarget.getBoundingClientRect()
      const x = r.left + r.width / 2
      const y = r.top + r.height / 2
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      document.startViewTransition(apply).ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 700, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
    },
    [theme],
  )

  return [theme, toggle]
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [theme, toggleTheme] = useTheme()
  const main = useRef(null)

  useEffect(() => {
    if (!reducedMotion()) document.documentElement.classList.add('js-motion')
    const stop = initSmoothScroll()
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return stop
  }, [])

  // Honour a #hash in the URL once the page is ready.
  useEffect(() => {
    if (!ready || !location.hash) return
    const id = location.hash.slice(1)
    const t = setTimeout(() => scrollToId(id), 300)
    return () => clearTimeout(t)
  }, [ready])

  // Shared scroll-triggered motion: heading line reveals, content fade-ups, highlighter sweeps, image parallax.
  useGsap(main, () => {
    if (reducedMotion()) return

    gsap.utils.toArray('[data-split]').forEach((h) => {
      gsap.from(h.querySelectorAll('.split-line'), {
        yPercent: 110,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: h, start: 'top 88%' },
      })
    })

    const reveals = gsap.utils.toArray('[data-reveal]')
    gsap.set(reveals, { autoAlpha: 0, y: 28 })
    ScrollTrigger.batch(reveals, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07, overwrite: true }),
    })

    gsap.utils.toArray('#main .marker').forEach((m) => {
      if (m.closest('#home')) return
      ScrollTrigger.create({ trigger: m, start: 'top 85%', once: true, onEnter: () => m.classList.add('is-on') })
    })

    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      gsap.fromTo(el, { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
  }, [])

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main" ref={main} tabIndex={-1} className="outline-none">
        <Hero ready={ready} />
        <About />
        <FeaturedProjects />
        <Products />
        <Skills />
        <Journey />
        <Principles />
        <CurrentFocus />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
