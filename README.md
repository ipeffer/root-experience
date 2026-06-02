# ROOT Experience MVP

ROOT Experience is a standalone MVP product for ROOT Winery (Italy) that complements `rootwinery.it` and existing Shopify commerce.

## Goal
Help visitors:
- choose a wine-related gift
- submit booking requests for experiences (vineyard, wine, buggy, tasting)
- share contact details with the winery
- get redirected to existing Shopify product pages when relevant

## Product Boundaries
- No payment implementation
- No direct checkout
- No instant booking confirmation
- Booking Assistant creates requests only
- Gift Constructor either redirects to Shopify URLs or creates a lead request

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (data + storage as needed)
- Resend (email notifications)
- Telegram notifications
- Zod + React Hook Form
- Playwright (E2E)
- Vercel deployment

## Repository Layout
- `docs/` product and architecture documentation
- `.cursor/rules/` project-level AI guidance
- `app/` route handlers for public flows, admin route, and API endpoints
- `lib/` domain logic (recommendations, validation, submissions, notifications, admin auth)
- `config/` editable catalog data and flow configuration
- `supabase/` schema migrations and policy setup
- `tests/` unit/integration tests and Playwright public-flow smoke tests

## Multilingual Requirement
All public text must be localization-ready from day one.
Required locales:
- English (`en`)
- Italian (`it`)
Optional locale:
- Russian (`ru`)

## Security and Compliance
- Do not commit secrets
- Use `.env.example` as contract for required variables
- All forms must include consent text and consent capture

## Current Status
This repository contains an implemented MVP skeleton with:
- public Gift Constructor and Booking Assistant flows
- submission persistence paths for gift leads and booking requests
- optional email/Telegram admin notifications
- an internal admin dashboard route protected by auth checks
- automated quality gates via Vitest and Playwright

See `docs/MVP_SCOPE.md` for boundaries and `docs/BACKLOG.md` for remaining launch tasks.
