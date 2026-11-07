# Ravikant Soni — Portfolio

Personal portfolio built with React, Vite, Tailwind CSS v4, GSAP (ScrollTrigger) and Lenis.

## Run it (VS Code)

1. Clone the repo, then in VS Code use **File → Open Folder** and pick the repo folder (the one with `package.json`).
2. Open the terminal (**Terminal → New Terminal**) and run:

```bash
npm install
npm run dev       # opens on http://localhost:5173
```

`npm run build` creates the final site in `dist/`. Deploys as a static site on Vercel or Netlify (framework preset: **Vite**).

## Where to edit things

| What | File |
| --- | --- |
| Name, email, phone, links, nav | `src/data/site.js` |
| Experience, company facts, Pirento products, products built, ventures | `src/data/projects.js` |
| Stats, expertise, journey, priorities, monthly review, vision cards | `src/data/content.js` |
| Colours (light + dark) | `src/index.css` (top of the file) |
| SEO / Open Graph tags | `index.html` |
| Portrait photo | `public/ravikant-soni.jpg` |

### Before you publish

1. **Phone number** is shown in the Contact section. Remove `phone` from `src/data/site.js` and the phone line in `src/components/Contact.jsx` if you don't want it public.
2. **Open Graph URL**: in `index.html`, replace `/og-image.png` with the full URL once you have a domain.
3. **Your photo** is `public/ravikant-soni.jpg` (1000×1250, 4:5). To change it, replace that file with a new 4:5 photo of the same name.

## Notes

- Motion respects `prefers-reduced-motion`; the custom cursor and magnetic buttons only run on mouse/trackpad devices.
- Fonts (Inter, Space Grotesk) are self-hosted, so there are no third-party font requests.
