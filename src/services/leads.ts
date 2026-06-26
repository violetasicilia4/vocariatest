/**
 * Captura de leads y resultados — Supabase (REST, sin SDK para no inflar el bundle).
 *
 * Configuración (Vercel → Project → Settings → Environment Variables, o .env.local):
 *   VITE_SUPABASE_URL       = https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY  = eyJhbGci...
 *
 * Esquema SQL: ver supabase/schema.sql
 *
 * Diseño defensivo: si Supabase no está configurado o la red falla, el lead se
 * encola en localStorage y se reintenta en la próxima carga. La UX nunca se rompe,
 * pero NO se pierde el dato silenciosamente (que era el problema original: todo
 * vivía en useState y se evaporaba al refrescar).
 */

import { readJSON, writeJSON } from './storage';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const QUEUE_KEY = 'vocaria_pending_inserts';

// Minimización de datos: la cola guarda PII (email + respuestas) en el dispositivo.
// La purgamos a los 7 días para no retener datos indefinidamente en equipos
// (especialmente compartidos) si nunca se logró sincronizar con Supabase.
const QUEUE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export type LeadSource = 'waitlist' | 'test_start' | 'purchase_intent';

// Whitelist estricta de tablas en las que este servicio puede insertar. La cola
// offline guarda el nombre de la tabla en localStorage, que es manipulable por el
// usuario: sin esta validación, un atacante podría editar la cola para hacer que
// `flushQueue` haga POST a una tabla arbitraria de Supabase. Sólo se permiten las
// tablas que el servicio escribe legítimamente (captureLead / saveTestResult).
type AllowedTable = 'leads' | 'test_results';
const ALLOWED_TABLES = new Set<AllowedTable>(['leads', 'test_results']);

function isAllowedTable(table: unknown): table is AllowedTable {
  return typeof table === 'string' && ALLOWED_TABLES.has(table as AllowedTable);
}

interface PendingInsert {
  table: string;
  row: Record<string, unknown>;
  ts: number;
}

export function isConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function readQueue(): PendingInsert[] {
  const items = readJSON<PendingInsert[]>(QUEUE_KEY, []);
  if (!Array.isArray(items)) return [];
  const cutoff = Date.now() - QUEUE_MAX_AGE_MS;
  // Descarta entradas vencidas y las que apunten a una tabla NO permitida (la cola
  // vive en localStorage y es manipulable: una entrada con `table` arbitraria se
  // descarta acá). Los callers reescriben la cola, así que la purga queda
  // persistida (flushQueue corre en cada carga de la app).
  return items.filter(
    it => typeof it?.ts === 'number' && it.ts >= cutoff && isAllowedTable(it?.table),
  );
}

function writeQueue(items: PendingInsert[]): void {
  // Tope de 50 entradas para no llenar la cuota del dispositivo.
  writeJSON(QUEUE_KEY, items.slice(-50));
}

function enqueue(table: string, row: Record<string, unknown>): void {
  // Defensa en profundidad: nunca encolamos una tabla fuera de la whitelist.
  if (!isAllowedTable(table)) {
    warnDisallowedTable(table);
    return;
  }
  const q = readQueue();
  q.push({ table, row, ts: Date.now() });
  writeQueue(q);
}

/** Aviso seguro sólo en desarrollo (no expone datos; no rompe la UX). */
function warnDisallowedTable(table: unknown): void {
  if (import.meta.env.DEV) {
    console.warn('[leads] insert descartado: tabla no permitida', { table: String(table) });
  }
}

async function rawInsert(table: string, row: Record<string, unknown>): Promise<boolean> {
  // Guard de seguridad: jamás hacemos POST a una tabla fuera de la whitelist,
  // aunque el nombre venga de la cola persistida (potencialmente manipulada).
  if (!isAllowedTable(table)) {
    warnDisallowedTable(table);
    return false;
  }
  if (!isConfigured()) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY as string,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── Deduplicación (cliente, ligera) ──────────────────────────────────────────
// Evita duplicados OBVIOS (doble click en "Continuar", re-render inmediato,
// doble montaje en StrictMode/dev) sin perder leads válidos. Es dedup en memoria
// por carga de página: NO impide que una misma persona vuelva a hacer el test en
// otra sesión/otro día (eso sería un lead nuevo legítimo). La idempotencia real
// (cross-device / cross-reload) necesita una columna `submission_id` + índice
// único en Supabase — ver migración recomendada en supabase/schema.sql.
const submittedKeys = new Set<string>();

const LEAD_SESSION_KEY = 'vocaria_lead_session';

/**
 * Id estable por pestaña (sessionStorage) para agrupar el intento actual. No es
 * PII: es un identificador opaco aleatorio. Se usa SÓLO como parte de la clave
 * de dedup del cliente (no se envía a Supabase mientras no exista la columna).
 */
export function leadSessionId(): string {
  if (typeof sessionStorage === 'undefined') return 'nosession';
  try {
    let id = sessionStorage.getItem(LEAD_SESSION_KEY);
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem(LEAD_SESSION_KEY, id);
    }
    return id;
  } catch {
    return 'nosession';
  }
}

