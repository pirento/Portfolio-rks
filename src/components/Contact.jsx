import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { link, site } from '../data/site'
import { Button, Container, Heading, SectionLabel } from './ui'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = link.email
    }
  }

  return (
    <section id="contact" data-nav="contact" className="on-inverse relative bg-inverse pt-28 text-on-inverse md:pt-40">
      <Container>
        <SectionLabel index="06" inverse>
          Let’s connect
        </SectionLabel>
        <Heading
          lines={['Have an idea', 'or a partnership?', 'Let’s talk.']}
          className="mt-8 max-w-[15ch] text-[clamp(2.6rem,7.4vw,7.5rem)] leading-[0.98] sm:max-w-none"
        />

        <div className="mt-14 grid gap-12 border-t border-inverse-rule pt-12 lg:grid-cols-12">
          <p data-reveal className="max-w-md text-lg leading-relaxed text-inverse-muted lg:col-span-5">
            I’m open to business partnerships, compliance and legal-tech work, and conversations with people building useful
            things in India.
          </p>

          <div className="lg:col-span-7">
            <div data-reveal className="flex flex-wrap gap-3">
              <Button href={link.email} variant="accent" icon={Mail}>
                Send me an email
              </Button>
              <Button href={link.linkedin} external variant="inverse" icon={ArrowUpRight}>
                Connect on LinkedIn
              </Button>
              <Button href={link.website} external variant="inverse" icon={ArrowUpRight}>
                Visit Pirento
              </Button>
            </div>

            <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
              <a href={link.email} className="break-all font-display text-[clamp(1.25rem,2.4vw,1.9rem)] font-medium tracking-[-0.02em] underline decoration-inverse-rule decoration-1 underline-offset-[0.25em] transition-colors hover:decoration-accent">
                {site.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-full border border-inverse-rule px-3 py-1.5 text-xs transition-colors hover:border-on-inverse"
              >
                {copied ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
              </button>
            </div>
            <p data-reveal className="mt-4 text-inverse-muted">
              Phone{' '}
              <a href={link.phone} className="text-on-inverse underline decoration-inverse-rule underline-offset-4 hover:decoration-accent">
                {site.phone}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
