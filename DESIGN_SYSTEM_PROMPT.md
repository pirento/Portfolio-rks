# Pirento design system: master prompt

> **Kaise use karein:** jab bhi koi nayi website ya page banwana ho (JBC Seva Trust, Pirento Legal, Pirento INV, Giftox, ya koi bhi Pirento ecosystem ka page), to neeche ka **"PROMPT"** poora copy karke AI tool (Claude Code, Claude, v0, Bolt, Lovable) ya developer ko dein. Sabse neeche **"Is project ki jaankari"** mein sirf us website ki baatein likhein. Design waala hissa kabhi na badlein, taaki har website ki quality aur look ek jaisa rahe.

---

## PROMPT

You are building a website that must match an existing design system exactly. The design system below is fixed. Only the content, the page list and the brand name change from project to project. If something is not covered here, extend it in the same spirit (calm, editorial, precise, generous whitespace, one warm accent) instead of inventing a new style. Never invent facts, numbers, testimonials, logos or claims: use only the content I give, and leave a clearly marked placeholder where something is missing.

### 1. Design character

- **Editorial and calm:** large confident headings, lots of whitespace, thin hairline borders, and almost no shadows.
- **One warm accent on a deep forest base:** marigold gold is used sparingly, so it always means "look here".
- **Precise and engineered:** strict 12-column grid, consistent radii, numbered sections, and tabular numbers.
- **Alive but quiet:** every element enters with motion, but nothing bounces, flashes or loops loudly.
- **Original visuals:** custom inline SVG illustrations drawn with the theme colours. No stock photos of strangers, no clip-art, no emoji as icons.
- **Must never look like:** a generic template, gradient blobs, glassmorphism everywhere, neon colours, purple-blue AI gradients, or crowded cards with drop shadows.

### 2. Tech stack

- React 19 + Vite, JavaScript (JSX). Multi-page sites use React Router, with one route per page.
- Tailwind CSS v4 via `@tailwindcss/vite`; all colours and fonts are CSS variables mapped in `@theme inline`. No hard-coded hex values inside components.
- GSAP 3 + ScrollTrigger for motion, and Lenis for smooth scroll (driven by the GSAP ticker).
- `lucide-react` icons (stroke style, `size-4` or `size-5`, always `aria-hidden` unless they carry meaning).
- Self-hosted fonts: `@fontsource-variable/space-grotesk` and `@fontsource-variable/inter`.
- All text, lists, links and contact details live in `src/data/*.js`; components only render data.
- Static build that deploys to Vercel with the Vite preset. A backend is only added when a feature truly needs one (payments, logins, forms that store data).

### 3. Colour tokens (fixed)

Theme on `<html data-mode="light|dark">`, applied by an inline `<head>` script before first paint (saved choice → OS setting).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#f1f3f0` | `#0b1a16` | Page background |
| `--stone` | `#e2e8e3` | `#12261f` | Card fills, illustration backgrounds, image placeholders |
| `--ink` | `#0f2620` | `#e9efea` | Headings, main text, primary buttons, hover borders |
| `--muted` | `#56665f` | `#98aaa2` | Body copy, captions, meta |
| `--rule` | `#cbd6cf` | `#21382f` | 1px borders, dividers, grid lines |
| `--accent` | `#f2b33d` | `#f2b33d` | Highlight, active state, the one key CTA |
| `--on-accent` | `#0f2620` | `#0f2620` | Text on accent |
| `--inverse` | `#0f2620` | `#132b24` | Dark panel sections |
| `--on-inverse` | `#eef2ee` | `#e9efea` | Text on dark panels |
| `--inverse-muted` | `#93a79e` | `#98aaa2` | Secondary text on dark panels |
| `--inverse-rule` | `#24443a` | `#2a4a40` | Borders on dark panels |

- Accent coverage stays under about 5% of any screen.
- Success, warning and error states (forms, payment status) reuse ink and accent plus a clear text label and an icon. Do not add new bright colours.
- `::selection` uses an accent background with ink text. The `theme-color` meta is `#f1f3f0` or `#0b1a16`.
- Inverse panels stay dark in dark mode.

### 4. Typography (fixed)

- Headings: **Space Grotesk Variable**, weight 500 (600 for logos and wordmarks), tracking `-0.035em` to `-0.045em`, leading `0.98–1.05`, `text-wrap: balance`.
- Body and UI: **Inter Variable**. Body is `1.05–1.075rem` with leading `1.7–1.75` in `--muted`; key phrases inside a paragraph switch to `--ink`. Line length is at most about 38rem.
- Scale (fluid `clamp`):
  - Page hero H1: `clamp(2.75rem, 5.6vw, 5.75rem)`
  - Section H2: `clamp(2.25rem, 5vw, 4.75rem)`
  - Final CTA / contact H2: `clamp(2.6rem, 7.4vw, 7.5rem)`
  - Card or item title: `clamp(1.5rem, 3.6vw, 3.25rem)` depending on importance
  - Big numbers: `clamp(2rem, 3.4vw, 2.75rem)`, `tabular-nums`
  - Eyebrow / label: `0.72rem`, uppercase, weight 500, tracking `0.2em`, muted
