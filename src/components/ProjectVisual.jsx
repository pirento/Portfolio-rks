// Original abstract thumbnails, one per role. Pure SVG: no image requests, crisp at any size,
// and they follow the theme through CSS variables. Hover motion lives in index.css (.visual-host).

const ink = 'var(--ink)'
const rule = 'var(--rule)'
const accent = 'var(--accent)'
const onAccent = 'var(--on-accent)'
const paper = 'var(--paper)'

function Grid() {
  return (
    <g stroke={rule} strokeWidth="1">
      {Array.from({ length: 11 }, (_, i) => (
        <line key={'v' + i} x1={i * 80} y1="0" x2={i * 80} y2="500" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={'h' + i} x1="0" y1={i * 80 + 10} x2="800" y2={i * 80 + 10} />
      ))}
    </g>
  )
}

const label = (x, y, t, o = {}) => (
  <text x={x} y={y} fontSize="15" fontWeight="500" fill={ink} className="font-display" {...o}>
    {t}
  </text>
)

const variants = {
  // Venturecore — the company at the centre, ten Pirento products in orbit.
  orbit: () => (
    <>
      <Grid />
      <circle cx="400" cy="250" r="185" fill="none" stroke={ink} strokeOpacity="0.25" strokeDasharray="3 7" />
      <circle cx="400" cy="250" r="118" fill="none" stroke={ink} strokeOpacity="0.15" />
      <g className="v-spin">
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2 - Math.PI / 2
          const x = 400 + 185 * Math.cos(a)
          const y = 250 + 185 * Math.sin(a)
          const live = i === 0
          return <circle key={i} cx={x} cy={y} r={live ? 17 : 11} fill={live ? accent : paper} stroke={live ? onAccent : ink} strokeWidth="2" />
        })}
      </g>
      <g className="v-lift">
        <circle cx="400" cy="250" r="78" fill={ink} />
        {label(400, 246, 'Venturecore', { textAnchor: 'middle', fill: paper, fontSize: 19, fontWeight: 600 })}
        {label(400, 270, 'Pirento · 10 products', { textAnchor: 'middle', fill: paper, fontSize: 12, opacity: 0.7 })}
      </g>
    </>
  ),

  // Pirento INV — a tax invoice with a paid stamp beside a small finance chart.
  invoice: () => (
    <>
      <Grid />
      <g className="v-lift">
        <rect x="130" y="60" width="330" height="390" rx="14" fill={paper} stroke={ink} strokeWidth="2" />
        {label(160, 104, 'Tax invoice', { fontSize: 22, fontWeight: 600 })}
        {label(160, 128, 'GST · CGST + SGST', { fontSize: 12, opacity: 0.6 })}
        {[165, 200, 235, 270].map((y, i) => (
          <g key={y}>
            <rect x="160" y={y} width={[120, 90, 140, 70][i]} height="10" rx="5" fill={ink} opacity="0.18" />
            <rect x={430 - [50, 70, 40, 60][i]} y={y} width={[50, 70, 40, 60][i]} height="10" rx="5" fill={ink} opacity="0.4" />
          </g>
        ))}
        <line x1="160" y1="310" x2="430" y2="310" stroke={ink} strokeDasharray="6 6" />
        {label(160, 345, 'Total', { fontSize: 16, fontWeight: 600 })}
        <rect x="330" y="330" width="100" height="14" rx="7" fill={ink} />
        <g transform="translate(345 400) rotate(-10)">
          <rect x="-55" y="-22" width="110" height="44" rx="22" fill={accent} stroke={onAccent} strokeWidth="2" />
          {label(0, 6, 'Paid', { textAnchor: 'middle', fontSize: 18, fontWeight: 600, fill: onAccent })}
        </g>
      </g>
      <g transform="translate(510 120)">
        <rect width="200" height="260" rx="14" fill={paper} stroke={ink} strokeOpacity="0.5" />
        {label(20, 34, 'Group finance', { fontSize: 13, opacity: 0.7 })}
        {[70, 110, 90, 150, 130, 180].map((h, i) => (
          <rect key={i} x={22 + i * 28} y={230 - h} width="18" height={h} rx="4" fill={i === 5 ? accent : ink} opacity={i === 5 ? 1 : 0.25} />
        ))}
      </g>
    </>
  ),

  // Pirento Blank — candles with entry, stop-loss and target lines, and net P&L.
  journal: () => {
    const candles = [
      [300, 330], [320, 280], [285, 300], [300, 250], [255, 270], [270, 230], [235, 245], [245, 205], [210, 220], [220, 180],
    ]
    return (
      <>
        <Grid />
        <line x1="90" y1="260" x2="710" y2="260" stroke={ink} strokeDasharray="8 6" strokeOpacity="0.6" />
        <line x1="90" y1="330" x2="710" y2="330" stroke={ink} strokeDasharray="3 5" strokeOpacity="0.6" />
        <line x1="90" y1="170" x2="710" y2="170" stroke={accent} strokeWidth="2.5" strokeDasharray="8 6" />
        {label(714, 174, 'Target', { fontSize: 12, textAnchor: 'end', y: 160 })}
        {label(714, 250, 'Entry', { fontSize: 12, textAnchor: 'end' })}
        {label(714, 350, 'Stop-loss', { fontSize: 12, textAnchor: 'end' })}
        <g className="v-lift">
          {candles.map(([o, c], i) => {
            const x = 130 + i * 52
            const up = c < o
            const top = Math.min(o, c)
            return (
              <g key={i}>
                <line x1={x + 12} y1={top - 18} x2={x + 12} y2={Math.max(o, c) + 16} stroke={ink} strokeWidth="2" />
                <rect x={x} y={top} width="24" height={Math.abs(o - c) || 3} rx="3" fill={up ? accent : paper} stroke={up ? onAccent : ink} strokeWidth="1.5" />
              </g>
            )
          })}
        </g>
        <g transform="translate(110 380)">
          <rect width="240" height="70" rx="14" fill={paper} stroke={ink} />
          {label(20, 28, 'Net P&L after charges', { fontSize: 12, opacity: 0.6 })}
          {label(20, 54, '+ ₹2,340', { fontSize: 22, fontWeight: 600 })}
        </g>
        <g transform="translate(380 380)">
          <rect width="170" height="70" rx="14" fill={ink} />
          {label(20, 28, 'Daily loss limit', { fontSize: 12, fill: paper, opacity: 0.7 })}
          {label(20, 54, 'On', { fontSize: 22, fontWeight: 600, fill: accent })}
        </g>
      </>
    )
  },

  // JBC Seva Trust — a donation card, programme chips and the Hindi/English switch.
  seva: () => (
    <>
      <Grid />
      <g className="v-lift">
        <rect x="200" y="70" width="400" height="360" rx="18" fill={paper} stroke={ink} strokeWidth="2" />
        <rect x="430" y="90" width="150" height="34" rx="17" fill="var(--stone)" />
        <rect x="434" y="94" width="70" height="26" rx="13" fill={ink} />
        {label(469, 112, 'हिन्दी', { textAnchor: 'middle', fontSize: 13, fill: paper })}
        {label(543, 112, 'English', { textAnchor: 'middle', fontSize: 13 })}
        {label(230, 165, 'Donate to Green Earth', { fontSize: 20, fontWeight: 600 })}
        {['501', '1,100', '2,100', '5,100'].map((t, i) => (
          <g key={t}>
            <rect x={230 + i * 88} y="190" width="78" height="40" rx="12" fill={i === 1 ? accent : 'var(--stone)'} stroke={i === 1 ? onAccent : 'none'} />
            {label(269 + i * 88, 215, `₹${t}`, { textAnchor: 'middle', fontSize: 14, fill: i === 1 ? onAccent : ink })}
          </g>
        ))}
        {[255, 280].map((y, i) => (
          <rect key={y} x="230" y={y} width={i ? 220 : 300} height="10" rx="5" fill={ink} opacity="0.18" />
        ))}
        <rect x="230" y="320" width="340" height="50" rx="25" fill={ink} />
        {label(400, 351, 'Continue to payment', { textAnchor: 'middle', fontSize: 16, fill: paper })}
        {label(230, 405, '₹1,100 · Tree plantation · every month', { fontSize: 13, opacity: 0.65 })}
      </g>
      <path
        className="v-draw"
        pathLength="1"
        d="M660 210 c0 -40 -50 -40 -50 -8 c0 -32 -50 -32 -50 8 c0 35 50 60 50 60 c0 0 50 -25 50 -60 z"
        transform="translate(30 -60)"
        fill={accent}
        stroke={onAccent}
        strokeWidth="2.5"
      />
    </>
  ),

  // Shri Sarraf — an online storefront: browser window, product tiles, one gem in focus.
  web: () => (
    <>
      <Grid />
      <g className="v-lift">
        <rect x="150" y="70" width="500" height="360" rx="18" fill={paper} stroke={ink} strokeWidth="2" />
        <line x1="150" y1="112" x2="650" y2="112" stroke={ink} strokeOpacity="0.4" />
        {[175, 195, 215].map((x) => (
          <circle key={x} cx={x} cy="91" r="5" fill={ink} opacity="0.35" />
        ))}
        <rect x="250" y="80" width="300" height="22" rx="11" fill="var(--stone)" />
        {label(400, 96, 'shrisarraf.com', { textAnchor: 'middle', fontSize: 13, opacity: 0.75 })}
        {[0, 1, 2].map((i) => {
          const x = 180 + i * 150
          const hot = i === 1
          return (
            <g key={i}>
              <rect x={x} y="140" width="140" height="190" rx="12" fill={hot ? accent : 'var(--stone)'} stroke={hot ? onAccent : 'none'} />
              <path
                d={`M${x + 50} ${hot ? 205 : 210} l12 -14 h16 l12 14 l-20 32 z`}
                fill={hot ? paper : 'none'}
                stroke={hot ? onAccent : ink}
                strokeOpacity={hot ? 1 : 0.5}
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <rect x={x + 16} y="286" width="80" height="9" rx="4.5" fill={hot ? onAccent : ink} opacity={hot ? 0.8 : 0.3} />
              <rect x={x + 16} y="304" width="44" height="9" rx="4.5" fill={hot ? onAccent : ink} opacity={hot ? 1 : 0.5} />
            </g>
          )
        })}
        {label(180, 380, 'Crafting Timeless Elegance', { fontSize: 18, fontWeight: 600 })}
        <rect x="510" y="358" width="110" height="36" rx="18" fill={ink} />
        {label(565, 381, 'Shop now', { textAnchor: 'middle', fontSize: 14, fill: paper })}
      </g>
    </>
  ),

  // Shri Sanjay Jewellers — a cut gemstone, facets in thin lines.
  gem: () => (
    <>
      <Grid />
      <g className="v-lift">
        <path d="M300 170 L355 115 H445 L500 170 L400 330 Z" fill={accent} stroke={onAccent} strokeWidth="2.5" strokeLinejoin="round" />
        <g fill="none" stroke={onAccent} strokeWidth="1.5" strokeLinejoin="round" opacity="0.75">
          <path d="M300 170 H500" />
          <path d="M355 115 L375 170 L400 115 L425 170 L445 115" />
          <path d="M375 170 L400 330 L425 170" />
          <path d="M300 170 L400 330 L500 170" />
        </g>
      </g>
      <path className="v-draw" pathLength="1" d="M190 380 Q400 450 610 380" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      {[230, 310, 400, 490, 570].map((x, i) => (
        <circle key={x} cx={x} cy={[392, 412, 418, 412, 392][i]} r="5" fill={i === 2 ? accent : ink} stroke={ink} />
      ))}
      <path d="M560 110 l8 -20 8 20 20 8 -20 8 -8 20 -8 -20 -20 -8 Z" fill={ink} opacity="0.85" />
      <path d="M215 210 l5 -13 5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 Z" fill={ink} opacity="0.5" />
    </>
  ),

  // PWD road project — a road receding to the horizon with milestone posts.
  road: () => (
    <>
      <Grid />
      <path d="M210 500 L375 150 H425 L590 500 Z" fill={ink} opacity="0.92" />
      <path className="v-draw" pathLength="1" d="M400 500 L400 150" stroke={accent} strokeWidth="6" strokeDasharray="0.06 0.04" fill="none" />
      <line x1="140" y1="150" x2="660" y2="150" stroke={ink} strokeOpacity="0.4" />
      <g className="v-lift">
        {[
          [235, 420, 'Tender'],
          [300, 290, 'Execution'],
          [350, 195, 'Completion'],
        ].map(([x, y, t], i) => (
          <g key={t}>
            <line x1={x} y1={y} x2={x - 70} y2={y} stroke={ink} strokeOpacity="0.5" />
            <rect x={x - 70 - 116} y={y - 18} width="116" height="36" rx="18" fill={i === 2 ? accent : paper} stroke={i === 2 ? onAccent : ink} />
            {label(x - 70 - 58, y + 5, t, { textAnchor: 'middle', fontSize: 14, fill: i === 2 ? onAccent : ink })}
          </g>
        ))}
      </g>
      <g transform="translate(560 70)">
        <rect width="170" height="64" rx="14" fill={paper} stroke={ink} />
        {label(20, 28, 'Project value', { fontSize: 12, opacity: 0.6 })}
        {label(20, 50, '₹12 lakh', { fontSize: 20, fontWeight: 600 })}
      </g>
    </>
  ),
}

export default function ProjectVisual({ variant }) {
  const Draw = variants[variant]
  return (
    <svg viewBox="0 0 800 500" className="block size-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="500" fill="var(--stone)" />
      <Draw />
    </svg>
  )
}
