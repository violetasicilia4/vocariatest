/**
 * Crea una preferencia de pago de Mercado Pago (Checkout Pro), server-side.
 *
 * El MP_ACCESS_TOKEN es SECRETO y nunca se expone al cliente. El precio se define
 * acá (no se confía en el cliente). Devuelve el `init_point` al que el frontend
 * redirige para que la persona pague en el checkout hosteado por Mercado Pago.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   MP_ACCESS_TOKEN  — Access Token de tu cuenta de Mercado Pago (TEST o PROD).
 *   APP_URL          — (opcional) URL pública del sitio; si falta se deriva del request.
 *
 * ⚠️ MERCADO PAGO — INTEGRACIÓN PENDIENTE (NO PRODUCTIVA)
 * Este handler es un ESQUELETO funcional pero NO endurecido para cobrar de verdad.
 * Antes de activar pagos reales (VITE_PAYMENTS_ENABLED=true) hay que resolver:
 *   TODO(mp): validar/normalizar `email` (formato) antes de mandarlo a MP.
 *   TODO(mp): generar `external_reference` server-side y persistirlo asociado al
 *             pedido, para poder comparar al verificar (hoy llega del cliente).
 *   TODO(mp): firmar/whitelistear el origen del request (anti-abuso).
 *   TODO(mp): rate-limiting básico para no exponer el token a flood.
 * Ver también: api/verify-payment.ts, api/mp-webhook.ts y src/services/payments.ts.
 */

// Precios server-side, alineados con src/test/data/profile.ts (sin decimales, ARS).
const PLANS: Record<string, { title: string; price: number }> = {
  esencial:      { title: 'Vocaria · Informe Esencial',      price: 2990 },
  universitario: { title: 'Vocaria · Informe Universitario', price: 4990 },
  profesional:   { title: 'Vocaria · Informe Profesional',   price: 7990 },
};

import {
  type ApiRequest,
  type ApiResponse,
  assertMethod,
  parseJsonBody,
  errorResponse,
  jsonResponse,
  isValidEmail,
  normalizeEmail,
  clampString,
} from './_lib';

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (!assertMethod(req, res, 'POST')) return;

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    errorResponse(res, 503, 'mp_not_configured');
    return;
  }

  const body = parseJsonBody(req);
  if (!body) {
    errorResponse(res, 400, 'invalid_body');
    return;
  }

  const planId = typeof body.planId === 'string' ? body.planId : '';
  const plan = PLANS[planId];
  if (!plan) {
    errorResponse(res, 400, 'invalid_plan');
    return;
  }

  // Email opcional, pero si viene debe ser válido (lo mandamos a MP).
  const rawEmail = body.email;
  let email: string | undefined;
  if (rawEmail != null && rawEmail !== '') {
    if (!isValidEmail(rawEmail)) {
      errorResponse(res, 400, 'invalid_email');
      return;
    }
    email = normalizeEmail(rawEmail);
  }

  // `ref` (external_reference) acotado; si no viene, generamos uno.
  const ref = clampString(body.ref, 120) ?? `vocaria-${Date.now()}`;

  const proto = headerValue(req.headers['x-forwarded-proto']) || 'https';
  const host = headerValue(req.headers['x-forwarded-host']) || headerValue(req.headers.host) || '';
  const appUrl = (process.env.APP_URL || `${proto}://${host}`).replace(/\/$/, '');
  const backUrl = `${appUrl}/?mp=return`;

  const preference = {
    items: [
      { id: planId, title: plan.title, quantity: 1, unit_price: plan.price, currency_id: 'ARS' },
    ],
    payer: email ? { email } : undefined,
    external_reference: ref,
    metadata: { plan_id: planId },
    back_urls: { success: backUrl, pending: backUrl, failure: backUrl },
    auto_return: 'approved',
    statement_descriptor: 'VOCARIA',
  };

  try {
    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(preference),
    });
    const data = (await mpRes.json()) as { id?: string; init_point?: string };
    if (!mpRes.ok) {
      // No filtramos el detalle de MP al cliente (puede traer datos internos).
      errorResponse(res, 502, 'mp_error');
      return;
    }
    jsonResponse(res, 200, { id: data.id, init_point: data.init_point });
  } catch {
    errorResponse(res, 502, 'mp_unreachable');
  }
}

/** Toma el primer valor si el header viene como array. */
function headerValue(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}
