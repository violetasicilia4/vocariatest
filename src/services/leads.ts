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
  // Descarta entradas vencidas. Los callers reescriben la cola, así que la
  // purga queda persistida (flushQueue corre en cada carga de la app).
  return items.filter(it => typeof it?.ts === 'number' && it.ts >= cutoff);
}

function writeQueue(items: PendingInsert[]): void {
  // Tope de 50 entradas para no llenar la cuota del dispositivo.
  writeJSON(QUEUE_KEY, items.slice(-50));
}

function enqueue(table: string, row: Record<string, unknown>): void {
  const q = readQueue();
  q.push({ table, row, ts: Date.now() });
  writeQueue(q);
}

async function rawInsert(table: string, row: Record<string, unknown>): Promise<boolean> {
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

/**
 * Inserta en `table`; si falla (o no hay config), encola para reintento.
 * Devuelve { ok, persisted } — `ok` es true incluso si se encoló (para no romper UX).
 */
async function insert(
  table: string,
  row: Record<string, unknown>,
): Promise<{ ok: boolean; persisted: boolean }> {
  const persisted = await rawInsert(table, row);
  if (!persisted) {
    enqueue(table, row);
    return { ok: true, persisted: false };
  }
  return { ok: true, persisted: true };
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
  return insert('leads', {
    email: cap(input.email, MAX_EMAIL)?.toLowerCase() ?? null,
    nombre: cap(input.nombre, MAX_NOMBRE),
    source: input.source,
    edad: cap(input.edad, MAX_FIELD),
    provincia_id: cap(input.provincia_id, MAX_FIELD),
    consent: input.consent,
    referrer: typeof document !== 'undefined' ? cap(document.referrer, MAX_FIELD * 4) : null,
    user_agent: typeof navigator !== 'undefined' ? cap(navigator.userAgent, MAX_UA) : null,
  });
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
  return insert('test_results', {
    email: cap(input.email, MAX_EMAIL)?.toLowerCase() ?? null,
    nombre: cap(input.nombre, MAX_NOMBRE),
    arquetipo_primario: input.arquetipo_primario,
    arquetipo_secundario: input.arquetipo_secundario ?? null,
    confianza: input.confianza,
    preferences: input.preferences,
    answers: input.answers,
  });
}
