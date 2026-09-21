# Job Tracker

A full-stack app for tracking job applications through a pipeline (applied, interviewing, offer, rejected).

**Status:** early scaffold. Features are being built incrementally.

## Stack

- **Web:** Next.js (App Router), TypeScript, Tailwind CSS
- **API:** NestJS, TypeScript
- **Database:** PostgreSQL
- **Infra:** Docker Compose

## Run it

```bash
docker compose up --build
```

- Web: http://localhost:3000
- API: http://localhost:3001

## Planned

- [ ] Email/password auth
- [ ] Applications CRUD
- [ ] Status pipeline with filtering
- [ ] Dashboard chart
- [ ] Jest + Supertest API tests, Playwright end-to-end tests
- [ ] GitHub Actions CI
- [ ] Deployment
