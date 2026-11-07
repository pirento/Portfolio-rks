import { products } from '../data/projects'
import { Container, Heading, SectionLabel, Tag } from './ui'
import ProjectVisual from './ProjectVisual'

export default function Products() {
  return (
    <section id="products" data-nav="products" className="relative pb-28 md:pb-40">
      <Container>
        <div className="grid gap-10 pb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="03">Products</SectionLabel>
            <Heading lines={['Software that', 'runs the work.']} className="mt-8 text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.02]" />
          </div>
          <p data-reveal className="max-w-sm text-muted lg:col-span-4 lg:justify-self-end">
            Products I designed and built with AI-assisted development in Claude Code, for our businesses, for traders and for
            the trust.
          </p>
        </div>

        <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
          {products.map((p) => (
            <article key={p.id} data-reveal className="flex min-w-0 flex-col">
              <div className="visual-host group overflow-hidden rounded-[18px]">
                <div className="aspect-[16/10] transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.05]">
                  <ProjectVisual variant={p.visual} />
                </div>
              </div>
              <p className="mt-6 text-sm text-muted">{p.kind}</p>
              <h3 className="mt-1.5 font-display text-2xl font-medium tracking-[-0.03em]">{p.name}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
              <p className="mt-3 text-[0.92rem] leading-relaxed">
                <span className="font-medium">Used by: </span>
                <span className="text-muted">{p.users}</span>
              </p>
              <ul className="mt-5 space-y-2 border-l border-rule pl-4 text-[0.92rem] leading-relaxed" aria-label={`${p.name} features`}>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Built with">
                {p.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
