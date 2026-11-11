# Design system prompt: Ravikant Soni portfolio

> **Kaise use karein:** neeche "PROMPT" wala poora hissa copy karke Claude, Claude Code, v0, Bolt ya Lovable mein paste karein. Sabse aakhri hissa **"Naye website ki jaankari"** apne naye project ke hisaab se bhar dein (naam, sections, content). Baaki sab waisa hi rehne dein. Isse naya website isi design aur animation ke saath banega.

---

## PROMPT

Build a personal or company website with the exact design system below. Follow every value literally. Do not invent facts, numbers, testimonials or claims; use only the content I give at the end, and leave a clearly marked placeholder where something is missing.

### 1. Tech stack

- React 19 + Vite, plain JavaScript (JSX), no TypeScript.
- Tailwind CSS v4 via `@tailwindcss/vite`, with design tokens as CSS variables mapped in `@theme inline`.
- GSAP 3 + ScrollTrigger for all scroll and entrance motion; Lenis for smooth scrolling (driven from the GSAP ticker).
- `lucide-react` for icons (stroke icons, `size-4`, always `aria-hidden`).
- Self-hosted fonts via `@fontsource-variable/space-grotesk` and `@fontsource-variable/inter` (no Google Fonts requests).
- All content lives in `src/data/*.js` (site info, nav, sections, lists). Components only render data.
- Static build; deploys to Vercel or Netlify with the Vite preset.

### 2. Colour tokens

The theme is "deep forest ink with a marigold-gold accent". Put the theme on `<html data-mode="light|dark">` (not `data-theme`).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#f1f3f0` | `#0b1a16` | Page background |
| `--stone` | `#e2e8e3` | `#12261f` | Cards, image placeholders, illustration backgrounds |
| `--ink` | `#0f2620` | `#e9efea` | Main text, primary buttons, borders on hover |
| `--muted` | `#56665f` | `#98aaa2` | Body copy, captions, meta text |
| `--rule` | `#cbd6cf` | `#21382f` | Hairline borders, dividers, grid lines |
| `--accent` | `#f2b33d` | `#f2b33d` | Marigold highlight, active states, key CTA |
| `--on-accent` | `#0f2620` | `#0f2620` | Text on accent |
| `--inverse` | `#0f2620` | `#132b24` | Dark panel sections (Expertise, Contact, Footer) |
| `--on-inverse` | `#eef2ee` | `#e9efea` | Text on dark panels |
| `--inverse-muted` | `#93a79e` | `#98aaa2` | Secondary text on dark panels |
| `--inverse-rule` | `#24443a` | `#2a4a40` | Borders on dark panels |

Rules:
- Accent is used sparingly: highlighted words, the active nav pill, one primary CTA per section, small status dots.
- `::selection` uses accent background with `--on-accent` text.
- `theme-color` meta switches between `#f1f3f0` and `#0b1a16`.
- Dark/inverse panels stay dark in dark mode (a slightly lifted forest green, not a light band).

### 3. Typography

- Display / headings: **Space Grotesk Variable**, weight 500–600, tight tracking (`-0.035em` to `-0.045em`), leading `0.98`–`1.02`.
- Body / UI: **Inter Variable**, body size about `1.05rem`–`1.075rem`, leading `1.7`–`1.75`, colour `--muted`; emphasised phrases inside a paragraph switch to `--ink`.
- Fluid sizes with `clamp()`:
  - Hero H1: `clamp(2.75rem, 5.6vw, 5.75rem)`, leading `0.98`, tracking `-0.045em`.
  - Section H2: `clamp(2.25rem, 5vw, 4.75rem)`, leading `1.02`.
  - Contact H2 (largest): `clamp(2.6rem, 7.4vw, 7.5rem)`.
  - Card / role title H3: `clamp(2rem, 3.6vw, 3.25rem)`, `text-wrap: balance`.
  - Stats numbers: `clamp(2rem, 3.4vw, 2.75rem)`, `tabular-nums`.
