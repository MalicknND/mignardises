# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Always use `yarn` (never npm or npx directly):

```bash
yarn dev          # Start dev server with Turbopack
yarn build        # Production build
yarn lint         # ESLint

# Database (use :dev variants for local development)
yarn db:generate:dev     # Generate Prisma client (uses .env.local)
yarn db:migrate:dev      # Create and apply migration
yarn db:push:dev         # Push schema changes without migration
yarn db:status:dev       # Check migration status
yarn db:migrate-reset:dev  # Reset all migrations
```

For Stripe webhooks in local development, run the Stripe CLI listener separately.

## Architecture

### Route Groups

The `app/` directory uses Next.js route groups:
- `(authentication)/` — Login, signup, forgot-password pages (public, listed in `authRoutes` in `middleware.ts`)
- `(logged)/` — Protected pages (listed in `protectedRoutes` in `middleware.ts`)
- `(public)/` — Public marketing pages (listed in `publicRoutes` in `middleware.ts`)
- `api/` — API routes, organized by feature (auth, stripe, etc.)

**When adding a new route**, update the corresponding array (`publicRoutes`, `authRoutes`, or `protectedRoutes`) in `middleware.ts`.

### Server Actions Pattern

All server actions use the `createAction` wrapper from `lib/actions/action-wrapper.ts`. Actions live in `_actions/` folders co-located with their feature route. They return `{ data?, success?, error? }` and accept an optional `IPostAction` for post-mutation `revalidateTag` or `redirect`.

When a server action calls an API route internally, use `customFetch` from `lib/fetch.ts` (automatically forwards session cookies and sets `NEXT_PUBLIC_BASE_URL` as base).

### API Routes Pattern

Protected API routes use the `withAuth` wrapper from `lib/auth/auth-check.ts`, which validates the session and optionally checks `Role` (from `lib/generated/prisma`).

### Data Fetching

- **Small, one-off Prisma queries**: run directly inside `async` server components or page files.
- **Reusable / complex queries**: extract to `lib/prisma/` as named query helpers, export the return type via `Prisma.PromiseReturnType`.

### Prisma

The Prisma client is generated to `lib/generated/prisma` (not the default location). Import the client from `@/lib/prisma` (not `@prisma/client`). Use `:dev` script variants locally (they load `.env.local` via `dotenv-cli`).

### Authentication

- Server-side auth checks: `auth.api.getSession()` from `lib/auth` (better-auth).
- Client-side: use hooks/functions exported from `lib/auth/auth-client.ts` (`signIn`, `signUp`, `signOut`, `useSession`, etc.).
- `requiredAuth()` from `lib/auth/auth-utils.ts` is a convenience helper for server components in protected routes.

### Project Config

`config/project.ts` is the single place to toggle features (auth, dark mode, Stripe) and define Stripe plans. Stripe price IDs come from env vars; the `stripe` client in `lib/stripe.ts` is `undefined` when `STRIPE_SECRET_KEY` is not set.

### Supabase

Used for file storage (not as the primary auth or ORM). Two helpers in `lib/supabase.ts`:
- `getSupabaseAdmin()` — service role, no session
- `getSupabaseClient()` — passes the better-auth session token as `Authorization` header

### Types

Shared TypeScript interfaces and enums live exclusively in `types/`. Use `PageParams<T>` from `types/next.ts` for page/layout props (params and searchParams are async in Next.js 15).

### UI

- Shadcn/UI components in `components/ui/`
- Navigation/layout components in `components/layouts/`
- Provider wrappers in `components/providers/`
- Page-specific components in `_components/` folders next to the relevant `page.tsx`
- Icons: `lucide-react` only
- Dates: `date-fns` only
- URL state: `nuqs`
- Forms: React Hook Form + Zod; schemas in `lib/schemas/`; use `components/common/form-builder.tsx` for new forms

### Styling

Tailwind CSS v4 only. Theme customization lives in `app/globals.css` (single file for all theme variables). Do not use a `tailwind.config.ts` for theme — v4 manages it via CSS.

## Key Conventions

- TypeScript everywhere; prefer `type` over `interface` (interfaces only in `types/`)
- Avoid enums in code — use plain objects/maps; enums only in `types/` or Prisma schema
- No comments in code
- Functional components only, no classes
- Minimize `use client` — default to Server Components; add `'use client'` only for interactivity or Browser API access
- Wrap client components needing async data in `<Suspense>`
