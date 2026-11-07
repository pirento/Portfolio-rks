import { ArrowUpRight } from 'lucide-react'
import { experience, companyFacts, pirentoProducts, ventures } from '../data/projects'
import { Container, Heading, SectionLabel, Tag } from './ui'
import ProjectVisual from './ProjectVisual'

function ExperienceRow({ item, reverse }) {
  const Visual = (
    <div data-parallax className="aspect-[16/10] scale-[1.06] transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.1]">
      <ProjectVisual variant={item.visual} />
    </div>
  )
  const frame = `visual-host group relative block overflow-hidden rounded-[22px] lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`

  return (
    <article className="grid items-center gap-8 border-t border-rule py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
      {item.link ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer" data-cursor="Visit" aria-label={`${item.linkLabel} (new tab)`} className={frame}>
          {Visual}
        </a>
      ) : (
        <div className={frame}>{Visual}</div>
      )}

      <div className={`min-w-0 lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
        <p data-reveal className="text-sm text-muted">
          {item.role} · {item.period}
        </p>
        <h3 data-reveal className="mt-3 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.035em] [text-wrap:balance]">
          {item.name}
        </h3>
        <p data-reveal className="mt-5 text-[1.05rem] leading-relaxed text-muted">
          {item.description}
        </p>

        <ul data-reveal className="mt-8 space-y-3 border-l border-rule pl-5 text-[0.95rem] leading-relaxed" aria-label="Highlights">
          {item.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <ul data-reveal className="mt-8 flex flex-wrap gap-2" aria-label="Skills used">
          {item.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        {item.link && (
          <div data-reveal className="mt-9">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-on-accent"
            >
              {item.linkLabel}
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

export default function FeaturedProjects() {
  return (
    <section id="work" data-nav="work" className="relative pb-28 md:pb-40">
      <Container>
        <div className="grid gap-10 pb-12 md:pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="02">Experience</SectionLabel>
            <Heading lines={['Built on the ground.', 'Here is what I run.']} className="mt-8 text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.02]" />
          </div>
          <p data-reveal className="max-w-sm text-muted lg:col-span-4 lg:justify-self-end">
            A startup, two jewellery businesses, a government tender firm and a government project, all run from Basti at the same time.
          </p>
        </div>

        {experience.map((item, i) => (
          <ExperienceRow key={item.id} item={item} reverse={i % 2 === 1} />
        ))}

        <div className="mt-4 border-t border-rule pt-16 md:pt-24">
          <h3 data-reveal className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium tracking-[-0.03em]">
            Venturecore at a glance
          </h3>
          <dl data-reveal className="mt-8 grid gap-px overflow-hidden rounded-[18px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {companyFacts.map((f) => (
              <div key={f.label} className="min-w-0 bg-paper p-6">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-2 break-words font-display text-lg font-medium tracking-tight">{f.value}</dd>
                <dd className="mt-1 text-sm text-muted">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20">
          <h3 data-reveal className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium tracking-[-0.03em]">
            The Pirento ecosystem
          </h3>
          <p data-reveal className="mt-3 max-w-2xl leading-relaxed text-muted">
            Ten products planned under Venturecore Solutions and launched one at a time. Pirento Legal is live at pirento.com.
          </p>
          <ul data-reveal className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {pirentoProducts.map((p) => (
              <li
                key={p.name}
                className={`rounded-[16px] p-4 ${p.live ? 'bg-accent text-on-accent' : 'bg-stone'}`}
              >
                <p className="font-display font-medium tracking-tight">{p.name}</p>
                <p className={`mt-1 text-sm leading-snug ${p.live ? 'text-on-accent/75' : 'text-muted'}`}>
                  {p.text}
                  {p.live && ' · Live'}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20">
          <h3 data-reveal className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium tracking-[-0.03em]">
            Other ventures and roles
          </h3>
          <ul className="mt-8 border-b border-rule">
            {ventures.map((v) => (
              <li key={v.name} data-reveal className="grid gap-2 border-t border-rule py-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-4">
                  <p className="font-display text-xl font-medium tracking-tight">{v.name}</p>
                  <p className="mt-1 text-sm text-muted">{v.kind}</p>
                </div>
                <p className="max-w-2xl leading-relaxed text-muted md:col-span-8">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
