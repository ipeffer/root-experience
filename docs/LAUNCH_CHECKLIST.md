# Launch Checklist (MVP)

## Product and Content
- [ ] English copy complete for all user-facing screens
- [ ] Italian copy complete for all user-facing screens
- [ ] Optional Russian copy either complete or safely hidden
- [ ] Booking language clearly says "request" (not confirmed booking)
- [ ] Gift page copy reviewed for emotional tone and clarity

## Compliance and Trust
- [ ] Consent checkbox present in all forms
- [ ] Consent text reviewed by stakeholder
- [ ] Privacy/contact links configured
- [ ] No secrets committed in repository
- [ ] Public gift pages do not expose lead contact email/phone

## Technical Readiness
- [ ] Env vars configured in Vercel
- [ ] Supabase tables and policies applied (including `gift_pages`)
- [ ] Resend and Telegram credentials validated
- [ ] Error logging and basic monitoring enabled

## QA
- [x] Typecheck passes (`npm run typecheck`)
- [x] Build passes (`npm run build`)
- [x] Unit/integration tests pass (`npm test`)
- [x] Playwright smoke tests pass in preview
  - [x] Homepage loads
  - [x] Gift Constructor can be completed
  - [x] Gift result is shown
  - [x] Gift lead form validates required fields
  - [x] Gift page is created after lead submit
  - [x] Booking Assistant can be completed
  - [x] Booking confirmation appears
  - [x] Consent checkbox is required
  - [x] No payment flow exists
  - [x] Mobile viewport renders correctly
- [ ] Critical user journeys tested manually in en/it
- [ ] Shopify redirects verified against provided URLs
- [ ] Form validation and error messaging verified
- [ ] Gift page print layout verified manually

## Release
- [ ] Product owner sign-off
- [ ] Rollback plan confirmed
- [ ] Post-launch ownership and triage contacts assigned
