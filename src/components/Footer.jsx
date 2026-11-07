import { ArrowUp } from 'lucide-react'
import { nav, socials } from '../data/site'
import { anchor } from '../lib/motion'
import { ext, BrandIcon, Container, Magnetic } from './ui'

export default function Footer() {
  return (
    <footer className="on-inverse relative overflow-hidden bg-inverse pb-8 pt-24 text-on-inverse md:pt-32">
      <Container>
        <div className="grid gap-10 border-t border-inverse-rule pt-12 md:grid-cols-12">
          <p className="font-display text-2xl font-medium tracking-[-0.02em] md:col-span-5">Do fewer things well, then expand.</p>

          <nav aria-label="Footer" className="md:col-span-3">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={anchor(n.id)} className="text-inverse-muted transition-colors hover:text-on-inverse">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-2 md:col-span-3 md:justify-end" aria-label="Profiles">
            {socials.map((s) => (
              <li key={s.id}>
                <Magnetic strength={0.4}>
                  <a
                    href={s.href}
                    {...ext(s.href)}
                    aria-label={s.href.startsWith('http') ? `${s.label} (opens in a new tab)` : s.label}
                    className="grid size-11 place-items-center rounded-full border border-inverse-rule transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
                  >
                    <BrandIcon name={s.id} />
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>

          <div className="md:col-span-1 md:justify-self-end">
            <Magnetic strength={0.4}>
              <a
                href="#home"
                onClick={anchor('home')}
                aria-label="Back to top"
                className="grid size-11 place-items-center rounded-full bg-accent text-on-accent"
              >
                <ArrowUp aria-hidden="true" className="size-4" />
              </a>
            </Magnetic>
          </div>
        </div>

        <svg aria-hidden="true" viewBox="0 0 1000 118" className="mt-16 block w-full select-none md:mt-24">
          <text
            x="0"
            y="104"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-display"
            fontSize="140"
            fontWeight="600"
            letterSpacing="-6"
            fill="currentColor"
          >
            RAVIKANT SONI
          </text>
        </svg>

        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-inverse-rule pt-6 text-xs text-inverse-muted">
          <p>© {new Date().getFullYear()} Ravikant Soni. All rights reserved.</p>
          <p>Founder & Director, Venturecore Solutions Private Limited.</p>
        </div>
      </Container>
    </footer>
  )
}
