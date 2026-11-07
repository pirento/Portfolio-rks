import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion } from '../lib/motion'

// The growth loop from Ravikant's success profile. A marker travels the ring while the
// panel states how each part feeds the next. Hover or focus a node to stop on it.
const steps = [
  { node: 'Education', line: 'Education creates capability.', note: 'MBA, communication and daily discipline.' },
  { node: 'Venturecore', line: 'Capability strengthens Venturecore.', note: 'Clean systems, records and decisions.' },
  { node: 'Pirento', line: 'Venturecore supports Pirento.', note: 'A 10-product ecosystem, launched in stages.' },
  { node: 'Income', line: 'Enterprise creates income.', note: 'Documented revenue that funds the next step.' },
  { node: 'Service', line: 'Service builds trust.', note: 'Pirento Foundation and community work.' },
  { node: 'Leadership', line: 'Leadership creates lasting public impact.', note: 'Credibility earned over time.' },
]

const C = { x: 245, y: 150 }
const R = { x: 168, y: 106 }
const W = 112
const H = 40
const angleOf = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / steps.length
const pos = (a) => ({ x: C.x + R.x * Math.cos(a), y: C.y + R.y * Math.sin(a) })

export default function Flywheel() {
  const [step, setStep] = useState(0)
  const packet = useRef(null)
  const proxy = useRef({ a: angleOf(0) })
  const tl = useRef(null)
  const root = useRef(null)

  const place = () => {
    const p = pos(proxy.current.a)
    packet.current?.setAttribute('cx', p.x)
    packet.current?.setAttribute('cy', p.y)
  }

  useEffect(() => {
    place()
    if (reducedMotion()) return
    const t = gsap.timeline({ repeat: -1 })
    steps.forEach((_, i) => {
      t.addLabel(`s${i}`)
        .set(proxy.current, { a: angleOf(i), onComplete: place })
        .call(() => setStep(i))
        .to(proxy.current, { a: angleOf(i + 1), duration: 0.9, ease: 'power2.inOut', onUpdate: place }, '+=1.7')
    })
    tl.current = t

    // Pause while off-screen.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? t.resume() : t.pause()))
    io.observe(root.current)
    return () => {
      io.disconnect()
      t.kill()
    }
  }, [])

  const pin = (i) => {
    tl.current?.pause()
    setStep(i)
    const target = angleOf(i)
    // Take the short way round.
    let a = proxy.current.a
    while (a - target > Math.PI) a -= 2 * Math.PI
    while (target - a > Math.PI) a += 2 * Math.PI
    proxy.current.a = a
    if (reducedMotion()) {
      proxy.current.a = target
      place()
    } else gsap.to(proxy.current, { a: target, duration: 0.45, ease: 'power3.out', onUpdate: place, overwrite: true })
  }
  const unpin = () => tl.current?.play(`s${step}`)

  const current = steps[step]

  return (
    <div
      ref={root}
      className="relative overflow-hidden rounded-[22px] border border-rule bg-paper/90 shadow-[0_30px_80px_-40px_rgba(15,38,32,0.4)] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-rule px-5 py-3.5">
        <p className="font-display text-[0.95rem] font-medium tracking-tight">How it all connects</p>
        <span className="shrink-0 rounded-full bg-stone px-2.5 py-1 text-xs tabular-nums text-muted">
          Step {step + 1} of {steps.length}
        </span>
      </div>

      <svg
        viewBox="0 0 490 300"
        className="block w-full"
        role="img"
        aria-label="A loop: education builds capability, which strengthens Venturecore, which supports Pirento, which creates income, which funds service, which builds leadership and public impact."
      >
        <ellipse cx={C.x} cy={C.y} rx={R.x} ry={R.y} fill="none" stroke="var(--rule)" strokeWidth="1.25" strokeDasharray="4 6" />

        <text x={C.x} y={C.y + 6} textAnchor="middle" className="font-display" fontSize="44" fontWeight="600" letterSpacing="-2" fill="var(--ink)">
          {String(step + 1).padStart(2, '0')}
        </text>
        <text x={C.x} y={C.y + 28} textAnchor="middle" fontSize="11" fill="var(--muted)">
          of {String(steps.length).padStart(2, '0')}
        </text>

        {/* Drawn before the nodes so it slides under the active pill. */}
        <circle ref={packet} r="6" fill="var(--accent)" stroke="var(--on-accent)" strokeWidth="1.5" pointerEvents="none" />
        {steps.map((s, i) => {
          const p = pos(angleOf(i))
          const on = i === step
          return (
            <g
              key={s.node}
              tabIndex={0}
              role="button"
              aria-label={s.line}
              onPointerEnter={() => pin(i)}
              onPointerLeave={(e) => e.pointerType === 'mouse' && unpin()}
              onFocus={() => pin(i)}
              onBlur={unpin}
              className="cursor-pointer outline-none"
              data-cursor="Read"
            >
              <rect
                x={p.x - W / 2}
                y={p.y - H / 2}
                width={W}
                height={H}
                rx={H / 2}
                fill={on ? 'var(--accent)' : 'var(--stone)'}
                stroke={on ? 'var(--on-accent)' : 'var(--rule)'}
                style={{ transition: 'fill .35s, stroke .35s' }}
              />
              <text x={p.x} y={p.y + 5} textAnchor="middle" className="font-display" fontSize="14.5" fontWeight="600" fill={on ? 'var(--on-accent)' : 'var(--ink)'}>
                {s.node}
              </text>
            </g>
          )
        })}

      </svg>

      <div className="border-t border-rule bg-stone/60 px-5 py-4" aria-live="polite">
        <p className="font-display text-lg font-medium leading-snug tracking-[-0.01em] sm:text-xl">{current.line}</p>
        <p className="mt-1 text-sm text-muted">{current.note}</p>
      </div>
    </div>
  )
}
