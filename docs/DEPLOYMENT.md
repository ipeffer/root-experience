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
- Current `build` script in `package.json`: `next build`
- Type-check command: `npm run typecheck` (`tsc --noEmit`)
- Optional consolidated local gate: `npm run check` (`typecheck` + `test`)

## Next.js Configuration Check

- No `next.config.*` file is present.
- `next`, `react`, and `react-dom` are listed in `package.json` dependencies.
- `next-env.d.ts` is present for TypeScript integration.
- `next build` now produces `.next/` runtime artifacts expected by Vercel.

## Previous Deployment Blocker (Resolved)

- Vercel project created/linked: `root-experience`
- Prior latest deployment state: `ERROR`
- Prior deployment URL: `https://root-experience-g3f6y0rmi-ipeffer.vercel.app`
- Prior inspector URL: `https://vercel.com/ipeffer/root-experience/85eHg9sTwm9hb4ArQQCjRyWHN9pb`

### Build Error (from deployment logs)
- `No Output Directory named "public" found after the Build completed.`

This happened because the previous build (`tsc --noEmit`) emitted no deployable output.
The repository now uses `next build`, which generates `.next/` for Vercel.

## Next Steps to Reach a Green Preview Deploy

1. Set all required `preview` and `production` environment variables in Vercel Project Settings.
2. Keep framework auto-detection enabled for Next.js and run a new preview deployment.
3. Verify preview health checks for `/`, `/gift`, `/booking`, and API submission endpoints.

## Product Scope Guardrails

- No payment implementation in this deployment plan.
- No scope expansion beyond current MVP boundaries.

## Rollback Strategy
- Keep previous Vercel deployment ready for instant rollback.
- Disable notifications via env toggle if provider incidents occur.
- Keep submission endpoint operational even if one channel fails.
