/**
 * Pagos con Mercado Pago (Checkout Pro) desde el frontend.
 *
 * Flujo:
 *  1. La persona elige un plan → guardamos el "pedido pendiente" (resultado del
 *     test + plan) en localStorage, porque el redirect a Mercado Pago nos saca de
 *     la SPA y perderíamos el estado en memoria.
 *  2. Pedimos al backend (/api/create-preference) el init_point y redirigimos.
 *  3. Al volver (?mp=return&payment_id=...), App verifica el pago server-side
 *     (/api/verify-payment) y, si está aprobado, entrega el PDF del plan.
 *
 * Si VITE_PAYMENTS_ENABLED !== 'true', la UI usa el flujo de "reserva" (sin cobro).
 */
import type { ScoringResult } from '../test/engine/scorer';
import type { PlanId } from '../test/data/profile';

const PENDING_KEY = 'vocaria_pending_order';

// El pedido pendiente guarda PII (email + resultado) en el dispositivo mientras
// la persona está en el checkout de Mercado Pago. Si abandona y no vuelve, lo
// purgamos a las 24 h para no retener datos de más.
const PENDING_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** ¿Está habilitado el cobro real? (build-time, lo setea quien despliega). */
export function paymentsEnabled(): boolean {
  return import.meta.env.VITE_PAYMENTS_ENABLED === 'true';
}

export interface PendingOrder {
  plan: PlanId;
  nombre: string;
  email: string;
  ref: string;
  result: ScoringResult;
}

export function savePendingOrder(order: PendingOrder): void {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify({ ts: Date.now(), order }));
  } catch {
    /* localStorage no disponible */
  }
}

export function loadPendingOrder(): PendingOrder | null {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { ts?: number; order?: PendingOrder };
    // Compat: si no tiene envoltura con ts, lo tratamos como vencido y lo limpiamos.
    if (!parsed || typeof parsed.ts !== 'number' || !parsed.order) {
      clearPendingOrder();
      return null;
    }
    if (Date.now() - parsed.ts > PENDING_MAX_AGE_MS) {
      clearPendingOrder();
      return null;
    }
    return parsed.order;
  } catch {
    return null;
  }
}

export function clearPendingOrder(): void {
  try {
    localStorage.removeItem(PENDING_KEY);
  } catch {
    /* no-op */
  }
}

/**
 * Crea la preferencia de pago y devuelve el init_point (URL de Mercado Pago).
 * Devuelve null si el backend no tiene MP configurado o si falla la red.
 */
export async function createPreference(planId: PlanId, email: string, ref: string): Promise<string | null> {
  try {
    const res = await fetch('/api/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, email, ref }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.init_point ?? null;
  } catch {
    return null;
  }
}

export interface VerifyResult {
  approved: boolean;
  planId: PlanId | null;
}

/** Verifica server-side si un pago está aprobado. */
export async function verifyPayment(paymentId: string): Promise<VerifyResult> {
  try {
    const res = await fetch(`/api/verify-payment?payment_id=${encodeURIComponent(paymentId)}`);
    if (!res.ok) return { approved: false, planId: null };
    const data = await res.json();
    return { approved: Boolean(data.approved), planId: (data.planId as PlanId) ?? null };
  } catch {
    return { approved: false, planId: null };
  }
}
