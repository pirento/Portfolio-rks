import { Award, GraduationCap, MapPin } from 'lucide-react'
import { site } from '../data/site'
import { interests, stats } from '../data/content'
import { Container, Heading, SectionLabel } from './ui'

export default function About() {
  return (
    <section id="about" data-nav="about" className="relative py-28 md:py-40">
      <Container>
        <SectionLabel index="01">About me</SectionLabel>

        <div className="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <Heading
              lines={['Build myself.', 'Build my institutions.']}
              className="text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.02]"
            />

            <div className="mt-12 max-w-[38rem] space-y-6 text-[1.075rem] leading-[1.75] text-muted">
              <p data-reveal>
                I’m the Founder and Director of <span className="text-ink">{site.company}</span>, the company behind Pirento:
                a connected ecosystem of ten products across legal and compliance services, fintech, sustainability and AI.
                Venturecore received DPIIT Startup India recognition in January 2025.
              </p>
              <p data-reveal>
                My work has been hands-on from day one. Through our partnership with Vakilsearch we delivered{' '}
                <span className="text-ink">100+ GST registration and compliance engagements</span>, and I lead a 10+ person team
                across product, operations and strategy. I also design and build our own software, from Pirento INV for billing to
                Pirento Blank for traders.
              </p>
              <p data-reveal>
                Outside Venturecore, I co-run <span className="text-ink">Shri Sanjay Jewellers</span>, our family jewellery
                business, and I am building <span className="text-ink">Shri Sarraf</span>, an online jewellery brand, with my
                brother. I serve as second trustee of JBC Seva Trust, and I coordinated a ₹12 lakh government road project for
                PWD. I completed my B.Com in 2026 and am now studying for an MBA at Chandigarh University.
              </p>
            </div>

            <dl data-reveal className="mt-14 grid max-w-[44rem] gap-6 border-t border-rule pt-8 sm:grid-cols-3">
              <div className="flex gap-3">
                <GraduationCap aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <div>
                  <dt className="text-sm text-muted">Education</dt>
                  <dd className="mt-1 font-medium leading-snug">
                    MBA, Chandigarh University
                    <span className="block text-sm font-normal text-muted">In progress · B.Com 2026</span>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Award aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <div>
                  <dt className="text-sm text-muted">Recognition</dt>
                  <dd className="mt-1 font-medium leading-snug">
                    DPIIT Startup India
                    <span className="block text-sm font-normal text-muted">January 2025</span>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <div>
                  <dt className="text-sm text-muted">Based in</dt>
                  <dd className="mt-1 font-medium leading-snug">
                    Basti, Uttar Pradesh
                    <span className="block text-sm font-normal text-muted">Open to partnerships</span>
                  </dd>
                </div>
              </div>
            </dl>

            <ul className="mt-12 grid max-w-[44rem] grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4" aria-label="Results so far">
              {stats.map((s) => (
                <li key={s.label} data-reveal>
                  <p className="font-display text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-none tracking-[-0.04em] tabular-nums">
                    {s.value}
                  </p>
                  <p className="mt-3 text-sm leading-snug text-muted">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5 lg:pl-6">
            <figure data-reveal className="group relative aspect-[4/5] overflow-hidden rounded-[22px] bg-stone" data-cursor="Hello">
              <img
                src="/ravikant-soni.jpg"
                alt={`Portrait of ${site.name}`}
                width="1000"
                height="1250"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Darkens the bottom so the caption stays readable over the photo. */}
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <span className="font-display text-xl font-medium tracking-tight text-white">{site.name}</span>
                <span className="text-right text-xs leading-relaxed text-white/80">
                  {site.role}
                  <br />
                  Basti, Uttar Pradesh
                </span>
              </figcaption>
            </figure>

            <a
              data-reveal
              href="/dpiit-certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View"
              className="group mt-6 flex items-center gap-4 rounded-[18px] border border-rule p-3 transition-colors hover:border-ink"
            >
              <img
                src="/dpiit-certificate.jpg"
                alt="DPIIT Startup India Certificate of Recognition for Venturecore Solutions"
                width="1287"
                height="910"
                loading="lazy"
                className="w-28 shrink-0 rounded-[10px] border border-rule"
              />
              <span className="min-w-0">
                <span className="block font-medium leading-snug">Startup India recognition</span>
                <span className="mt-1 block text-sm leading-snug text-muted">DPIIT certificate DIPP190348 · January 2025</span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm underline decoration-rule underline-offset-4 group-hover:decoration-ink">
                  View certificate (PDF, opens in a new tab)
                </span>
              </span>
            </a>

            <div data-reveal className="mt-10">
              <h3 className="text-sm text-muted">How I work</h3>
              <p className="mt-3 font-display text-[1.6rem] font-medium leading-[1.25] tracking-[-0.02em]">
                My strongest future will come from completed work, clean systems, disciplined learning and genuine service to
                people.
              </p>
            </div>

            <div data-reveal className="mt-10">
              <h3 className="text-sm text-muted">Areas of interest</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {interests.map((i) => (
                  <li
                    key={i}
                    className="rounded-full border border-rule px-4 py-2 text-sm transition-colors duration-300 hover:border-ink hover:bg-accent hover:text-on-accent"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
