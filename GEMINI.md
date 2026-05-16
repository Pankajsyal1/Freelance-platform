# Freelance Project Marketplace

A full-stack MVP for a freelance marketplace (Upwork-style) where clients can post jobs and freelancers can bid on them.

## Architecture

This project is a monorepo using **npm workspaces**, consisting of:

- **`backend/`**: A NestJS REST API.
- **`frontend/`**: A React single-page application (SPA) powered by Vite.

### Backend Tech Stack
- **Framework**: NestJS
- **Authentication**: JWT with Passport.js
- **Validation**: `class-validator` & `class-transformer`
- **Documentation**: Swagger/OpenAPI (available at `/docs` when running)
- **Persistence**: Currently uses in-memory arrays (Mocks), but `prisma` is installed for future database integration.

### Frontend Tech Stack
- **Framework**: React (v18)
- **Build Tool**: Vite
- **Routing**: React Router (v6)
- **HTTP Client**: Axios

---

## Getting Started

### Root Commands
Run these from the project root:
- `npm install`: Install dependencies for all workspaces.
- `npm run lint`: Run ESLint across all workspaces.
- `npm run format:write`: Run Prettier and write changes.

### Backend
- `cd backend`
- `npm run start:dev`: Start the API in watch mode (default: http://localhost:3000).
- `npm run test`: Run Jest tests.
- `npm run build`: Build the production bundle.

### Frontend
- `cd frontend`
- `npm run dev`: Start the Vite dev server.

---

## Development Conventions

### Backend Patterns
- **Controllers/Services**: Follow standard NestJS architecture (separation of concerns).
- **DTOs**: Use Data Transfer Objects for request validation (`backend/src/*/dto.ts`).
- **Guards**: Role-based access control is implemented via `@Roles()` decorator and `RolesGuard`.
- **Security**: Protect sensitive routes with `JwtAuthGuard`.

### Frontend Patterns
- **State Management**: Simple React state; API calls handled via Axios.
- **Routing**: Centralized in `App.jsx`.
- **Pages**: Located in `src/pages/`.

### Shared Guidelines
- **Linting**: ESLint and Prettier configurations are shared at the root level. Ensure `npm run format:write` is run before committing.
- **Code Style**: Prefer functional components in React and class-based providers/controllers in NestJS.
- **Types**: Use TypeScript for backend; frontend is currently using JSX but TypeScript is encouraged for new components.
