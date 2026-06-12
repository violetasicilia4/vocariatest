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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const QUEUE_KEY = 'vocaria_pending_inserts';

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
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeQueue(items: PendingInsert[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(items.slice(-50)));
  } catch {
    /* localStorage lleno o no disponible: nada que hacer */
  }
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
  if (!isConfigured()) return;
  const q = readQueue();
  if (q.length === 0) return;

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

export function captureLead(input: LeadInput) {
  return insert('leads', {
    email: input.email,
    nombre: input.nombre ?? null,
    source: input.source,
    edad: input.edad ?? null,
    provincia_id: input.provincia_id ?? null,
    consent: input.consent,
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
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
    email: input.email,
    nombre: input.nombre ?? null,
    arquetipo_primario: input.arquetipo_primario,
    arquetipo_secundario: input.arquetipo_secundario ?? null,
    confianza: input.confianza,
    preferences: input.preferences,
    answers: input.answers,
  });
}
