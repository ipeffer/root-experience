create table if not exists public.gift_pages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text not null unique,
  language text not null,
  occasion text not null,
  recipient_name text not null,
  giver_name text not null,
  personal_message text not null default '',
  recommended_gift_id text not null,
  recommended_gift_title text not null,
  cta_url text,
  lead_id uuid references public.gift_leads (id) on delete set null,
  status text not null default 'active'
);

alter table public.gift_pages
  add constraint gift_pages_status_check
  check (status in ('active', 'archived'));

create index if not exists gift_pages_slug_idx on public.gift_pages (slug);
create index if not exists gift_pages_lead_id_idx on public.gift_pages (lead_id);
create index if not exists gift_pages_created_at_idx on public.gift_pages (created_at desc);

alter table public.gift_pages enable row level security;

drop policy if exists "service role full access gift_pages" on public.gift_pages;
create policy "service role full access gift_pages"
on public.gift_pages
for all
to service_role
using (true)
with check (true);
