import { useRef } from 'react'
import { journey } from '../data/content'
import { gsap, ScrollTrigger, useGsap, reducedMotion } from '../lib/motion'
import { Container, Heading, SectionLabel } from './ui'

const badge = { now: 'Now', next: 'Expected' }

export default function Journey() {
  const list = useRef(null)

  // The accent rail fills as you scroll; each year lights up as the rail reaches it.
  useGsap(list, () => {
    if (reducedMotion()) return
    gsap.fromTo(
      '[data-rail]',
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list.current, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 } },
    )
    gsap.utils.toArray('[data-step]').forEach((el) => {
      gsap.from(el.querySelectorAll('[data-step-anim]'), {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 78%' },
      })
      const dot = el.querySelector('[data-dot]')
      if (el.dataset.status === 'next') return // a future milestone never lights up as "reached"
      ScrollTrigger.create({
        trigger: el,
        start: 'top 70%',
        onEnter: () => dot.classList.add('is-lit'),
        onLeaveBack: () => dot.classList.remove('is-lit'),
      })
    })
  }, [])

  return (
    <section id="journey" data-nav="journey" className="relative py-28 md:py-40">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel index="05">My journey</SectionLabel>
              <Heading lines={['Always learning.', 'Always building.']} className="mt-8 text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.02]" />
              <p data-reveal className="mt-8 max-w-sm text-muted">
                From a road project and a family shop to a recognised startup, and the education still ahead.
              </p>
            </div>
          </div>

          <ol ref={list} className="relative lg:col-span-7">
            <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-rule" />
            <span aria-hidden="true" data-rail className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-ink" />
            {journey.map((j) => (
              <li key={j.year} data-step data-status={j.status} className="relative pb-16 pl-12 last:pb-0 md:pb-20">
                <span
                  data-dot
                  aria-hidden="true"
                  className={`absolute left-0 top-[0.65rem] size-[15px] rounded-full border-2 bg-paper transition-[background-color,border-color,transform] duration-500 [&.is-lit]:scale-125 [&.is-lit]:border-on-accent [&.is-lit]:bg-accent ${
                    j.status === 'next' ? 'border-muted' : 'border-ink'
                  }`}
                />
                <div data-step-anim className="flex flex-wrap items-baseline gap-4">
                  <span
                    className={`font-display text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.05em] ${
                      j.status === 'next' ? 'text-transparent [-webkit-text-stroke:1.25px_var(--ink)]' : ''
                    }`}
                  >
                    {j.year}
                  </span>
                  {badge[j.status] && (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        j.status === 'now' ? 'bg-accent text-on-accent' : 'border border-dashed border-muted text-muted'
                      }`}
                    >
                      {badge[j.status]}
                    </span>
                  )}
                </div>
                <h3 data-step-anim className="mt-5 font-display text-2xl font-medium tracking-[-0.02em]">
                  {j.title}
                </h3>
                <p data-step-anim className="mt-3 max-w-lg leading-relaxed text-muted">
                  {j.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
