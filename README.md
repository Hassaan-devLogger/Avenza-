# Citizen Portal — DESC Mardan

**Digital Innovation Center** | Cloud-Native Citizen Services Platform

---

## Quick Start (One Command)

```bash
# 1. Clone & setup
cp .env.example .env

# 2. Spin up everything
docker compose up --build

# 3. Open in browser
# Frontend:  http://localhost:3000
# Backend:   http://localhost:3001
# API Docs:  http://localhost:3001/api/docs
```

That's it. PostgreSQL, Redis, Backend, and Frontend all start automatically.

---

## Tech Stack

| Layer          | Technology              |
|----------------|-------------------------|
| Frontend       | Next.js 14, TypeScript, Tailwind CSS |
| Backend        | NestJS 10, TypeScript   |
| Database       | PostgreSQL 16           |
| Cache          | Redis 7                 |
| Containerization | Docker + Docker Compose |
| Auth           | JWT (Bearer tokens)     |
| API Docs       | Swagger / OpenAPI       |

---

## Project Structure

```
citizen-portal/
├── frontend/                  # Next.js application
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   └── dashboard/         # Protected dashboard
│   │       ├── page.tsx       # Dashboard home
│   │       └── document-request/  # Document request service
│   ├── lib/
│   │   ├── api.ts             # Axios API client
│   │   └── auth.tsx           # Auth context & hooks
│   └── Dockerfile
│
├── backend/                   # NestJS application
│   └── src/
│       ├── auth/              # JWT auth (login, register, me)
│       ├── users/             # User management
│       ├── applications/      # Document request service
│       ├── health/            # Health check endpoint
│       └── app.module.ts
│   └── Dockerfile
│
├── docker-compose.yml         # Full stack orchestration
├── .env.example               # Environment template
└── README.md
```

---

## API Endpoints

```
POST   /api/auth/register       Register new citizen
POST   /api/auth/login          Login
GET    /api/auth/me             Get current user (JWT required)

POST   /api/applications        Submit new request
GET    /api/applications        List my applications
GET    /api/applications/stats  Get application statistics
PATCH  /api/applications/:id/status  Update status (admin)

GET    /api/health              Health check (used by K8s probes)
```

---

## Environment Variables

```bash
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend
NODE_ENV=development
PORT=3001
JWT_SECRET=<change-in-production>
JWT_EXPIRY=7d

# PostgreSQL
DB_HOST=postgres
DB_PORT=5432
DB_NAME=citizen_portal
DB_USER=postgres
DB_PASSWORD=postgres

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
```

---

## Docker Commands

```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs -f

# Stop all
docker compose down

# Reset (delete data too)
docker compose down -v && docker compose up --build

# Scale backend (for demo)
docker compose up --scale backend=3
```

---

## Kubernetes Readiness

This application is designed for K8s deployment:

- ✅ Stateless containers (no local file storage)
- ✅ Externalized config (env vars / ConfigMaps)
- ✅ `/api/health` endpoint for liveness & readiness probes
- ✅ Multi-stage Docker builds (minimal image size)
- ✅ No server-side sessions (JWT only)
- ✅ Docker Compose → K8s migration is straightforward

---

## Live Demo Steps (for Evaluation Board)

```bash
# Step 1: Show the repo structure
ls -la

# Step 2: Spin up from zero
docker compose up --build

# Step 3: Demo the app
# - Register a new citizen account
# - Submit a document request
# - Show reference number + status tracking

# Step 4: Show scaling (Docker)
docker compose up --scale backend=3

# Step 5: Show health endpoint
curl http://localhost:3001/api/health

# Step 6: Show API docs
open http://localhost:3001/api/docs
```

---

## Security

- Passwords hashed with bcrypt (10 rounds)
- JWT authentication on all protected routes
- Input validation via class-validator (DTOs)
- CORS configured per environment
- No secrets committed to codebase

---

*Built for DESC Mardan Digital Innovation Center — Cloud-Native Architecture Proposal*
