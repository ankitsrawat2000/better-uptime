# BetterUptime

A full-stack uptime monitoring platform built as a **Turborepo monorepo**.

BetterUptime lets users sign up, add websites, and monitor availability/response time through a web dashboard. Monitoring jobs are distributed with Redis Streams so workers can process checks asynchronously.

## Architecture

The repository is organized into apps and shared packages:

### Apps

- `apps/frontend` — Next.js dashboard UI for authentication and website monitoring.
- `apps/api` — Express API for auth and website management endpoints.
- `apps/pusher` — periodic scheduler that pushes websites to a Redis Stream.
- `apps/worker` — stream consumer that checks website health and stores tick results.
- `apps/tests` — API integration tests.

### Packages

- `packages/store` — Prisma client and database schema (PostgreSQL).
- `packages/redisstream` — small Redis Stream client wrapper used by `pusher` and `worker`.
- `packages/eslint-config` / `packages/typescript-config` / `packages/ui` — shared tooling and UI package.

## Tech Stack

- **Monorepo & tooling:** Turborepo, TypeScript, Bun
- **Frontend:** Next.js 15, React 19, Tailwind CSS 4, lucide-react
- **Backend:** Express 5, JWT (`jsonwebtoken`), Zod, CORS
- **Data:** PostgreSQL + Prisma
- **Queueing:** Redis Streams
- **HTTP client/testing:** Axios + `bun:test`

## Request Flow

1. User signs up/signs in via the API.
2. User adds websites from the frontend dashboard.
3. `pusher` periodically reads websites from DB and pushes jobs to Redis Stream.
4. `worker` consumes jobs, makes HTTP checks, and writes uptime ticks to DB.
5. Frontend fetches website + latest tick data from the API.

## Prerequisites

- **Node.js** >= 18
- **Bun** (repo is configured with `packageManager: bun@1.2.6`)
- **PostgreSQL**
- **Redis**

## Environment Variables

Create environment files as needed for local development:

- `DATABASE_URL` — PostgreSQL connection string (used by Prisma/store)
- `JWT_SECRET` — secret used by API for signing/verifying tokens
- `PORT` — API port (defaults to `3001`)
- `REGION_ID` — worker consumer group identifier
- `WORKER_ID` — unique worker identifier within a consumer group

## Setup

From the repository root:

```bash
bun install
```

Generate Prisma client (from `packages/store`):

```bash
cd packages/store
bunx prisma generate
# optionally apply migrations
bunx prisma migrate deploy
cd ../..
```

## Run the System

You can run all workspace dev tasks with Turbo:

```bash
bun run dev
```

Or run services independently (recommended for understanding the architecture):

```bash
# Terminal 1: API
cd apps/api
bun run index.ts

# Terminal 2: Frontend
cd apps/frontend
bun run dev

# Terminal 3: Pusher
cd apps/pusher
bun run index.ts

# Terminal 4: Worker
cd apps/worker
REGION_ID=region-1 WORKER_ID=worker-1 bun run index.ts
```

Frontend: `http://localhost:3000`  
API: `http://localhost:3001`

## Testing

Run integration tests:

```bash
cd apps/tests
bun test
```

> Make sure the API, PostgreSQL, and Redis are running before executing tests.

## Monorepo Scripts

From root `package.json`:

- `bun run dev` — run dev tasks across workspaces
- `bun run build` — build all apps/packages
- `bun run lint` — lint workspaces
- `bun run check-types` — type-check workspaces
- `bun run format` — format `ts/tsx/md` files
