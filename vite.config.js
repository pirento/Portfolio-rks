import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Social apps need an absolute og:image URL. Set SITE_URL, or let Vercel provide its production domain.
const siteUrl =
  process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    siteUrl && {
      name: 'absolute-og-image',
      transformIndexHtml: (html) => html.replaceAll('content="/og-image.png"', `content="${siteUrl.replace(/\/$/, '')}/og-image.png"`),
    },
  ],
})
