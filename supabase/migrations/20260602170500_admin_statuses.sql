alter table public.gift_leads
  drop constraint if exists gift_leads_status_check;

alter table public.booking_requests
  drop constraint if exists booking_requests_status_check;

update public.gift_leads
set status = case
  when status = 'reviewed' then 'contacted'
  when status = 'closed' then 'completed'
  else status
end;

update public.booking_requests
set status = case
  when status = 'reviewed' then 'contacted'
  when status = 'closed' then 'completed'
  else status
end;

alter table public.gift_leads
  add constraint gift_leads_status_check
  check (status in ('new', 'contacted', 'confirmed', 'declined', 'completed'));

alter table public.booking_requests
  add constraint booking_requests_status_check
  check (status in ('new', 'contacted', 'confirmed', 'declined', 'completed'));
