import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { nav, socials } from '../data/site'
import { anchor, lockScroll } from '../lib/motion'
import { ext, BrandIcon, Container } from './ui'

export default function Navbar({ theme, onToggleTheme }) {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const listRef = useRef(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  // Background after the hero top; hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > last && y > 480)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.dataset.nav)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('[data-nav]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Slide the pill indicator under the active link.
  useLayoutEffect(() => {
    const place = () => {
      const el = listRef.current?.querySelector(`[data-link="${active}"]`)
      // No matching link (e.g. on the hero): hide the pill instead of leaving it on the last section.
      setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : (i) => ({ ...i, width: 0 }))
    }
    place()
    document.fonts?.ready.then(place)
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active])

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 text-sm text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80]"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled && !open ? 'border-b border-rule bg-paper/80 backdrop-blur-xl' : 'border-b border-transparent'}`}
      >
        <Container className="flex h-[68px] items-center justify-between gap-6">
          <a
            href="#home"
            onClick={anchor('home', close)}
            className="relative z-10 flex items-center gap-2 font-display text-[0.95rem] font-semibold tracking-[0.04em]"
            aria-label="Ravikant Soni — back to top"
          >
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-accent ring-1 ring-ink/80" />
            RAVIKANT SONI
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul ref={listRef} className="relative flex items-center gap-1 rounded-full border border-rule bg-paper/60 p-1">
              <li
                aria-hidden="true"
                className="absolute top-1 h-[calc(100%-0.5rem)] rounded-full bg-ink transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)]"
                style={{ left: indicator.left, width: indicator.width }}
              />
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    data-link={item.id}
                    href={`#${item.id}`}
                    onClick={anchor(item.id)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
                      active === item.id ? 'text-paper' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href="#contact"
              onClick={anchor('contact', close)}
              className="hidden items-center gap-2.5 rounded-full border border-rule px-4 py-2 text-sm transition-colors hover:border-ink md:inline-flex"
            >
              <span className="pulse-dot relative size-2 rounded-full bg-accent ring-1 ring-ink/40" />
              Open to partnerships
            </a>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-rule transition-colors hover:border-ink"
            >
              <Sun
                aria-hidden="true"
                className={`absolute size-[18px] transition-all duration-500 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`}
              />
              <Moon
                aria-hidden="true"
                className={`absolute size-[18px] transition-all duration-500 ${theme === 'dark' ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
              />
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-full bg-ink text-paper lg:hidden"
            >
              {open ? <X className="size-[18px]" aria-hidden="true" /> : <Menu className="size-[18px]" aria-hidden="true" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-paper transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!open}
        inert={!open || undefined}
      >
        <Container className="flex h-full flex-col justify-between pb-10 pt-28">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <a
                    href={`#${item.id}`}
                    onClick={anchor(item.id, close)}
                    style={{ transitionDelay: open ? `${150 + i * 50}ms` : '0ms' }}
                    className={`flex items-baseline gap-4 font-display text-[clamp(2.5rem,11vw,4rem)] font-medium leading-[1.1] tracking-[-0.04em] transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${
                      open ? 'translate-y-0' : 'translate-y-full'
                    }`}
                  >
                    <span className="text-sm tracking-normal text-muted">0{i + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-between border-t border-rule pt-6">
            <span className="inline-flex items-center gap-2.5 text-sm">
              <span className="pulse-dot relative size-2 rounded-full bg-accent ring-1 ring-ink/40" />
              Open to partnerships
            </span>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  {...ext(s.href)}
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-rule"
                >
                  <BrandIcon name={s.id} />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
