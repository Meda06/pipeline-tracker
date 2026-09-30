# Pipeline Tracker

A full-stack app for tracking applications through the stages of a pipeline (for example: applied, interviewing, offer, rejected).

**Status:** API core is working (CRUD + unit tests). Front end, auth and e2e tests are next. See **Progress** below for exact state.

## Stack

- **Web:** Next.js (App Router), TypeScript, Tailwind CSS — scaffolded, not yet wired to the API
- **API:** NestJS, TypeScript
- **Database:** PostgreSQL via Prisma (Supabase-hosted for local dev)
- **Infra:** Docker Compose

## Run it

Local dev (API against the Supabase database, needs `api/.env` filled in — see `.env.example`):
```bash
cd api && npm run start:dev
```

Full stack via Docker (local Postgres, not Supabase):
```bash
docker compose up --build
```
- Web: http://localhost:3000
- API: http://localhost:3001

Run the API's unit tests:
```bash
cd api && npm test
```

## Progress

- [x] Repo scaffolded: Next.js + NestJS + Docker Compose
- [x] Prisma set up against Supabase Postgres, `Application` model + first migration
- [x] Applications CRUD (create, list with status filter, get one, update, delete) with DTO validation
- [x] Unit tests: `ApplicationsService` and `ApplicationsController` (mocked Prisma/service, no real DB)
- [ ] End-to-end test (Supertest) against a disposable local Postgres via Docker Compose — in progress
- [ ] Email/password auth (JWT)
- [ ] Front end: connect Next.js to the API, build the UI
- [ ] Dashboard chart
- [ ] GitHub Actions CI
- [ ] Deployment

## Notes for picking this up in a new session

- `api/prisma/schema.prisma` is the source of truth for the data model; `api/prisma/migrations/` has the applied history.
- `api/src/applications/` is the reference pattern (controller, service, DTOs, tests) for any future module (e.g. auth).
- `api/.env` is git-ignored and holds real secrets — never commit it, never print its contents.
- `git log --oneline` tells the real, current story better than this file can; keep this checklist updated, but trust the commits and the code over memory of what "should" be done.
