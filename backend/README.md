# Backend

FastAPI. A small API that exists only to do two things the frontend can't do
statically: send contact-form email (needs a secret API key) and proxy the
GitHub API (needs a token to avoid rate limits, and to filter/sort
server-side). Everything else on the site is static content owned by the
frontend.

See the [root README](../README.md) for the overall project architecture and
[`../PROJECT_STATUS.md`](../PROJECT_STATUS.md) for what's built vs. still to do.

## Stack

FastAPI, Pydantic v2 / pydantic-settings, httpx (async HTTP client), uvicorn.
Optional async PostgreSQL (SQLAlchemy + `asyncpg`) for a contact-form backup log.

## Running locally

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env       # then fill in RESEND_API_KEY, GITHUB_USERNAME, etc.
uvicorn app.main:app --reload --port 8000
```

Health check: `GET http://localhost:8000/api/health`

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Liveness check |
| POST | `/api/contact` | Sends a contact-form email via Resend and best-effort saves a copy to the database (if configured). Has a honeypot field (`company`) for spam. |
| GET | `/api/github-projects` | Returns the configured GitHub user's public, non-fork repos, sorted by recency, limited to the 4 most recently updated. Cached 10 min in-memory. |

## Structure

- `app/main.py` — creates the FastAPI app, configures CORS, mounts routers.
- `app/config.py` — `Settings` (pydantic-settings), reads from `.env`. Never
  hardcode secrets — everything configurable lives here.
- `app/routers/` — one file per resource, each an `APIRouter` included in `main.py`.
- `app/db.py` / `app/db_models.py` — optional PostgreSQL persistence (see below).

## Database (optional)

Purely a backup log for contact-form submissions — nothing else in the app
needs persistence (GitHub data is live-fetched, LinkedIn is a static link).
The app runs fine with no database configured: contact-form email still
sends, it just isn't backed up anywhere.

1. Create a free project at [Supabase](https://supabase.com).
2. Copy the connection string and set `DATABASE_URL` in `.env`, using the
   `postgresql+asyncpg://` scheme (see `.env.example` for the exact format).
3. Tables are created automatically on startup (`init_db()` in `app/db.py`).
   `sql/create_contact_submission.sql` is the same schema for manual setup in
   Supabase's SQL editor, if preferred.

No read endpoint exists for submissions on purpose (avoids exposing an
unauthenticated endpoint with people's name/email/message) — query them
directly in Supabase's table editor.
