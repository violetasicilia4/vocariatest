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