- Eyebrow / section labels: `0.72rem`, uppercase, weight 500, letter-spacing `0.2em`, muted.
- Section label format: **`01 / About me`**, where the number is in ink and the rest muted. Sections are numbered in order.
- Highlighter "marker": selected words get an accent background bar (88% height, slight radius) that **sweeps in left→right** (`background-size 0% → 100%`, 0.9s, `cubic-bezier(.7,0,.2,1)`) when scrolled into view.

### 4. Layout and spacing

- Container: `max-width: 1360px`, centred, side padding `20px / 32px / 48px` (mobile / sm / lg).
- Sections: vertical padding `py-28 md:py-40` (112px / 160px). Each section has an `id` for anchor nav.
- Desktop grid: 12 columns. Typical splits: text `7` + aside `5`, or heading `8` + short intro `4` (right-aligned, `max-w-sm`).
- Section header pattern: label `01 / Name` → large two-line heading → optional short muted intro on the right.
- Corner radii: big cards and images `22px`, small cards `18px`, thumbnails `10px`, buttons and tags fully round (pill).
- Borders are 1px `--rule` hairlines; hover changes border to `--ink`. No heavy shadows; one soft shadow allowed on the hero card: `0 30px 80px -40px rgba(15,38,32,0.4)`.
- Hero background: a subtle 72px grid in `--rule`, faded with a radial mask.
- Must work at 375px wide with no horizontal page scroll (`overflow-x: clip` on body). Horizontal rails scroll inside themselves with a hidden scrollbar.

### 5. Components

- **Navbar:** fixed, 68px tall. Logo = small accent square (`10px`, radius 3px, ink ring) + name in caps with `0.04em` tracking. Desktop: pill nav (`rounded-full`, border `--rule`) with a sliding ink pill under the active link (tracked with IntersectionObserver). Right side: "Open to partnerships" pill with a pulsing accent dot, theme toggle (sun/moon rotate swap), and on mobile a round ink menu button. Background turns `paper/80` + blur + bottom border after 24px of scroll; hides on scroll down after 480px and shows on scroll up.
- **Mobile menu:** full-screen paper panel revealed with `clip-path` from top (0.7s), large numbered links (`01 About`) sliding up with staggered delays, socials row at the bottom. Locks scroll, closes on Escape, uses `inert` when closed.
- **Button:** pill, `px-6 py-3.5`, `0.95rem` medium. Variants: primary (ink bg, paper text), outline (rule border), accent (gold), inverse (for dark panels). On hover a fill **wipes up from the bottom** (0.5s, `cubic-bezier(.7,0,.2,1)`) and the arrow icon nudges up-right. Buttons are **magnetic** (pull toward the pointer, strength 0.35, only on fine pointers).
- **Tag / chip:** pill, `px-3 py-1`, `text-xs`, 1px border.
- **Experience row:** alternating left/right; a 16:10 illustration card (slight parallax and scale on hover) + role · period meta, big title, muted description, a highlights list with a left border, tags, and an optional accent "Visit" link.
- **Illustrations:** original inline SVGs (viewBox `800×500`) on a `--stone` background with a light grid, built only from theme variables so they follow dark mode. Hover motion: a path redraws (`stroke-dashoffset`), a group lifts `-10px`, an orbit can spin. No stock photos or icons-as-art.
- **Portrait card:** 4:5 photo, radius 22px, `object-cover`, bottom gradient `from-black/70` with the name in white and role/location in `white/80`; slight zoom on hover.
- **Stats row:** 4 columns on desktop, 2 on mobile; big display numbers + short muted labels.
- **Inverse sections** (Expertise, Contact, Footer): `--inverse` background with `--on-inverse` text; focus outline switches to light.
- **Contact:** giant heading, buttons (Email, LinkedIn, website, Download CV), large underlined email with a "Copy email" button (`aria-live`), phone, and a simple form (name, reply contact, message) that opens the visitor's email app via `mailto:` with the subject and body filled in.
- **Footer:** short motto, footer nav in 2 columns, round social buttons, round accent "back to top" button, and the full name as a huge SVG wordmark stretched to full width (`textLength` + `lengthAdjust`).

