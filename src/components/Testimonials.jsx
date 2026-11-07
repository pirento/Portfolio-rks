import { testimonials } from '../data/content'
import { Container, Heading } from './ui'

export default function Testimonials() {
  if (!testimonials.length) return null

  return (
    <section id="testimonials" data-nav="journey" className="relative py-28 md:py-40">
      <Container>
        <Heading lines={['What people say.']} className="text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.02]" />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} data-reveal>
              <figure className="flex h-full flex-col justify-between gap-8 rounded-[22px] border border-rule p-7">
                <blockquote className="text-[1.075rem] leading-[1.7]">“{t.quote}”</blockquote>
                <figcaption>
                  <span className="block font-medium">{t.name}</span>
                  <span className="mt-1 block text-sm text-muted">{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
