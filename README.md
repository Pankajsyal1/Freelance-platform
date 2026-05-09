# Freelance Project Marketplace

Full-stack MVP for an Upwork-style marketplace where Clients post jobs and Freelancers bid.

## Included in this implementation

- NestJS backend API with:
  - JWT authentication (`/auth/register`, `/auth/login`)
  - Role-based access control (`client`, `freelancer`, `admin`)
  - User profile endpoint (`/users/me`)
  - Job posting and listing (`/jobs`)
  - Bid workflow (`/bids`, `/bids/job/:jobId`, `/bids/:id/status`)
  - Job-scoped messaging (`/messages`, `/messages/job/:jobId`)
  - Swagger docs at `/docs`
- React frontend starter with:
  - Auth page
  - Jobs browse page

## Project structure

- `backend/` NestJS API code
- `frontend/` React app code

## Quick start

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
# Run with your preferred React toolchain (Vite/CRA). App source is in src/
```

## Notes

- This MVP uses in-memory arrays as a persistence layer in services for simplicity.
- Swap in Prisma + PostgreSQL by replacing service storage with repository/database access.
