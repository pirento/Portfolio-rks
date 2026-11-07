import { useRef, useEffect } from 'react'
import { Globe, Mail } from 'lucide-react'
import { gsap, finePointer, reducedMotion } from '../lib/motion'

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

/** "01 / About me" — the brief's numbered section labels (sections are a real sequence). */
export function SectionLabel({ index, children, inverse = false, className = '' }) {
  return (
    <p
      data-reveal
      className={`flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.2em] ${
        inverse ? 'text-inverse-muted' : 'text-muted'
      } ${className}`}
    >
      <span className={inverse ? 'text-on-inverse' : 'text-ink'}>{index}</span>
      <span aria-hidden="true">/</span>
      {children}
    </p>
  )
}

/** Display heading whose lines slide up from a mask when scrolled into view (see useScrollAnimations). */
export function Heading({ lines, as: Tag = 'h2', className = '' }) {
  return (
    <Tag data-split className={`font-display font-medium tracking-[-0.035em] ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <span className="split-line block">{line}</span>
        </span>
      ))}
    </Tag>
  )
}

/** Pulls its child toward the pointer on fine-pointer devices. */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || reducedMotion()) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])
  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  )
}

const btnBase =
  'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full px-6 py-3.5 text-[0.95rem] font-medium transition-colors duration-300'

const variants = {
  primary: 'bg-ink text-paper hover:text-on-accent',
  outline: 'border border-rule text-ink hover:border-ink',
  accent: 'bg-accent text-on-accent hover:text-accent',
  inverse: 'border border-inverse-rule text-on-inverse hover:border-on-inverse',
}

/** Magnetic pill button. A fill wipes up from the bottom on hover. */
export function Button({ href, onClick, variant = 'primary', icon: Icon, children, external, className = '', ...rest }) {
  const fill = { primary: 'bg-accent', accent: 'bg-on-accent', outline: 'bg-stone', inverse: 'bg-on-inverse/10' }[variant]
  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-full rounded-full ${fill} transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-y-0`}
      />
      <span className="relative">{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className="relative size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  )
  const cls = `${btnBase} ${variants[variant]} ${className}`
  return (
    <Magnetic>
      {href ? (
        <a
          href={href}
          onClick={onClick}
          className={cls}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...rest}
        >
          {content}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={cls} {...rest}>
          {content}
        </button>
      )}
    </Magnetic>
  )
}

const brandPaths = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
}

const lucideIcons = { website: Globe, email: Mail }

/** Link attributes: new tab only for web links, never for mailto:/tel:. */
export const ext = (href) => (href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export function BrandIcon({ name, className = 'size-4' }) {
  const Lucide = lucideIcons[name]
  if (Lucide) return <Lucide aria-hidden="true" className={className} />
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={brandPaths[name]} />
    </svg>
  )
}

export function Tag({ children, inverse = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
        inverse ? 'border-inverse-rule text-on-inverse' : 'border-rule text-ink'
      }`}
    >
      {children}
    </span>
  )
}
