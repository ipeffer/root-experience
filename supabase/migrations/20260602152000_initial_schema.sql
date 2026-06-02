create extension if not exists "pgcrypto";

create table if not exists public.gift_options (
  id text primary key,
  created_at timestamptz not null default now(),
  language text not null,
  source text not null,
  title text not null,
  description text,
  shopify_url text,
  active boolean not null default true,
  internal_notes text
);

create table if not exists public.gift_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  language text not null,
  source text not null,
  contact_name text not null,
  email text not null,
  phone_or_whatsapp text,
  answers jsonb not null default '{}'::jsonb,
  consent boolean not null,
  status text not null default 'new',
  internal_notes text
);

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  language text not null,
  source text not null,
  contact_name text not null,
  email text not null,
  phone_or_whatsapp text,
  answers jsonb not null default '{}'::jsonb,
  consent boolean not null,
  status text not null default 'new',
  internal_notes text
);

alter table public.gift_leads
  add constraint gift_leads_status_check
  check (status in ('new', 'reviewed', 'contacted', 'closed'));

alter table public.booking_requests
  add constraint booking_requests_status_check
  check (status in ('new', 'reviewed', 'contacted', 'closed'));

create index if not exists gift_leads_created_at_idx on public.gift_leads (created_at desc);
create index if not exists gift_leads_status_idx on public.gift_leads (status);
create index if not exists booking_requests_created_at_idx on public.booking_requests (created_at desc);
create index if not exists booking_requests_status_idx on public.booking_requests (status);

alter table public.gift_options enable row level security;
alter table public.gift_leads enable row level security;
alter table public.booking_requests enable row level security;

drop policy if exists "service role full access gift_options" on public.gift_options;
create policy "service role full access gift_options"
on public.gift_options
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role full access gift_leads" on public.gift_leads;
create policy "service role full access gift_leads"
on public.gift_leads
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role full access booking_requests" on public.booking_requests;
create policy "service role full access booking_requests"
on public.booking_requests
for all
to service_role
using (true)
with check (true);
