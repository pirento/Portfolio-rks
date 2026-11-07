import { useRef } from 'react'
import { focus } from '../data/content'
import { gsap, useGsap, reducedMotion } from '../lib/motion'
import { Container, Heading } from './ui'

export default function CurrentFocus() {
  const section = useRef(null)
  const track = useRef(null)

  // Desktop: pin the section and scroll the cards sideways. Mobile: native swipe rail.
  useGsap(section, () => {
    if (reducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const distance = () => track.current.scrollWidth - track.current.parentElement.clientWidth
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set('[data-focus-progress]', { scaleX: self.progress }),
        },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={section} id="focus" data-nav="journey" aria-labelledby="focus-title" className="relative overflow-hidden py-28 md:py-36 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p data-reveal className="text-sm text-muted">
              Vision
            </p>
            <div id="focus-title">
              <Heading lines={['Where I’m', 'heading.']} className="mt-6 text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.02]" />
            </div>
          </div>
          <div className="hidden w-48 lg:block" aria-hidden="true">
            <div className="h-px w-full bg-rule">
              <div data-focus-progress className="h-px origin-left scale-x-0 bg-ink" />
            </div>
            <p className="mt-3 text-right text-xs text-muted">Keep scrolling</p>
          </div>
        </div>
      </Container>

      <div className="no-scrollbar mt-14 overflow-x-auto lg:overflow-visible md:mt-20 snap-x snap-mandatory lg:snap-none">
        <ul
          ref={track}
          className="flex w-max gap-4 px-5 sm:px-8 lg:gap-6 lg:px-[max(3rem,calc((100vw-1360px)/2+3rem))]"
        >
          {focus.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="group relative flex h-[22rem] w-[78vw] max-w-[22rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[22px] border border-rule bg-paper p-7 transition-colors duration-500 hover:border-ink sm:w-[22rem] lg:h-[26rem] lg:w-[24rem] lg:max-w-none"
            >
              <span
                aria-hidden="true"
                className="absolute -right-10 -top-10 size-48 rounded-full bg-accent transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] [transform:scale(0.12)] group-hover:[transform:scale(1.6)]"
              />
              <span className="relative grid size-12 place-items-center rounded-full border border-rule bg-paper transition-colors duration-500 group-hover:border-on-accent">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div className="relative">
                <h3 className="font-display text-[1.65rem] font-medium leading-[1.1] tracking-[-0.03em]">{title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
