import { useState } from 'react'
import { Plus } from 'lucide-react'
import { priorities, scoreboard } from '../data/content'
import { Container, Heading } from './ui'

export default function Principles() {
  const [open, setOpen] = useState(0)

  return (
    <section id="principles" data-nav="journey" aria-labelledby="principles-title" className="on-inverse relative bg-inverse py-28 text-on-inverse md:py-40">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p data-reveal className="text-sm text-inverse-muted">
                How I work
              </p>
              <div id="principles-title">
                <Heading lines={['Do fewer things', 'well, then expand.']} className="mt-6 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.02]" />
              </div>
              <p data-reveal className="mt-8 max-w-md leading-relaxed text-inverse-muted">
                Ten products, a family business, tenders and an MBA can pull in every direction. So I work in a fixed order:
                each step has to be stable before the next one gets my full attention.
              </p>
            </div>
          </div>

          <ol className="min-w-0 border-b border-inverse-rule lg:col-span-7">
            {priorities.map((p, i) => {
              const isOpen = open === i
              return (
                <li key={p.title} data-reveal className="border-t border-inverse-rule">
                  <h3>
                    <button
                      type="button"
                      id={`priority-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`priority-panel-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex w-full items-center gap-5 py-6 text-left"
                    >
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-full border font-display text-sm tabular-nums transition-colors duration-300 ${
                          isOpen ? 'border-accent bg-accent text-on-accent' : 'border-inverse-rule group-hover:border-on-inverse'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-medium tracking-[-0.02em]">{p.title}</span>
                        <span className="mt-0.5 block text-sm text-inverse-muted">{p.tag}</span>
                      </span>
                      <Plus
                        aria-hidden="true"
                        className={`size-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${isOpen ? 'rotate-45' : ''}`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`priority-panel-${i}`}
                    role="region"
                    aria-labelledby={`priority-${i}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden" inert={!isOpen || undefined}>
                      <p className="max-w-lg pb-7 pl-[3.75rem] leading-relaxed text-inverse-muted">{p.text}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div data-reveal className="mt-24">
          <h3 className="font-display text-xl font-medium tracking-tight">What I review every month</h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-[18px] border border-inverse-rule bg-inverse-rule sm:grid-cols-2 lg:grid-cols-5">
            {scoreboard.map((s) => (
              <li key={s.title} className="bg-inverse p-6">
                <p className="font-display text-lg font-medium">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-inverse-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
