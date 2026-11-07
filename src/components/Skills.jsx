import { skills } from '../data/content'
import { Container, Heading, SectionLabel } from './ui'

export default function Skills() {
  return (
    <section id="skills" data-nav="skills" className="on-inverse relative bg-inverse py-28 text-on-inverse md:py-40">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="04" inverse>
              Core expertise
            </SectionLabel>
            <Heading lines={['What I bring', 'to the table.']} className="mt-8 text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.02]" />
          </div>
          <p data-reveal className="max-w-sm text-inverse-muted lg:col-span-4 lg:justify-self-end">
            The skills behind Venturecore, Pirento and my other work, grouped by where I use them.
          </p>
        </div>

        <ul className="mt-16 border-b border-inverse-rule md:mt-24">
          {skills.map(({ title, icon: Icon, items }) => (
            <li
              key={title}
              data-reveal
              className="group relative grid gap-5 border-t border-inverse-rule py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              {/* Row wash on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100"
              />
              <div className="relative flex items-center gap-4 md:col-span-4 md:px-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-inverse-rule transition-colors duration-500 group-hover:border-on-accent group-hover:text-on-accent">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="font-display text-2xl font-medium tracking-[-0.025em] transition-colors duration-500 group-hover:text-on-accent">
                  {title}
                </h3>
              </div>
              <ul className="relative flex flex-wrap items-center gap-x-2 gap-y-2 md:col-span-8 md:px-4" aria-label={title}>
                {items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-inverse-rule px-4 py-2 text-[0.95rem] transition-colors duration-500 group-hover:border-on-accent/25 group-hover:text-on-accent"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
