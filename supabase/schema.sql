-- Vocaria — Esquema Supabase
-- Ejecutar en Supabase Studio → SQL Editor.
--
-- Diseño de seguridad: la anon key sólo puede INSERTAR (captura de leads y
-- resultados desde el navegador). Nadie puede LEER ni MODIFICAR datos con la
-- anon key. Para ver los leads usá el dashboard de Supabase o la service_role
-- key desde un backend (nunca en el cliente).

-- ── Leads (waitlist + inicio de test + intención de compra) ──────────────────
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null,
  nombre      text,
  source      text not null check (source in ('waitlist','test_start','purchase_intent')),
  edad        text,
  provincia_id text,
  consent     boolean not null default false,
  referrer    text,
  user_agent  text
);

create index if not exists leads_email_idx  on public.leads (email);
create index if not exists leads_source_idx on public.leads (source);

-- ── Resultados de test (para análisis de demanda y el informe) ───────────────
create table if not exists public.test_results (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  email                 text not null,
  nombre                text,
  arquetipo_primario    text not null,
  arquetipo_secundario  text,
  confianza             int,
  preferences           jsonb,
  answers               jsonb
);

create index if not exists test_results_email_idx on public.test_results (email);

-- ── Row Level Security ───────────────────────────────────────────────────────
alter table public.leads        enable row level security;
alter table public.test_results enable row level security;

-- Sólo INSERT para el rol anónimo. Sin SELECT/UPDATE/DELETE.
drop policy if exists "anon insert leads" on public.leads;
create policy "anon insert leads"
  on public.leads for insert to anon with check (true);

drop policy if exists "anon insert results" on public.test_results;
create policy "anon insert results"
  on public.test_results for insert to anon with check (true);
