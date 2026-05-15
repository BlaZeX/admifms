# ADMIFMS Website

A production-ready, static Astro website for **Alkesh Dinesh Mody Institute for Financial and Management Studies (ADMIFMS)**, a department of the University of Mumbai.

The website is designed for Cloudflare Pages, low-maintenance content editing, and secure static publishing without a database or backend admin system.

## Tech stack

- Astro static output
- Plain CSS in `src/styles/global.css`
- Astro content collections for notices, events, faculty, downloads, gallery, publications, and placement reports
- Minimal JavaScript; navigation uses semantic HTML
- Sitemap generation via `@astrojs/sitemap`

## Run locally

Use Node.js 20 or 22.

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deploy on Cloudflare Pages

Use these settings:

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `20` or `22`
- Runtime: none required; the site is fully static

## How to add a notice

Create a Markdown file in `src/content/notices/`:

```md
---
title: Examination Notice
date: 2026-06-01
category: Examination
description: Short summary of the notice.
fileUrl: /downloads/example-notice.pdf
isImportant: true
---
```

If using a PDF, place it in `public/downloads/` and link to it with `/downloads/file-name.pdf`, or use an approved external URL.

## How to add an event

Create a Markdown file in `src/content/events/`:

```md
---
title: Research Seminar
date: 2026-07-10
location: ADMIFMS Seminar Hall
category: Academic
status: upcoming
description: Short event description.
---
```

Allowed `status` values are `upcoming` and `past`.

## How to add a faculty profile

Create a Markdown file in `src/content/faculty/`:

```md
---
name: Faculty Name
designation: Assistant Professor
qualification: Ph.D. / NET / MBA
email: faculty.email@example.invalid
areas: [Finance, Research Methods]
bio: Brief faculty biography.
publications: ["Publication title if approved"]
---
```

Do not add faculty names or publication claims unless approved by the institute.

## How to add a placement report

Create a Markdown file in `src/content/placementReports/`:

```md
---
title: Placement Report 2026
year: 2026
category: Placement Report
fileUrl: /downloads/placement-report-2026.pdf
description: Approved placement report.
approved: true
---
```

Only reports with `approved: true` are displayed on the placements page. Do not publish salary figures, recruiter names, percentages, or outcomes unless formally approved.

## How to update programme content

Programme content is maintained in `src/data/programmes.js`.

Each programme includes:

- slug
- title and short title
- degree type
- level
- duration placeholder
- overview
- who should apply
- curriculum
- learning outcomes
- career pathways
- teaching-learning approach

Official routes use `programmes`, not `programs`:

- `/programmes/mms/`
- `/programmes/msc-finance/`
- `/programmes/bms/`
- `/programmes/bms-mms-integrated/`
- `/programmes/bcom-retail-operations-management/`
- `/programmes/phd/`

## How to add gallery photos

Create or edit a Markdown file in `src/content/gallery/`:

```md
---
title: Seminar Album
date: 2026-05-01
category: Academic Events
description: Approved seminar photo album.
coverImage: /images/gallery/seminar-cover.jpg
images:
  - /images/gallery/seminar-1.jpg
  - /images/gallery/seminar-2.jpg
---
```

Place approved images in `public/images/gallery/`. Do not use random internet images.

## Content editing notes for non-developers

- Most updates are made by editing Markdown files under `src/content/`.
- Keep descriptions short and factual.
- Use “Details to be updated by the institute.” where data is not final.
- Do not publish fees, intake, placement outcomes, recruiter names, rankings, or photographs without approval.
- Keep PDF filenames simple and place approved PDFs in `public/downloads/`.

## Security notes

- Fully static website; no database and no backend login.
- No public admin panel, authentication, user uploads, or server-side forms.
- External enquiry forms should be Google Forms or Microsoft Forms links only.
- External links opened in a new tab use `rel="noopener noreferrer"`.
- No secrets or API keys are required.
- Sitemap and robots files are generated/configured for crawlability.
