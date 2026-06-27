/**
 * Capa de analytics interna — NO-OP por defecto, sin vendor ni red.
 *
 * Objetivo: tener un único punto (`track`) para instrumentar el funnel sin
 * comprometer todavía un proveedor ni agregar dependencias. Hoy no envía nada a
 * ningún lado. Cuando se decida un proveedor cookieless, se enchufa acá (un solo
 * lugar), idealmente gateado por el consentimiento que ya pide `ProfileCapture`.
 *
 * Garantías:
 *  - **Producción: no-op.** No hay llamadas de red.
 *  - **Sin PII.** Los tipos no admiten email/nombre/edad exacta ni texto libre
 *    con datos personales; además, antes de loguear se filtran sólo claves
 *    conocidas (defensa en profundidad).
 *  - **Nunca rompe la navegación**: todo va dentro de try/catch.
 *  - En desarrollo, con `VITE_ANALYTICS_DEBUG=true`, loguea por consola para
 *    verificar el funnel (sólo datos técnicos/agregados).
 */

/** Eventos permitidos (contrato estable con el futuro dashboard). */
export type AnalyticsEvent =
  | 'landing_viewed'
  | 'cta_clicked'
  | 'test_started'
  | 'profile_completed'
  | 'question_answered'
  | 'checkpoint_seen'
  | 'test_completed'
  | 'result_preview_seen'
  | 'plan_selected'
  | 'payment_attempt_blocked'
  | 'error_boundary_shown';

/**
 * Propiedades permitidas. Deliberadamente acotadas a datos técnicos/agregados;
 * NO incluye nombre, email ni edad exacta. `archetype` es un id de arquetipo
 * (no sensible). `index`/`phase` ubican el paso del test sin identificar a nadie.
 */
export interface AnalyticsProps {
  /** Índice de paso / pregunta. */
  index?: number;
  /** Fase del test. */
  phase?: 'core' | 'adaptive';
  /** Id de arquetipo (no PII). */
  archetype?: string;
  /** Tipo de viewport. */
  viewport?: 'mobile' | 'desktop';
  /** Origen/ubicación del evento (p. ej. 'hero', 'cierre', 'header'). */
  source?: string;
  /** Plan elegido (id), p. ej. 'esencial' | 'universitario' | 'profesional'. */
  plan?: string;
  /** Motivo técnico, p. ej. 'payments_disabled'. */
  reason?: string;
  /** Flags técnicos booleanos. */
  flags?: Record<string, boolean>;
}

// Claves que se permiten loguear. Cualquier otra cosa se ignora (defensa contra
// callers en JS que pasen algo de más).
const ALLOWED_KEYS: (keyof AnalyticsProps)[] = [
  'index', 'phase', 'archetype', 'viewport', 'source', 'plan', 'reason', 'flags',
];

const DEBUG = import.meta.env.VITE_ANALYTICS_DEBUG === 'true';

/** Copia sólo las claves permitidas (nunca propaga campos inesperados/PII). */
function pickAllowed(props?: AnalyticsProps): AnalyticsProps {
  const out: AnalyticsProps = {};
  if (!props) return out;
  for (const k of ALLOWED_KEYS) {
    const v = props[k];
    if (v !== undefined) (out as Record<string, unknown>)[k] = v;
  }
  return out;
}

/**
 * Registra un evento del funnel. NO-OP en producción; en dev con
 * `VITE_ANALYTICS_DEBUG=true` lo loguea. Nunca lanza.
 */
export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  try {
    const safe = pickAllowed(props);
    // En dev (y sólo con el flag) logueamos para verificar el funnel.
    if (DEBUG && import.meta.env.DEV) {
      console.debug('[analytics]', event, safe);
    }
    // TODO(analytics): enchufar un proveedor cookieless acá (gateado por consent).
    // Hoy es no-op a propósito: no se envía nada a ningún lado.
  } catch {
    // Tracking nunca debe romper la navegación.
  }
}

/** Helper sin PII para clasificar el viewport actual. */
export function currentViewport(): 'mobile' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  return window.matchMedia('(max-width: 1023px)').matches ? 'mobile' : 'desktop';
}
