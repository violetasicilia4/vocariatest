/**
 * Acceso centralizado y tipado a localStorage.
 *
 * Todo acceso a `localStorage` de la app pasa por acá. Centralizar evita repetir
 * el mismo `try/catch` (localStorage puede no estar disponible: modo incógnito,
 * cuota llena, SSR) y el mismo manejo de `JSON.parse` que falla con datos
 * corruptos. Ningún caller debería tocar `window.localStorage` directamente.
 *
 * Qué guarda la app hoy (todo en el dispositivo, nunca en un server propio):
 *   - `vocaria_pending_inserts`  cola de leads/resultados a sincronizar con
 *                                Supabase (TTL 7 días) — ver services/leads.ts
 *   - `vocaria_pending_order`    pedido pendiente durante el checkout de pago
 *                                (TTL 24 h, contiene PII) — ver services/payments.ts
 *
 * El progreso del test y el resultado viven en memoria (estado de React) y el
 * resultado se persiste en Supabase; no se guardan en localStorage.
 */

/** ¿Hay un localStorage usable? (puede faltar en SSR o estar bloqueado). */
function hasStorage(): boolean {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

/** Lee y parsea JSON de forma segura. Devuelve `fallback` ante cualquier error. */
export function readJSON<T>(key: string, fallback: T): T {
  if (!hasStorage()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    // Dato corrupto o JSON inválido: lo descartamos para no arrastrar basura.
    return fallback;
  }
}

/** Serializa y guarda JSON. Devuelve `false` si no se pudo (cuota/no disponible). */
export function writeJSON(key: string, value: unknown): boolean {
  if (!hasStorage()) return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** Elimina una clave (no falla si no existe o si storage no está disponible). */
export function remove(key: string): void {
  if (!hasStorage()) return;
  try {
    localStorage.removeItem(key);
  } catch {
    /* no-op */
  }
}

/** Envoltura con marca de tiempo, para soportar expiración por TTL. */
interface TimestampedEnvelope<T> {
  ts: number;
  data: T;
}

/**
 * Lee un valor con TTL. Si no existe, está corrupto o venció (`Date.now() - ts >
 * maxAgeMs`), devuelve `null` y limpia la clave. Minimiza la retención de datos.
 */
export function readWithTTL<T>(key: string, maxAgeMs: number): T | null {
  const env = readJSON<TimestampedEnvelope<T> | null>(key, null);
  if (!env || typeof env.ts !== 'number' || !('data' in env)) {
    remove(key);
    return null;
  }
  if (Date.now() - env.ts > maxAgeMs) {
    remove(key);
    return null;
  }
  return env.data;
}

/** Guarda un valor sellándolo con la hora actual (para el TTL de lectura). */
export function writeWithTTL<T>(key: string, data: T): boolean {
  const env: TimestampedEnvelope<T> = { ts: Date.now(), data };
  return writeJSON(key, env);
}

/**
 * Parsea un string crudo y lo valida con `validate`. Devuelve `null` si el JSON
 * es inválido o si la estructura no pasa la validación (dato corrupto/manipulado).
 * Útil para no confiar a ciegas en lo que haya en storage.
 */
export function safeParseStorage<T>(
  raw: string | null,
  validate: (v: unknown) => v is T,
): T | null {
  if (raw == null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return validate(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// ── sessionStorage: datos TEMPORALES del flujo del test ──────────────────────
// Se prefiere sessionStorage sobre localStorage para el progreso: se borra solo
// al cerrar la pestaña (menos retención de datos), y alcanza para sobrevivir a
// un refresh accidental durante el test.

function hasSession(): boolean {
  try {
    return typeof sessionStorage !== 'undefined';
  } catch {
    return false;
  }
}

function readSession(key: string): string | null {
  if (!hasSession()) return null;
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string): boolean {
  if (!hasSession()) return false;
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeSession(key: string): void {
  if (!hasSession()) return;
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* no-op */
  }
}

const PROGRESS_KEY = 'vocaria_progress';
const RESULT_DRAFT_KEY = 'vocaria_result_draft';
const PROGRESS_MAX_AGE_MS = 6 * 60 * 60 * 1000;   // 6 h
const DRAFT_MAX_AGE_MS = 24 * 60 * 60 * 1000;     // 24 h

/**
 * Progreso del test. Sólo guarda las respuestas (ids de opción) y el índice
 * actual — NO guarda nombre, email ni datos personales. Las respuestas son
 * ids opacos ('a','b','1'…), no texto libre.
 */
export interface ProgressState {
  answers: Record<string, string>;
  index: number;
}

function isProgress(v: unknown): v is TimestampedEnvelope<ProgressState> {
  if (typeof v !== 'object' || v === null) return false;
  const env = v as Record<string, unknown>;
  if (typeof env.ts !== 'number') return false;
  const d = env.data as Record<string, unknown> | undefined;
  if (!d || typeof d !== 'object') return false;
  return typeof d.index === 'number' && typeof d.answers === 'object' && d.answers !== null;
}

export function saveProgress(state: ProgressState): boolean {
  // Límite de tamaño defensivo: el progreso no debería pesar más que esto.
  const payload = JSON.stringify({ ts: Date.now(), data: state });
  if (payload.length > 50_000) return false;
  return writeSession(PROGRESS_KEY, payload);
}

export function loadProgress(): ProgressState | null {
  const env = safeParseStorage(readSession(PROGRESS_KEY), isProgress);
  if (!env) {
    clearProgress();
    return null;
  }
  if (Date.now() - env.ts > PROGRESS_MAX_AGE_MS) {
    clearProgress();
    return null;
  }
  return env.data;
}

export function clearProgress(): void {
  removeSession(PROGRESS_KEY);
}

/**
 * Borrador de resultado: MÍNIMO necesario para reconstruir la vista si hay un
 * refresh. Guarda sólo ids/nº de arquetipos y confianza — NUNCA email, nombre
 * ni el set completo de carreras. La fuente de verdad del resultado completo es
 * el cálculo en memoria + Supabase.
 */
export interface ResultDraft {
  primario: string;
  secundario: string | null;
  confianza: number;
}

function isResultDraft(v: unknown): v is TimestampedEnvelope<ResultDraft> {
  if (typeof v !== 'object' || v === null) return false;
  const env = v as Record<string, unknown>;
  if (typeof env.ts !== 'number') return false;
  const d = env.data as Record<string, unknown> | undefined;
  if (!d || typeof d !== 'object') return false;
  return typeof d.primario === 'string' && typeof d.confianza === 'number';
}

export function saveResultDraft(draft: ResultDraft): boolean {
  return writeSession(RESULT_DRAFT_KEY, JSON.stringify({ ts: Date.now(), data: draft }));
}

export function loadResultDraft(): ResultDraft | null {
  const env = safeParseStorage(readSession(RESULT_DRAFT_KEY), isResultDraft);
  if (!env) {
    clearResultDraft();
    return null;
  }
  if (Date.now() - env.ts > DRAFT_MAX_AGE_MS) {
    clearResultDraft();
    return null;
  }
  return env.data;
}

export function clearResultDraft(): void {
  removeSession(RESULT_DRAFT_KEY);
}
