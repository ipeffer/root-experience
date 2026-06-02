# MVP Scope

## In Scope
- Gift Constructor guided flow
- Personalized public gift pages with shareable slug
- Printable / save-as-PDF gift voucher via browser print
- Booking Assistant request flow
- Contact data + consent capture
- Redirect users to existing Shopify URLs where applicable
- Lead creation when no direct product fit exists
- Persistence in Supabase (`gift_leads`, `gift_pages`)
- Email + Telegram notifications
- English + Italian public content (Russian optional)

## Out of Scope (for MVP)
- Payment flows
- Shopify checkout embedding
- Real-time inventory checks
- Instant booking confirmation
- Full CRM sync
- Complex admin portal

## UX Scope Notes
- Keep forms short and clear
- Gift Constructor produces a tangible artifact: a shareable gift page
- Public gift pages must not expose private contact details
- Explicitly communicate that booking is a request only
- Provide clear follow-up expectation after submission

## MVP Exit Criteria
- Both modules function end-to-end in staging
- Gift Constructor creates a public gift page after lead submit
- Notifications deliver for every successful submission
- Consent is captured in all relevant forms
- Basic E2E tests pass
- Product owner sign-off on English and Italian content
