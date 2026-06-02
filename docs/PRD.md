# Product Requirements Document (PRD)

## Product Name
ROOT Experience (MVP)

## Background
ROOT Winery already sells products and experiences through Shopify on `rootwinery.it`.
This MVP adds a guided pre-purchase and booking-request flow in a separate product experience.

## Problem Statement
Visitors may not know which gift or experience matches their intent. Current flows can be overwhelming and not optimized for guided qualification.

## Objectives
- Increase qualified gift leads and booking requests
- Reduce friction before redirecting users to Shopify products
- Provide winery team with actionable request data quickly

## Target Users
- Tourists planning a winery visit
- Gift buyers choosing wine-related presents
- Couples/small groups searching for premium experiences

## Modules

### 1) Gift Constructor
User answers a short guided flow.
Output:
- recommended gift option(s)
- redirect to existing Shopify product URLs where applicable
- or a lead request form if no direct fit

### 2) Booking Assistant
User submits desired experience details (date range, group size, preferences, contact details, consent).
Output:
- booking request record
- notifications to winery team
- user sees "request received" state (not confirmed)

## Functional Requirements
- FR-1: Collect structured gift preferences
- FR-2: Provide mapped Shopify links for matched gift intents
- FR-3: Capture lead when no direct product mapping exists
- FR-4: Collect booking request details for experiences
- FR-5: Capture contact details + consent in every form
- FR-6: Persist all requests in database
- FR-7: Notify winery via email and Telegram
- FR-8: Public UI supports English and Italian (Russian optional)

## Non-Functional Requirements
- NFR-1: Lean MVP architecture with low operational complexity
- NFR-2: Type-safe validation for all request payloads
- NFR-3: Basic anti-spam protection and server-side validation
- NFR-4: Secrets managed outside repository
- NFR-5: Production deployable on Vercel

## Success Metrics (MVP)
- Submission completion rate per module
- Number of qualified requests per week
- Shopify redirect click-through rate from Gift Constructor
- Notification delivery success rate

## Assumptions
- Shopify product URLs are provided and maintained by winery team
- Winery handles manual follow-up and confirmation outside MVP
- No payment processing needed in this product
