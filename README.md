# Judgify Web

React + TypeScript + Vite frontend for [Judgify](../judgify), a LeetCode-style
coding-problem platform. The UI reads live data from the Judgify Spring API.

## Running locally

```bash
# 1. Start the backend (in the judgify repo)
docker compose up -d          # MySQL 8 on :3306
./gradlew :api:bootRun        # REST API on :8080

# 2. Seed demo data — with the judge worker stopped, or it will re-judge the
#    seeded history and overwrite its backdated verdicts
npm run seed                  # or: npm run seed -- --keep

# 3. Start the judge worker, so new submissions actually get judged
docker pull python:3.12-slim && docker pull gcc:13.3   # once
./gradlew :worker:bootRun

# 4. Start the frontend
npm run dev                   # http://localhost:5173
```

Vite proxies `/api` to `http://localhost:8080` (override with `JUDGIFY_API_URL`),
so the browser stays same-origin and the backend needs no CORS configuration.
Set `VITE_API_URL` to point the client at an absolute API base instead.

Seeded accounts: `alexdev` / `alex12345` (regular user) and `admin` / `admin1234`
(admin — the only role that may read test cases).

## How data flows

| Surface | Endpoint |
| --- | --- |
| Login / Register | `POST /auth/login`, `POST /auth/register` |
| Problems list | `GET /problems` |
| Problem detail | `GET /problems/{slug}` |
| Sample test cases | `GET /admin/problems/{id}/test-cases` (admin only) |
| Submit code | `POST /problems/{id}/submissions` |
| Submission result | `GET /submissions/{id}` (polled while pending) |
| Submission history | `GET /problems/{id}/submissions` |

The API exposes no aggregate endpoints, so acceptance rates, solve status,
streaks, the activity heatmap and the daily challenge are derived in
`src/lib/derive.ts` from one fan-out (`src/lib/data/OverviewProvider.tsx`):
the problem list plus one submission list per problem.

Still mock, because there is no endpoint for it: the leaderboard
(`src/data/leaderboard.ts`) and the skill matrix / achievement badges
(`src/data/placeholders.ts`).

Two fields render as `—` by design: memory usage, which the Docker sandbox does
not measure, and the submitted source code, which the API does not return.

## Scripts

```bash
npm run dev       # dev server
npm run build     # typecheck + production build
npm run lint      # eslint
npm run seed      # seed the backend with demo data
```