- Section labels are always numbered in order: **`01 / Section name`** (number in ink, rest muted).
- Headings are written as 1–3 short lines (for example "Serve people. / Keep every record."). 1–2 key words can get the **highlighter**: an accent bar behind the word (88% height) that sweeps left→right when scrolled into view.
- Hindi text uses Noto Sans Devanagari / Noto Serif Devanagari at the same scale, with leading +0.1.

### 5. Layout (fixed)

- Container: `max-width 1360px`, side padding `20 / 32 / 48px` (mobile / sm / lg).
- Section rhythm: `py-28 md:py-40`. Alternate paper sections with an occasional **inverse (dark) section** for emphasis (for example Services, Impact or Contact). Never put two dark sections next to each other except Contact → Footer.
- Grid: 12 columns. Standard splits are 7/5 (text + visual), 8/4 (heading + short intro aligned right), and 4/8 (label + content). Cards go in 2–3 columns on desktop and 1 on mobile.
- Section header pattern: `01 / Label` → large multi-line heading → short muted intro (max-w-sm) on the right.
- Radii: large cards and media `22px`, small cards `18px`, thumbnails `10px`, buttons, tags and inputs fully round or `14px` for text inputs.
- Borders are 1px `--rule`, changing to `--ink` on hover. Only one soft shadow is allowed, on a hero feature card: `0 30px 80px -40px rgba(15,38,32,0.4)`.
- Hero background: a faint 72px line grid in `--rule` with a radial fade mask.
- Works from 360px to 1920px with no horizontal page scroll (`overflow-x: clip`). Horizontal carousels scroll inside their own track with a hidden scrollbar.

### 6. Component library

Build these once and reuse them on every page.

- **Navbar:** fixed, 68px tall. Logo = 10px accent square (radius 3px, ink ring) + brand name in caps (`0.04em` tracking). Desktop has a pill-shaped nav with a sliding ink pill under the active page or section. Right side has a status pill with a pulsing accent dot (for example "Open to partnerships", "Donations open" or "Accepting clients"), a theme toggle (sun/moon rotate swap) and the main CTA. On scroll it gets a `paper/80` blurred background and bottom border; it hides on scroll down and shows on scroll up.
- **Mobile menu:** full-screen paper panel revealed with `clip-path` from the top, large numbered links (`01 Home`) sliding up with stagger, and a socials or contact row at the bottom. It locks scroll, closes on Escape and uses `inert` when closed.
- **Button:** pill, `px-6 py-3.5`, `0.95rem` medium, with an arrow icon. Variants are primary (ink), outline (rule border), accent (gold, for the one key action) and inverse (on dark panels). On hover a fill wipes up from the bottom (0.5s) and the icon nudges. It is magnetic toward the pointer on mouse devices.
- **Tag / chip:** pill, `px-3 py-1`, `text-xs`, 1px border.
- **Feature row:** alternating left/right; a 16:10 illustration card + meta line (`category · period`), title, muted description, highlights list with a left border, tags and an optional link button. Use it for programmes, products, services and projects.
- **Card grid:** `--stone` or bordered cards with an icon in a round outlined badge, title and 1–2 lines of text. On hover the border turns ink, the card lifts slightly and the icon badge fills accent.
- **Stats row:** 2–4 big numbers with short labels. Only show real numbers.
- **Timeline:** a vertical rail that fills with accent as you scroll; each item has year, title and text, with status badges "Done", "Now" or "Expected".
- **Steps / process:** numbered steps (01, 02, 03) connected by a thin line, for "how it works" flows such as booking, donating or registering.
- **Pricing / plans:** 2–3 bordered cards, one highlighted with an accent border and "Recommended" tag, a clear price in big tabular numbers, and a feature list with check icons.
- **FAQ:** accordion with hairline dividers and a plus that rotates to a cross. It must be keyboard accessible.
- **Testimonials:** quote cards; only shown when real quotes exist.
- **Logo / partner strip:** greyscale logos at reduced opacity that become full colour on hover. Only real partners.
- **Certificate / proof card:** thumbnail + title + reference number + "View certificate (PDF, opens in a new tab)".
- **Photo card:** 4:5 photo with radius 22px and a bottom gradient (`from-black/70`) with name/caption in white; slight zoom on hover.
- **Illustrations:** original inline SVG (viewBox 800×500) on `--stone` with the faint grid, drawn only with theme variables. Each illustrates the real idea (a tender file checklist, an invoice, a donation receipt, a product UI sketch). Hover makes a path redraw, a group lift `-10px`, or an orbit spin.
- **Forms:** labels above inputs, 14px-radius inputs with 1px border, a focus ring in ink, required fields marked in text, inline error messages, and an accent submit button. Without a backend, the form opens the email app via `mailto:` with the subject and body filled in.
- **Final CTA / contact:** an inverse section with a giant heading ("Have an idea? Let's talk."), action buttons, a large underlined email with a "Copy" button, and phone.
- **Footer:** inverse, with a short motto, nav in 2 columns, round social buttons, a round accent "back to top" button, the brand name as a full-width SVG wordmark, and a legal line (© year, registered company name, and CIN/registration numbers if given).

