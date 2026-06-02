# Deployment Plan

## Target Platform
- Runtime: Vercel
- Database: Supabase
- Notifications: Resend + Telegram

## Environment Variable Contract

Use `.env.example` as the source of truth. Configure the same keys for `preview` and `production`, with environment-specific values.

### Required for Both `preview` and `production`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_DEFAULT_LOCALE`
- `NEXT_PUBLIC_SUPPORTED_LOCALES`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)

### Required for Admin Protection
- `ADMIN_ALLOWED_EMAILS` (may be empty until admin auth flow is finalized)
- `ADMIN_DASHBOARD_PASSWORD`

### Optional (Feature/Operational)
- `SUBMISSIONS_SOURCE_DEFAULT` (default: `website`)
- `FORM_RATE_LIMIT_WINDOW_SECONDS` (default: `60`)
- `FORM_RATE_LIMIT_MAX` (default: `5`)
- `LOG_LEVEL` (default: `info`)

### Optional Notifications
- Resend (all required together):
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`
  - `NOTIFY_EMAIL_TO`
- Telegram (all required together):
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`

## Verified Build and Install Commands

- Install command detected by Vercel: `npm install`
- Build command currently used: `npm run build`
- Current `build` script in `package.json`: `tsc --noEmit`

## Next.js Configuration Check

- No `next.config.*` file is present.
- `next` is not currently listed in `package.json` dependencies.
- Vercel project framework detection is currently `null` (not detected as Next.js).

## Deployment Attempt Status

- Vercel project created/linked: `root-experience`
- Latest deployment state: `ERROR`
- Deployment URL: `https://root-experience-g3f6y0rmi-ipeffer.vercel.app`
- Inspector URL: `https://vercel.com/ipeffer/root-experience/85eHg9sTwm9hb4ArQQCjRyWHN9pb`

### Build Error (from deployment logs)
- `No Output Directory named "public" found after the Build completed.`

This happens because the current build (`tsc --noEmit`) emits no deployable output and the project has no configured output directory artifact.

## Next Steps to Reach a Green Deploy

1. Set all required `preview` and `production` environment variables in Vercel Project Settings.
2. Configure a deployable output target for the current app architecture:
   - either provide a real output directory via project settings / `vercel.json`, or
   - migrate to an application framework build that emits runtime artifacts (for example, a fully configured Next.js app).
3. Re-run preview deploy after output configuration is in place.

## Product Scope Guardrails

- No payment implementation in this deployment plan.
- No scope expansion beyond current MVP boundaries.

## Rollback Strategy
- Keep previous Vercel deployment ready for instant rollback.
- Disable notifications via env toggle if provider incidents occur.
- Keep submission endpoint operational even if one channel fails.
