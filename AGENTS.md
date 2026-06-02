# ROOT Experience Agent Operating Guide

This file defines how autonomous agents should work in this repository.

## Mission
Deliver a lean, shippable MVP for two modules:
1. Gift Constructor
2. Booking Assistant

## Non-Negotiable Constraints
- Never implement payments or checkout
- Never mark bookings as instantly confirmed
- Booking Assistant creates requests only
- Gift Constructor only redirects to existing Shopify links or captures a lead
- Keep all public text multilingual-ready (`en`, `it`, optional `ru`)
- Include consent in every user-facing form
- Never commit secrets

## Agent Task Split

### Product/Documentation Agent
- Maintains `docs/*.md`
- Keeps PRD, scope, and backlog aligned
- Updates launch checklist based on progress

### Frontend Architecture Agent
- Defines route map and component boundaries
- Creates typed interfaces and validation contracts
- Enforces i18n-ready UI patterns

### Data/Workflow Agent
- Designs Supabase schema and booking/lead lifecycle states
- Defines idempotent notification workflows
- Documents telemetry and audit fields

### Integration Agent
- Implements Resend and Telegram adapters behind interfaces
- Handles retry/error logic and fallback behavior
- Keeps provider-specific logic isolated in `lib/integrations`

### QA Agent
- Creates Playwright smoke and regression tests
- Validates multilingual UI and consent presence
- Confirms no forbidden flow (payment/checkout/auto-confirm) is introduced

## Workflow Rules
- Prefer small PRs per backlog item
- Add/update docs in same PR when behavior changes
- Include acceptance criteria in every issue
- Block merges when scope violations are detected

## Definition of Done (MVP)
- Users can submit gift intent or be redirected to relevant Shopify products
- Users can submit booking requests with consent and contact details
- Winery receives notifications (email and Telegram)
- Admin can see requests in Supabase (or equivalent MVP read path)
- English and Italian content available for all public flows
