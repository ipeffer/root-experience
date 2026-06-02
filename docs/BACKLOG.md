# MVP Backlog (GitHub Issues Draft)

Use these as initial GitHub issues. Labels in brackets are suggested.

## Epic A - Foundation
1. **Initialize Next.js + TypeScript + Tailwind skeleton** `[foundation]`
2. **Set up global i18n scaffolding (en/it, ru optional)** `[foundation][i18n]`
3. **Add shared Zod schema package structure** `[foundation][validation]`
4. **Define app-level form consent components and policy copy keys** `[foundation][legal]`

## Epic B - Gift Constructor
5. **Design gift preference question model and answer types** `[gift]`
6. **Implement Gift Constructor UI flow (no checkout)** `[gift][frontend]`
7. **Implement Shopify URL mapping service for gift outcomes** `[gift][integration]`
8. **Implement fallback lead capture when no direct mapping exists** `[gift][backend]`
9. **Track gift submission and redirect events** `[gift][analytics]`

## Epic C - Booking Assistant
10. **Define booking request schema and lifecycle statuses** `[booking][backend]`
11. **Implement Booking Assistant form with validation + consent** `[booking][frontend]`
12. **Create booking request persistence service (Supabase)** `[booking][supabase]`
13. **Build booking success state with non-confirmation messaging** `[booking][ux]`

## Epic D - Notifications
14. **Implement email notification adapter (Resend)** `[notifications]`
15. **Implement Telegram notification adapter** `[notifications]`
16. **Create notification orchestration with retries + event log** `[notifications][backend]`

## Epic E - Quality and Ops
17. **Add Playwright smoke tests for both modules** `[qa][playwright]`
18. **Add multilingual content completeness checks** `[qa][i18n]`
19. **Create Vercel deployment configuration and env validation** `[devops]`
20. **Prepare launch runbook and rollback plan** `[ops]`

## Stretch (post-MVP)
- Admin dashboard
- TODO: replace temporary `/admin` password gate with full Supabase Auth admin sign-in flow
- CRM integration
- Automated reminder workflows
