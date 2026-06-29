---
version: 1.0
name: Rendy Portfolio
description: Design system for this portfolio. Built on top of Vercel's Geist (Light + Dark), with layout patterns inspired by nextjs.org.
basedOn:
  - https://vercel.com/design.md
colors:
  primary: "#171717"
  secondary: "#4d4d4d"
  tertiary: "#006bff"
  neutral: "#f2f2f2"
  background-100: "#ffffff"
  background-200: "#fafafa"
  gray-100: "#f2f2f2"
  gray-1000: "#171717"
  blue-700: "#006bff"
  red-700: "#fc0035"
  green-700: "#28a948"
typography:
  font-sans: "Geist"
  font-mono: "Geist Mono"
darkMode:
  strategy: "class"
  toggleClass: ".dark"
  storage: "cookie"
---

# Rendy — Portfolio Design

This file documents the design decisions behind this portfolio, the way
`vercel.com/design.md` documents Geist. It's meant to be read by humans
and by AI tools working on this codebase — colors, type, spacing, and the
reasoning behind layout choices all live here so nothing has to be
reverse-engineered from the CSS later.

This is **not** a general-purpose design system. It's this one site's
design contract.

## Foundation: Geist

All color, typography, spacing, radius, and shadow tokens are Vercel's
Geist design system, unmodified. The full token tables and rationale are
documented at `vercel.com/design.md` (light theme) — this file only
covers what's specific to this portfolio: how those tokens get used, and
where this site's layout deviates from a generic Geist page.

Tokens are wired into Tailwind v4 via `@theme inline` in `src/index.css`,
so `bg-background-100`, `text-gray-900`, `border-gray-alpha-400`, etc. are
available directly as utility classes — never raw hex values in
components.

## Dark mode

Implemented via a `.dark` class on `<html>`, toggled by `ThemeContext`
(`src/context/ThemeContext.tsx`). The Tailwind `dark:` variant is enabled
with a custom variant matching that class:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Preference is persisted as a **cookie** (not localStorage) so it's
consistent across tabs and would be readable server-side if this app ever
grows an SSR layer. A small inline script in `index.html` applies the
theme class before first paint, so there's no flash of the wrong theme on
load.

## Layout language

Pages follow a loose nextjs.org rhythm: a centered hero with an eyebrow
badge, a large heading, a subheading, and one or two CTAs — followed by
content sections that alternate between `background-100` and
`background-200` to create separation without heavier borders or shadows.

- Max content width: `max-w-300` (1200px), matching Geist's documented
  column width.
- Section vertical rhythm: `py-20` to `py-28` per section, `pt-24`/`pt-32`
  for the hero specifically.
- The hero's `.bg-grid-fade` background (a faint dot/line grid fading out
  radially) is a custom utility, not a Geist token — used sparingly, hero
  sections only.

## Content is data, not markup

Every string a visitor reads — nav labels, hero copy, footer columns,
project cards, skill lists, FAQ-style content — lives in
`src/constants/*.ts`, re-exported through `constants/index.ts`. Pages
import from there and render; they never inline copy.

This is a deliberate constraint ahead of the CMS: when the admin dashboard
exists, these constants files get replaced by API responses with the same
shapes. No component should need to change when that happens — only the
data source does.

## Guest-owned content (comments)

Comments don't require login. Each browser is assigned a `guestId`
(UUID v4), persisted as a 1-year cookie on first visit
(`src/lib/guest.ts`). A comment can only be edited or deleted by whichever
browser holds the matching `guestId` — there's no account system, the
cookie *is* the identity.

Image attachments on comments use a **presigned upload** flow: the
backend issues a short-lived signed URL (Cloudinary or R2), the browser
`PUT`s the file straight to storage, and only the resulting public URL
ever reaches our server. The server never receives file bytes.

## Mock-to-real API contract

`src/lib/api/*.ts` functions are written to match the real backend
endpoints exactly — same function signature, same return shape, same
"throws on failure" contract — but backed by `sessionStorage` for now.
Components call these functions and never know whether they're talking to
a mock or a live Express API. This is the seam where the backend gets
plugged in later, without touching anything upstream of it.

## What's intentionally not themed

Brand-specific iconography (GitHub, Instagram, TikTok) keeps each
platform's recognizable shape but is recolored to sit on the gray scale —
no platform brand colors appear in the UI. The only saturated colors used
anywhere are Geist's own accent scales (`blue` for links/focus/success,
`red` for destructive actions, `green` for "available" status), applied
exactly as Geist's own do/don't rules describe.