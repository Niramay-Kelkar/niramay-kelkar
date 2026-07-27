# Niramay Kelkar — Portfolio

Personal portfolio site. Two-app monorepo: a Next.js frontend and a FastAPI
backend, developed and deployed independently.

## Architecture

```
niramay-kelkar/
├── frontend/   Next.js 16 (App Router) + React 19 + Tailwind v4 — the site itself
└── backend/    FastAPI — small API for things the frontend can't do statically
```

The frontend is a static/SSR site. The backend exists only to do two things
the frontend cannot do on its own: send contact-form email (needs a secret
API key) and proxy the GitHub API (needs a token to avoid rate limits, and to
filter/sort server-side). Everything else on the site is static content
owned by the frontend.

See [`frontend/README.md`](frontend/README.md) and
[`backend/README.md`](backend/README.md) for setup instructions for each app.

## Data sources

- **GitHub — live, via the backend.** `GET /api/github-projects` calls the
  GitHub REST API server-side and returns the 4 most recently updated public,
  non-fork repos.
- **LinkedIn — intentionally static.** LinkedIn has no public API for posts,
  work history, or profile data, so rather than scrape it (against their
  Terms of Service) or pay for a third-party scraping API, the site links
  out to the LinkedIn profile as a plain badge/button — no backend endpoint,
  no credentials, no scheduled job.

## Tech stack

**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion.

**Backend:** FastAPI, Pydantic v2, httpx, uvicorn, optional async PostgreSQL
(Supabase) for a contact-form backup log.

## License

Personal project — not licensed for reuse.
