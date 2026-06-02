# Architecture (MVP Draft)

## System Overview
A Next.js App Router frontend collects user input and sends validated requests to server actions or API routes.
Requests are stored in Supabase and trigger notifications through Resend and Telegram.

## Components
- **Web App**: Next.js App Router (UI + server handlers)
- **Validation Layer**: Zod schemas shared across client/server boundaries
- **Persistence**: Supabase tables for requests, contacts, consent snapshots
- **Notifications**: Resend email + Telegram bot messages
- **Hosting**: Vercel

## Proposed Module Boundaries
- `app/`: routes, layouts, server handlers
- `components/`: UI and form components
- `lib/validation`: Zod schemas
- `lib/services`: use-case orchestration (gift recommendation, booking request creation)
- `lib/integrations`: Supabase/Resend/Telegram adapters
- `config/`: locale config, feature flags, constants
- `tests/`: Playwright suites + fixtures

## Data Flow
1. User opens module in selected locale
2. User submits form with consent checkbox
3. Payload validated with Zod
4. Service writes record to Supabase
5. Notification fan-out to Resend and Telegram
6. UI returns success state and next step (including Shopify redirect where relevant)

## Reliability and Safety
- Request IDs generated server-side
- Server-side re-validation for all submissions
- Notifications handled with retry-safe service wrappers
- Logs redact personal data where possible

## i18n Strategy
- All static strings behind translation keys
- Locale resolved from route segment or default config
- No hardcoded public copy in components

## Suggested Initial Schema (high level)
- `gift_leads`
- `booking_requests`
- `consents`
- `notification_events`

See `docs/CONTENT_MODEL.md` for detailed field draft.

## Deployment Topology
- Vercel project for app runtime
- Supabase project for data persistence
- External providers: Resend, Telegram
