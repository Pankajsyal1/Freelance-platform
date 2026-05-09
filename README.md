# Freelance Project Marketplace

A simplified Upwork-style marketplace where **Clients** post projects and **Developers/Freelancers** submit bids.

## Tech Stack

- **Backend:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma (recommended) or TypeORM
- **Frontend:** React.js
- **API Docs:** Swagger (OpenAPI)

## Core Domain Roles

- **Client**
  - Creates and manages job posts
  - Reviews bids
  - Accepts/rejects bids
- **Freelancer**
  - Browses open jobs
  - Submits bids/proposals
  - Tracks accepted/rejected status
- **Admin (optional)**
  - Manages disputes, users, and moderation

## Key Features

1. **Dual User Profiles**
   - One authentication system with role-based capabilities
   - Profile metadata specific to Clients and Freelancers

2. **Job Posting & Bidding**
   - Clients create jobs with title, scope, budget, deadline, and skills
   - Freelancers place bids with proposal text, amount, and estimated timeline

3. **Messaging for Project Discussion**
   - Threaded conversations per job or accepted contract
   - Read/unread status and audit timestamps

## Suggested Backend Modules (NestJS)

- `auth` (JWT authentication, refresh tokens)
- `users` (profile + role management)
- `jobs` (job CRUD and publish workflow)
- `bids` (create/manage bids and status transitions)
- `messages` (conversation and message delivery)
- `contracts` (optional accepted-bid lifecycle)
- `notifications` (optional in-app/email events)

## RBAC Strategy (NestJS Focus)

Use a combination of:

- `JwtAuthGuard` for authenticated routes
- `RolesGuard` for role checks (`client`, `freelancer`, `admin`)
- Custom decorators like `@Roles(...)`
- Ownership checks (e.g., only job owner can close posting)

Example authorization rules:

- Only **Clients** can create jobs.
- Only **Freelancers** can bid.
- Only job owner can accept a bid on that job.
- Only conversation participants can read/send messages in a thread.

## Data Model (High Level)

- `User`
  - id, email, passwordHash, role, createdAt
- `ClientProfile`
  - userId (1:1), companyName, about
- `FreelancerProfile`
  - userId (1:1), headline, skills, hourlyRate
- `Job`
  - id, clientId, title, description, budgetMin, budgetMax, status, createdAt
- `Bid`
  - id, jobId, freelancerId, amount, proposal, status, createdAt
- `Conversation`
  - id, jobId/contractId, createdAt
- `ConversationParticipant`
  - conversationId, userId
- `Message`
  - id, conversationId, senderId, body, createdAt
- `Contract` (optional)
  - id, jobId, acceptedBidId, status, startedAt, endedAt

## DTO & Validation Conventions

Use structured DTOs with `class-validator` + `class-transformer`:

- `CreateJobDto`
- `UpdateJobDto`
- `CreateBidDto`
- `UpdateBidStatusDto`
- `SendMessageDto`

Best practices:

- Validate all payloads at controller boundaries
- Prefer explicit enums for job/bid/contract states
- Return paginated list responses for jobs, bids, and messages

## API Documentation

Enable Swagger in `main.ts` and document:

- Authentication scheme (Bearer JWT)
- Role requirements by endpoint
- Request/response DTO examples
- Error responses (401/403/404/422)

## Frontend (React.js) Pages

- Auth: Sign up / Sign in
- Client Dashboard: My Jobs, Incoming Bids
- Freelancer Dashboard: Browse Jobs, My Bids
- Job Detail: Bids + discussion thread
- Messaging Inbox

## Delivery Roadmap (MVP)

1. Auth + user roles
2. Job CRUD (client-only create/update)
3. Bid submission + acceptance flow
4. Messaging between client and selected freelancer
5. Swagger coverage + basic tests

## Why This Project Works for NestJS

- Demonstrates **RBAC and Guard composition** clearly
- Leverages **DTO-driven APIs** with robust validation
- Exercises **relational modeling** in PostgreSQL through Prisma/TypeORM
- Produces a professional, testable API contract via Swagger
