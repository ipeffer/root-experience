# Deployment Plan

## Target Platform
- Runtime: Vercel
- Database: Supabase
- Notifications: Resend + Telegram

## Environments
- `development` (local)
- `preview` (Vercel preview)
- `production` (Vercel production)

## Deployment Steps (MVP)
1. Create Vercel project and connect GitHub repo
2. Configure environment variables from `.env.example`
3. Provision Supabase project
4. Add required tables and row-level policies (if needed)
5. Configure Resend sender and recipient routing
6. Configure Telegram bot token and chat ID
7. Deploy to preview and run Playwright smoke tests
8. Promote to production after checklist sign-off

## Rollback Strategy
- Keep previous Vercel deployment ready for instant rollback
- Disable notifications via env toggle if provider incidents occur
- Keep submission endpoint operational even if one channel fails

## Operational Alerts (MVP)
- Failed submission persistence
- Notification delivery failures
- High form error rate spikes
