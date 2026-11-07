import { useState } from 'react'
import { ArrowUpRight, Check, Copy, FileDown, Mail, Send } from 'lucide-react'
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

  // No backend: the form opens the visitor's email app with the message filled in.
  const send = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `Portfolio enquiry from ${f.get('name')}`
    const body = `${f.get('message')}\n\n${f.get('name')}${f.get('reply') ? ` (${f.get('reply')})` : ''}`
    window.location.href = `${link.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const field =
    'w-full rounded-[14px] border border-inverse-rule bg-transparent px-4 py-3 text-on-inverse placeholder:text-inverse-muted focus:border-on-inverse'

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
              <Button href="/ravikant-soni-cv.pdf" download variant="inverse" icon={FileDown}>
                Download CV
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

            <form data-reveal onSubmit={send} className="mt-12 grid gap-4 border-t border-inverse-rule pt-10 sm:grid-cols-2">
              <h3 className="font-display text-xl font-medium tracking-tight sm:col-span-2">Or write to me here</h3>
              <label className="grid gap-2 text-sm text-inverse-muted">
                Your name
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="grid gap-2 text-sm text-inverse-muted">
                Phone or email for my reply (optional)
                <input name="reply" autoComplete="email" className={field} />
              </label>
              <label className="grid gap-2 text-sm text-inverse-muted sm:col-span-2">
                Message
                <textarea name="message" required rows={4} className={`${field} resize-y`} />
              </label>
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-[0.95rem] font-medium text-on-accent transition-opacity hover:opacity-90"
                >
                  Send message
                  <Send aria-hidden="true" className="size-4" />
                </button>
                <p className="text-xs text-inverse-muted">Opens your email app with the message ready to send.</p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
