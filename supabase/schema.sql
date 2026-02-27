-- ── Run in Supabase SQL Editor ────────────────────────────────────────────────

-- 1. Create the products table
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  price       numeric(10, 2) not null default 0,
  category    text not null,
  image_url   text not null default '',
  created_at  timestamptz not null default now()
);

-- 2. Enable Row Level Security (read-only for anonymous)
alter table public.products enable row level security;

create policy "Anyone can read products"
  on public.products
  for select
  using (true);

-- Only service_role can insert/update/delete (done via server actions)

-- 3. Create Storage bucket for product images
-- Run this in Supabase Dashboard → Storage → New Bucket
-- Name: product-images
-- Public: true
-- Max file size: 5 MB
-- Allowed MIME types: image/jpeg, image/png, image/webp

-- 4. Storage policies (paste in Supabase SQL Editor after creating the bucket)
create policy "Public read access"
  on storage.objects
  for select
  using (bucket_id = 'product-images');

create policy "Service role upload"
  on storage.objects
  for insert
  with check (bucket_id = 'product-images');
