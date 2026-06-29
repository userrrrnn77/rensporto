# Portfolio v1 — Frontend

Personal portfolio site, built with React + Vite, styled on Vercel's Geist design system. Full design rationale lives at [`/design.md`](./public/design.md) — also served live at `/design.md` once deployed.

## Stack

- **React 19** + **TypeScript**, bundled with **Vite**
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`)
- **React Router v7** for client-side routing
- **Framer Motion** for entrance animations and scroll-linked effects
- **lucide-react** + **react-icons** for iconography
- **sonner** for toast notifications

## Project structure

```
src/
├── assets/          # Project screenshots, static images
├── components/
│   ├── layout/       Navbar, Footer, Layout, CommentSection, etc.
│   └── ui/           Small reusable UI primitives (ThemeToggle, ...)
├── constants/        All copy and structured data — pages render this,
│                      nothing is hardcoded inline
├── context/          ThemeContext (light/dark)
├── hooks/             useGitHubStats, useCountUp
├── lib/
│   ├── api/           Mock API layer (comments, uploads) — same
│   │                  signatures the real backend endpoints will have
│   └── ...            cookies, guest identity, icon resolvers, validation
├── pages/             Home, About, Projects, ProjectDetail, Contact
└── types/             Shared TypeScript types (Comment, etc.)
```

### Why constants/ exists

Every piece of copy — nav links, hero text, footer columns, project cards,
skill lists — lives in `src/constants/*.ts`, re-exported from
`constants/index.ts`. Pages and components only ever import from there.
This is intentional: once the backend/CMS exists, these files get replaced
by API calls without touching component code.

### Mock API layer

`src/lib/api/comments.ts` and `src/lib/api/uploads.ts` simulate what the
real Express backend will do — same function names, same return shapes,
same thrown-error contract, just backed by `sessionStorage` instead of a
database. Swapping in the real backend means rewriting the *inside* of
these functions only.

The upload flow already assumes **presigned URLs**: the browser asks the
backend for a signed upload URL, then `PUT`s the file straight to storage
(Cloudinary or R2 — not decided yet) without the file ever touching our
server.

## Guest identity (comments)

There's no login for commenting. Each browser gets a `guestId` (UUID)
written to a cookie on first visit (`src/lib/guest.ts`). A comment can
only be edited or deleted by the browser whose `guestId` matches the
comment's. This is enforced both in the mock layer and is meant to be
enforced server-side too once the real API exists.

## Getting started

```bash
bun install
bun dev
```

```bash
bun run build     # tsc -b && vite build
bun run lint       # oxlint
bun run preview    # preview the production build locally
```

## Roadmap

- [ ] Express backend: comments, contact form (Web3Forms relay), presigned
      uploads to Cloudinary/R2
- [ ] Admin CMS (separate app) — manage projects, moderate comments, edit
      Home/About copy. Single-admin auth via env credentials, no
      user/role system.
- [ ] Replace `src/assets` screenshots with backend-hosted images once
      storage is wired up
- [ ] Featured-projects preview section on Home