### 6. Motion

Everything respects `prefers-reduced-motion` (no Lenis, no GSAP entrances, content shown immediately, CSS durations near 0).

1. **Preloader (keep this exactly):** full-screen dark forest panel (`#0f2620`, text `#eef2ee`). Top row: name on the left, "Portfolio ©YEAR" on the right, sliding up from a mask. A huge counter **`000 → 100`** (Space Grotesk, `clamp(5rem, 20vw, 16rem)`, `tabular-nums`, zero-padded to 3 digits) counts over 1.1s with `power2.inOut`, while a 1px accent progress bar fills left→right. Then the whole panel **lifts up like a curtain** (`yPercent: -100`, 0.9s, `expo.inOut`) and the hero entrance starts.
2. **Hero entrance:** each H1 line slides up from a mask (`yPercent 110 → 0`, 1.3s, `expo.out`, stagger 0.09), then text/buttons fade up, then the hero card fades/scales in, then the marker highlights sweep.
3. **Scroll reveals:** headings split into lines that slide up from a mask when they reach 88% of the viewport (1.2s, `expo.out`). Elements with `data-reveal` fade up from `y: 28` in batches (0.9s, `power3.out`, stagger 0.07), once.
4. **Smooth scroll:** Lenis (`duration 1.1`, exponential ease), anchor links scroll smoothly and keep a clean `#hash` in the URL.
5. **Custom cursor** (mouse devices only): a small dot plus a trailing ring. The ring grows over links and buttons, and shows a label inside (for example "View", "Visit", "Hello") on elements with `data-cursor="Label"`.
6. **Theme toggle:** a circular reveal from the toggle button using the View Transitions API (`clip-path: circle()`, 0.7s), falling back to an instant swap.
7. **Hero interactive card:** a small diagram on an ellipse (6 nodes) with a marker travelling between them on a loop. Hovering, tapping or focusing a node pins it and shows its explanation. It pauses while off-screen, and on touch it must not jump back after a tap.
8. **Small loops:** pulsing availability dot (1.8s), and a "Scroll" indicator line that draws and undraws (2.2s).
9. Easing language: `cubic-bezier(.7,0,.2,1)` for UI transitions, `expo.out` for entrances, `power3.out` for small moves.

### 7. Accessibility and quality

- Skip-to-content link, semantic landmarks, one H1, numbered H2s in order.
- Visible focus ring: 2px ink outline, 3px offset (light on dark panels).
- All decorative SVG/icons `aria-hidden`; meaningful images have real `alt` text.
- External links open in a new tab with `rel="noopener noreferrer"` and say so for screen readers. `mailto:`/`tel:` never open a new tab.
- Images have `width`/`height`, `loading="lazy"`, and are compressed (portrait about 1000×1250 JPG, under 200KB).
- SEO: title, description, Open Graph and Twitter tags with an absolute `og:image` URL (1200×630), JSON-LD `Person`, `robots.txt`, SVG favicon and Apple touch icon.
- Theme is applied by an inline script in `<head>` before first paint (saved choice → OS setting) to avoid a flash.
- Test at 375px, 768px and 1440px: no console errors, no horizontal scroll, every revealed element becomes visible.

### 8. Content rules

- Write in short, plain, first-person sentences. No buzzword stacks.
- Only real facts I provide. Future plans are labelled "Now" or "Expected", never shown as done.
- Testimonials appear only if I provide real quotes; otherwise hide the section.
- Keep personal data (phone, email) in one data file so it can be removed in one place.

### 9. Naye website ki jaankari (fill this in)

- **Name / brand:** …
- **One-line positioning (hero headline, 2 short lines; mark 1–2 words for the highlighter):** …
- **Role and location:** …
- **Sections in order** (default: Hero → About → Experience/Work → Products/Services → Expertise → Journey/Timeline → Principles → Current focus → Contact → Footer): …
- **Content for each section:** …
- **Photo(s), logo, certificates (files):** …
- **Links (LinkedIn, website, email, phone):** …
- **Domain:** …
