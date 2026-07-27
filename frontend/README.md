# Frontend

Next.js 16 (App Router) + React 19 + Tailwind CSS v4. The site itself —
static/SSR content plus two calls to the backend API (contact form,
GitHub projects).

See the [root README](../README.md) for the overall project architecture and
[`../PROJECT_STATUS.md`](../PROJECT_STATUS.md) for what's built vs. still to do.

## Running locally

```bash
npm install
cp .env.example .env.local   # points at the backend, defaults to localhost:8000
npm run dev                  # http://localhost:3000
```

Requires the backend (`../backend`) running locally for the contact form and
Projects section to work — see the backend README for setup.

## Before considering frontend work done

```bash
npm run lint
npm run build
```

## Structure

- `src/app/` — App Router pages, layout, global styles.
- `src/components/` — one component per site section (`Hero`, `About`,
  `Experience`, `Projects`, `Contact`/`ContactForm`, `LinkedInBadge`), plus
  shared `Header`/`Footer`.
- `src/lib/content.ts` — static resume content (experience, education,
  skills, featured project) rendered by the components above.
- `src/lib/api.ts` — typed client for the backend API (`GithubProject`,
  `ContactRequest`/`Response`) shared by the components that call it.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to load Geist. `frontend/AGENTS.md` has framework-specific conventions for
this Next.js version — read it before making Next.js-specific changes.
