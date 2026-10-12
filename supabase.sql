-- Run once in Supabase > SQL Editor
create table if not exists site(id int primary key default 1 check(id=1), data jsonb not null default '{}');
alter table site enable row level security;
create policy "public read" on site for select using (true);
create policy "admin write" on site for all
  using ((auth.jwt()->>'email')='lakshyaagnihotri966@gmail.com')
  with check ((auth.jwt()->>'email')='lakshyaagnihotri966@gmail.com');
insert into site(id,data) values(1,'{}') on conflict do nothing;
insert into storage.buckets(id,name,public) values('uploads','uploads',true) on conflict do nothing;
create policy "uploads read" on storage.objects for select using (bucket_id='uploads');
create policy "uploads admin" on storage.objects for all
  using (bucket_id='uploads' and (auth.jwt()->>'email')='lakshyaagnihotri966@gmail.com')
  with check (bucket_id='uploads' and (auth.jwt()->>'email')='lakshyaagnihotri966@gmail.com');
