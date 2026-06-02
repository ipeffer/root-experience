# Content and Data Model Draft

## Localization Content Model
All public copy should use translation keys.

### Namespaces (proposed)
- `common.*`
- `gift.*`
- `booking.*`
- `consent.*`
- `success.*`
- `errors.*`

### Required Locales
- `en`
- `it`
- optional: `ru`

## Domain Data Model (Draft)

### `gift_leads`
- `id` (uuid, pk)
- `created_at` (timestamp)
- `locale` (text)
- `gift_intent` (text)
- `budget_range` (text)
- `occasion` (text)
- `recommended_shopify_url` (text, nullable)
- `contact_name` (text, nullable)
- `contact_email` (text, nullable)
- `contact_phone` (text, nullable)
- `notes` (text, nullable)

### `booking_requests`
- `id` (uuid, pk)
- `created_at` (timestamp)
- `locale` (text)
- `experience_type` (text)
- `preferred_date_start` (date, nullable)
- `preferred_date_end` (date, nullable)
- `group_size` (int)
- `preferences` (text, nullable)
- `status` (text: `new|reviewed|contacted|closed`)
- `contact_name` (text)
- `contact_email` (text)
- `contact_phone` (text, nullable)

### `consents`
- `id` (uuid, pk)
- `created_at` (timestamp)
- `source_module` (text: `gift|booking`)
- `source_id` (uuid)
- `consent_version` (text)
- `accepted` (boolean)
- `accepted_at` (timestamp)
- `ip_hash` (text, nullable)

### `notification_events`
- `id` (uuid, pk)
- `created_at` (timestamp)
- `source_module` (text)
- `source_id` (uuid)
- `channel` (text: `email|telegram`)
- `delivery_status` (text: `queued|sent|failed`)
- `provider_message_id` (text, nullable)
- `error_message` (text, nullable)

## Validation Notes
- Enforce server-side Zod schemas for each submission type
- Validate locale against supported list
- Ensure consent accepted before persistence
