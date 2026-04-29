# ADMI Website (Astro)

Institutional static website for Alkesh Dinesh Mody Institute for Financial and Management Studies, University of Mumbai.

## Run locally
1. Use Node.js 20 or 22.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Production build:
   ```bash
   npm run build
   ```

## Content editing (non-technical workflow)
Update markdown files under `src/content/`:
- Notices: `src/content/notices/*.md`
- Events: `src/content/events/*.md`
- Faculty: `src/content/faculty/*.md`
- Publications: `src/content/publications/*.md`
- Downloads: `src/content/downloads/*.md`

## Cloudflare Pages deployment
- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20` or `22`
- No runtime server required (fully static output)

## Security notes
- Static-first architecture; no backend login, database, or user uploads.
- External forms should be linked/embedded from official Google/Microsoft Forms.
- External links use `rel="noopener noreferrer"`.
