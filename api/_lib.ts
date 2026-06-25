/**
 * Helpers compartidos para las funciones serverless de Vercel (carpeta api/).
 *
 * Centralizan validación de método, parseo seguro de body, respuestas JSON
 * consistentes y validación de inputs. Objetivo: que ningún endpoint acepte
 * cualquier cosa, no filtre detalles internos en los errores ni use `any`.
 *
 * Tipos mínimos de request/response (subset de @vercel/node) para no sumar una
 * dependencia sólo por los tipos.
 */

export interface ApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  body?: unknown;
  url?: string;
}

export interface ApiResponse {
  status(code: number): ApiResponse;
  json(data: unknown): void;
}

/** Tope de tamaño del body que aceptamos parsear (anti-abuso simple). */
export const MAX_BODY_BYTES = 10_000;

/** Respuesta JSON exitosa. */
export function jsonResponse(res: ApiResponse, status: number, data: unknown): void {
  res.status(status).json(data);
}

/**
 * Respuesta de error consistente: `{ error: <code> }`. NUNCA incluye stack
 * traces ni mensajes internos; sólo un código estable que el cliente entiende.
 */
export function errorResponse(res: ApiResponse, status: number, code: string): void {
  res.status(status).json({ error: code });
}

/**
 * Verifica el método HTTP. Si no coincide, responde 405 y devuelve false
 * (el handler debe cortar). Devuelve true si el método es válido.
 */
export function assertMethod(req: ApiRequest, res: ApiResponse, method: string): boolean {
  if ((req.method ?? 'GET').toUpperCase() !== method.toUpperCase()) {
    errorResponse(res, 405, 'method_not_allowed');
    return false;
  }
  return true;
}

/**
 * Parsea el body JSON de forma segura. Acepta body ya objeto (Vercel suele
 * parsearlo) o string. Rechaza payloads más grandes que MAX_BODY_BYTES.
 * Devuelve `{}` ante body vacío y `null` ante JSON inválido o demasiado grande.
 */
export function parseJsonBody(req: ApiRequest): Record<string, unknown> | null {
  const raw = req.body;
  if (raw == null || raw === '') return {};
  if (typeof raw === 'object') {
    // Ya viene parseado por el runtime.
    return raw as Record<string, unknown>;
  }
  if (typeof raw !== 'string') return null;
  if (raw.length > MAX_BODY_BYTES) return null;
  try {
    const parsed = JSON.parse(raw);
    return isPlainObject(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * Verifica que estén presentes (y no vacíos) los campos requeridos.
 * Devuelve la lista de los que faltan (vacía = todo OK).
 */
export function validateRequiredFields(
  obj: Record<string, unknown>,
  fields: string[],
): string[] {
  return fields.filter(f => {
    const v = obj[f];
    return v == null || (typeof v === 'string' && v.trim() === '');
  });
}

// Validación de email deliberadamente simple: no aceptar basura evidente, sin
// pretender cubrir el RFC entero (eso lo valida el envío real).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length <= 254 && EMAIL_RE.test(email.trim());
}

/** Normaliza un email: trim + minúsculas. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Recorta un string a `max` caracteres (anti-abuso de longitud). */
export function clampString(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed.slice(0, max);
}
