# Gradewise Backend

This is a minimal Express + TypeScript backend that proxies safe server-side Supabase operations.

Setup

1. Copy `.env.example` to `.env` inside `server/` and set values (use your Supabase project URL and Service Role key).
2. From `server/` install dependencies:

```bash
npm install
```

Run (development):

```bash
npm run dev
```

API endpoints

- `GET /assignments` — returns assignments from Supabase `assignments` table
- `POST /submissions` — create a submission (body forwarded to Supabase `submissions` table)

Notes

Keep your service role key secret. Use this backend when you need server-side access to Supabase.
