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

 - `GET /models` — list registered models (server JSON store)
 - `POST /models` — create model { name, description, version }
 - `PUT /models/:id` — update model
 - `DELETE /models/:id` — delete model
Notes

Keep your service role key secret. Use this backend when you need server-side access to Supabase.

The models endpoints use a JSON file under `server/data/models.json` for simple persistence. This is suitable for development and small deployments.

Admin protection

Set `ADMIN_API_KEY` in `server/.env` and include the header `x-admin-key: <ADMIN_API_KEY>` in requests to the models endpoints. If the key is missing or invalid the server will return `401 Unauthorized`.