### 7. Motion (fixed)

All motion respects `prefers-reduced-motion`: no Lenis, no entrances, content visible at once, and CSS durations near 0.

1. **Preloader (always keep):** a full-screen dark forest panel (`#0f2620`, text `#eef2ee`). The top row has the brand name on the left and "© YEAR" or the page name on the right, sliding up from a mask. A huge counter **`000 → 100`** (Space Grotesk, `clamp(5rem, 20vw, 16rem)`, tabular, zero-padded) counts over 1.1s (`power2.inOut`) while a 1px accent bar fills left→right. Then the panel **lifts up like a curtain** (`yPercent -100`, 0.9s, `expo.inOut`) and the page entrance plays. Show it on the first load of a session only, not on every page change in multi-page sites.
2. **Hero entrance:** H1 lines slide up from a mask (`yPercent 110 → 0`, 1.3s, `expo.out`, stagger 0.09). Then intro text and buttons fade up, then the hero visual fades in and scales from 0.97, then the highlighter sweeps.
3. **Scroll reveals:** section headings slide up line by line at 88% of the viewport (1.2s, `expo.out`). Elements with `data-reveal` fade up from `y: 28` in batches (0.9s, `power3.out`, stagger 0.07), once.
4. **Smooth scroll:** Lenis (duration 1.1). Anchor links scroll smoothly and keep a clean `#hash`.
5. **Custom cursor** (mouse devices only): a dot plus a trailing ring. The ring grows over interactive elements and shows a label (for example "View", "Visit", "Donate") on elements with `data-cursor`.
6. **Theme toggle:** a circular reveal from the button using the View Transitions API, with an instant fallback.
7. **Page transitions (multi-page):** the old page fades and moves up 12px, and the new page runs its hero entrance. Scroll resets to the top.
8. **Micro-motion:** pulsing status dot (1.8s), a "Scroll" line that draws and undraws (2.2s), a subtle tilt of the hero visual toward the pointer (max 6°), and slight parallax on feature images.
9. **Easing:** `cubic-bezier(.7,0,.2,1)` for UI, `expo.out` for entrances and `power3.out` for small moves. No bounce or elastic easing.

### 8. Accessibility, performance and SEO (required)

- Skip link, semantic landmarks, one H1 per page, headings in order, and the `lang` attribute (`en` or `hi`).
- Focus ring: 2px ink outline with 3px offset (light on dark panels). Everything is usable by keyboard.
- Text contrast is at least 4.5:1; never put muted text on stone at small sizes.
- Decorative SVGs are `aria-hidden`; real images have meaningful `alt` text.
- External links open in a new tab with `rel="noopener noreferrer"` and announce it. `mailto:` and `tel:` links never open a new tab.
- Images have width and height, lazy loading, and compressed JPG/WebP (photos under 200KB). Fonts are self-hosted.
- Every page has its own title, description, Open Graph/Twitter tags with an absolute `og:image` (1200×630), plus canonical URL, JSON-LD (`Organization`, `NGO` or `Person`, whichever fits), `robots.txt`, `sitemap.xml`, SVG favicon and Apple touch icon.
- Lighthouse target: 90+ for Performance, Accessibility, Best Practices and SEO.

### 9. Quality checklist before delivery

- [ ] Tested at 360px, 768px, 1024px and 1440px in light and dark mode.
- [ ] No console errors and no horizontal scroll; every reveal element ends up visible.
- [ ] The preloader counts 000 → 100 and lifts; reduced-motion users skip it.
- [ ] Only the fixed colour tokens and two font families are used.
- [ ] Section labels are numbered in order; headings are short multi-line statements.
- [ ] Every number, name, logo and quote is real content I provided.
- [ ] All forms, links and buttons work on touch and keyboard.

### 10. Content voice

- Short, plain, first-person or "we" sentences. Speak to the reader directly. No buzzword stacks, no exaggeration.
- Lead with what the reader can do or get, then the proof.
- Plans are labelled "Now" or "Expected", never shown as done.
- Bilingual sites get an English ⇄ हिंदी switch in the navbar, with all text coming from the data files.

---

## Is project ki jaankari (har nayi website ke liye sirf yeh bharein)

- **Brand / website ka naam:** …
- **Kiske liye (trust, product, service, company page):** …
- **Pages ki list** (jaise Home, About, Programmes, Donate, Contact): …
- **Har page ka content** (headings, text, lists, real numbers): …
- **Main action** (Donate / Book a call / Register / Buy): …
- **Status pill ka text** (jaise "Donations open"): …
- **Photos, logo, certificates (files):** …
- **Links aur contact** (website, email, phone, social): …
- **Bhasha:** English / Hindi / dono
- **Domain:** …
- **Legal line** (registered naam, CIN / registration number): …
