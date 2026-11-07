import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { socials } from '../data/site'
import { gsap, useGsap, anchor, reducedMotion, finePointer } from '../lib/motion'
import { Button, Container, BrandIcon, Magnetic, ext } from './ui'
import Flywheel from './Flywheel'

export default function Hero({ ready }) {
  const root = useRef(null)
  const visual = useRef(null)

  // Hold everything in its start state until the preloader lifts, then play one entrance.
  useGsap(root, () => {
    if (reducedMotion()) return
    gsap.set('.hero-line', { yPercent: 110 })
    gsap.set('[data-hero-fade]', { autoAlpha: 0, y: 24 })
    gsap.set(visual.current, { autoAlpha: 0, y: 40, scale: 0.97 })
  }, [])

  useGsap(root, () => {
    if (!ready || reducedMotion()) return
    gsap
      .timeline({ defaults: { ease: 'expo.out' }, delay: 0.25 })
      .to('.hero-line', { yPercent: 0, duration: 1.3, stagger: 0.09 })
      .to('[data-hero-fade]', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, '-=0.9')
      .to(visual.current, { autoAlpha: 1, y: 0, scale: 1, duration: 1.4 }, '-=1.1')
      .add(() => root.current?.querySelectorAll('.marker').forEach((m) => m.classList.add('is-on')), '-=1.2')
  }, [ready])

  // Gentle tilt toward the pointer.
  useEffect(() => {
    const el = visual.current
    if (!el || !finePointer() || reducedMotion()) return
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3' })
    const move = (e) => {
      ry((e.clientX / window.innerWidth - 0.5) * 6)
      rx(-(e.clientY / window.innerHeight - 0.5) * 6)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <section
      id="home"
      data-nav="home"
      ref={root}
      className="relative flex min-h-svh flex-col overflow-hidden pt-[68px]"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <Container className="relative flex flex-1 flex-col justify-center py-12 lg:py-16">
        <p data-hero-fade className="mb-8 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted lg:mb-10">
          Founder & Director · Venturecore Solutions · Pirento
        </p>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <h1 className="font-display text-[clamp(2.75rem,5.6vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              {[
                'First become',
                <span key="a" className="marker">reliable.</span>,
                'Then become',
                <span key="b" className="marker">bigger.</span>,
              ].map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                  <span className="hero-line block">{line}</span>
                </span>
              ))}
            </h1>

            <p data-hero-fade className="mt-8 max-w-[34rem] text-lg leading-relaxed text-muted md:text-xl">
              I’m Ravikant Soni, founder of Venturecore Solutions and the Pirento ecosystem, and co-founder of Shri Sarraf. I
              build compliance, fintech, sustainability and AI services from Basti, Uttar Pradesh.
            </p>

            <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="#work" onClick={anchor('work')} icon={ArrowDown}>
                See my work
              </Button>
              <Button href="#contact" onClick={anchor('contact')} variant="outline" icon={ArrowUpRight}>
                Let’s talk
              </Button>
            </div>

            <ul data-hero-fade className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm" aria-label="Profiles">
              {socials.map((s) => (
                <li key={s.id}>
                  <Magnetic strength={0.25}>
                    <a
                      href={s.href}
                      {...ext(s.href)}
                      className="group inline-flex items-center gap-2 py-1 text-muted transition-colors hover:text-ink"
                    >
                      <BrandIcon name={s.id} />
                      <span className="relative">
                        {s.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                      </span>
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-5 [perspective:1200px]">
            <div ref={visual} className="will-change-transform">
              <Flywheel />
              <p className="mt-3 text-center text-xs text-muted">Hover or tap a step to read how it connects</p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="relative pb-8">
        <a
          href="#about"
          onClick={anchor('about')}
          data-hero-fade
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-rule">
            <span className="scroll-line absolute inset-0 bg-ink" />
          </span>
          Scroll
        </a>
      </Container>
    </section>
  )
}
