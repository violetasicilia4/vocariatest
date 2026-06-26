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

-- ── Compras (registradas por el webhook de Mercado Pago, server-side) ─────────
-- La escribe la función /api/mp-webhook tras verificar el pago contra la API de
-- Mercado Pago. No se escribe nunca desde el cliente.
create table if not exists public.purchases (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  payment_id          text not null unique,
  plan_id             text,
  email               text,
  amount              numeric,
  status              text,
  external_reference  text
);

create index if not exists purchases_email_idx on public.purchases (email);

-- ── Row Level Security ───────────────────────────────────────────────────────
alter table public.leads        enable row level security;
alter table public.test_results enable row level security;
alter table public.purchases    enable row level security;

-- Sólo INSERT para el rol anónimo. Sin SELECT/UPDATE/DELETE.
drop policy if exists "anon insert leads" on public.leads;
create policy "anon insert leads"
  on public.leads for insert to anon with check (true);

drop policy if exists "anon insert results" on public.test_results;
create policy "anon insert results"
  on public.test_results for insert to anon with check (true);

-- IMPORTANTE: `purchases` tiene RLS activo y NO tiene policy para `anon`. Es
-- deliberado: nadie puede escribir compras desde el cliente. La debe escribir el
-- webhook server-side con la SUPABASE_SERVICE_KEY (ver TODO(mp) en api/mp-webhook.ts).
-- Mientras no haya service key, los inserts de compras fallarán (correcto: pagos
-- aún no productivos).

-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║ DOCUMENTACIÓN — leer antes del primer deploy                              ║
-- ╚══════════════════════════════════════════════════════════════════════════╝
--
-- TABLAS USADAS
--   leads         Captura de waitlist / inicio de test / intención de compra.
--   test_results  Resultado del test (arquetipos + preferencias + respuestas).
--   purchases     Compras confirmadas por el webhook de Mercado Pago (PENDIENTE).
--
-- VARIABLES DE ENTORNO REQUERIDAS
--   Cliente (build, prefijo VITE_):
--     VITE_SUPABASE_URL        URL del proyecto (Settings → API).
--     VITE_SUPABASE_ANON_KEY   anon key (pública por diseño: sólo INSERT vía RLS).
--   Server (secretas, sólo para el webhook de pagos — pendiente):
--     SUPABASE_URL             igual que la anterior, sin prefijo VITE_.
--     SUPABASE_SERVICE_KEY     service_role key. NUNCA exponer al cliente.
--
-- POLICIES QUE DEBEN ESTAR ACTIVAS
--   "anon insert leads"   → INSERT en leads para rol anon.
--   "anon insert results" → INSERT en test_results para rol anon.
--   purchases             → SIN policy anon (sólo service key server-side).
--   Verificá que RLS esté ENABLED en las tres tablas (líneas de arriba).
--
-- QUÉ OPERACIONES HACE EL FRONTEND
--   Sólo INSERT (nunca SELECT/UPDATE/DELETE) sobre leads y test_results, vía la
--   API REST de Supabase (src/services/leads.ts). Si falla la red o no hay
--   config, el insert se encola en localStorage y se reintenta.
--
-- PENDIENTE ANTES DE PRODUCCIÓN
--   - Anti-abuso del INSERT anónimo: `with check (true)` permite inserts sin
--     límite. Evaluar rate-limiting / captcha / validación de email si hay spam.
--   - Mercado Pago: completar el webhook con SUPABASE_SERVICE_KEY e idempotencia
--     antes de confiar en la tabla `purchases` (ver TODO(mp) en api/).
--   - Minimización de datos: `answers` y `user_agent` guardan datos personales;
--     revisar retención/anonimización según la política de privacidad final.
--
-- MIGRACIÓN RECOMENDADA (DEDUP / IDEMPOTENCIA SERVER-SIDE) — opcional, manual
--   Hoy la deduplicación de leads es del lado del cliente (en memoria, por
--   sesión: evita doble click / doble submit). NO hay idempotencia server-side:
--   un refresh o el mismo lead desde otro dispositivo pueden duplicar.
--   Para idempotencia real, agregar una columna `submission_id` y un índice
--   único. El cliente ya genera un id estable por sesión (ver `leadSessionId()`
--   en src/services/leads.ts); cuando exista la columna, se puede enviar ahí.
--   ⚠️ Requiere cambio MANUAL en Supabase y un cambio de cliente coordinado: NO
--   enviar `submission_id` desde el frontend hasta que la columna exista (un
--   POST con una columna inexistente lo rechaza PostgREST con 400).
--
--     alter table public.leads        add column if not exists submission_id text;
--     alter table public.test_results add column if not exists submission_id text;
--     -- Único por (submission_id, source) para no bloquear sources distintos del
--     -- mismo intento. `nulls not distinct` evita duplicar filas viejas sin id.
--     create unique index if not exists leads_submission_uidx
--       on public.leads (submission_id, source);
--     create unique index if not exists test_results_submission_uidx
--       on public.test_results (submission_id);