/**
 * Inserta en `table`; si falla (o no hay config), encola para reintento.
 * Devuelve { ok, persisted } — `ok` es true incluso si se encoló (para no romper UX).
 *
 * `dedupKey` (opcional): si esa clave ya se insertó en esta carga de página, se
 * omite el insert (idempotencia de cliente). `deduped` indica que se saltó.
 */
async function insert(
  table: string,
  row: Record<string, unknown>,
  dedupKey?: string,
): Promise<{ ok: boolean; persisted: boolean; deduped: boolean }> {
  if (dedupKey) {
    if (submittedKeys.has(dedupKey)) {
      // Duplicado inmediato: el lead original ya se capturó/encoló. No re-insertar.
      return { ok: true, persisted: false, deduped: true };
    }
    submittedKeys.add(dedupKey);
  }
  const persisted = await rawInsert(table, row);
  if (!persisted) {
    enqueue(table, row);
    return { ok: true, persisted: false, deduped: false };
  }
  return { ok: true, persisted: true, deduped: false };
}

/** Reintenta los inserts encolados. Llamar al inicio de la app (best-effort). */
export async function flushQueue(): Promise<void> {
  // Persiste la purga por TTL aunque no haya red/Supabase: readQueue() ya filtró
  // las entradas vencidas, así no quedan datos viejos en el dispositivo.
  const q = readQueue();
  writeQueue(q);
  if (!isConfigured() || q.length === 0) return;

  const remaining: PendingInsert[] = [];
  for (const item of q) {
    const ok = await rawInsert(item.table, item.row);
    if (!ok) remaining.push(item);
  }
  writeQueue(remaining);
}

// ── API pública ─────────────────────────────────────────────────────────────

export interface LeadInput {
  email: string;
  nombre?: string;
  source: LeadSource;
  edad?: string;
  provincia_id?: string;
  consent: boolean;
}

// Límites de longitud (anti-abuso): recortan strings antes de mandarlos a
// Supabase para que un payload inflado no engorde la tabla. La validación fuerte
// vive en RLS/servidor; esto es defensa en profundidad del lado del cliente.
const MAX_EMAIL = 254;
const MAX_NOMBRE = 80;
const MAX_FIELD = 40;
const MAX_UA = 400;

function cap(value: string | null | undefined, max: number): string | null {
  if (typeof value !== 'string') return null;
  const t = value.trim();
  return t === '' ? null : t.slice(0, max);
}

export function captureLead(input: LeadInput) {
  // Dedup por (sesión + source): un mismo source no se inserta dos veces en la
  // misma carga/sesión (doble click, re-render). Otra sesión = lead nuevo válido.
  const dedupKey = `lead:${input.source}:${leadSessionId()}`;
  return insert('leads', {
    email: cap(input.email, MAX_EMAIL)?.toLowerCase() ?? null,
    nombre: cap(input.nombre, MAX_NOMBRE),
    source: input.source,
    edad: cap(input.edad, MAX_FIELD),
    provincia_id: cap(input.provincia_id, MAX_FIELD),
    consent: input.consent,
    referrer: typeof document !== 'undefined' ? cap(document.referrer, MAX_FIELD * 4) : null,
    user_agent: typeof navigator !== 'undefined' ? cap(navigator.userAgent, MAX_UA) : null,
  }, dedupKey);
}

export interface TestResultInput {
  email: string;
  nombre?: string;
  arquetipo_primario: string;
  arquetipo_secundario?: string | null;
  confianza: number;
  preferences: Record<string, number>;
  answers: Record<string, string>;
}

export function saveTestResult(input: TestResultInput) {
  // Un resultado por intento de test (sesión): evita el doble insert por el
  // doble montaje de efectos en StrictMode/dev o un re-render del flujo.
  const dedupKey = `result:${leadSessionId()}`;
  return insert('test_results', {
    email: cap(input.email, MAX_EMAIL)?.toLowerCase() ?? null,
    nombre: cap(input.nombre, MAX_NOMBRE),
    arquetipo_primario: input.arquetipo_primario,
    arquetipo_secundario: input.arquetipo_secundario ?? null,
    confianza: input.confianza,
    preferences: input.preferences,
    answers: input.answers,
  }, dedupKey);
}
