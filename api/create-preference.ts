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

export default async function handler(req: any, res: any): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    res.status(503).json({ error: 'mp_not_configured' });
    return;
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  const planId: string = body.planId;
  const email: string | undefined = body.email;
  const ref: string = body.ref || `vocaria-${Date.now()}`;

  const plan = PLANS[planId];
  if (!plan) {
    res.status(400).json({ error: 'invalid_plan' });
    return;
  }

  const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
  const host = (req.headers['x-forwarded-host'] as string) || req.headers.host;
  const appUrl = (process.env.APP_URL || `${proto}://${host}`).replace(/\/$/, '');
  const backUrl = `${appUrl}/?mp=return`;

  const preference = {
    items: [
      {
        id: planId,
        title: plan.title,
        quantity: 1,
        unit_price: plan.price,
        currency_id: 'ARS',
      },
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
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(preference),
    });
    const data = await mpRes.json();
    if (!mpRes.ok) {
      res.status(502).json({ error: 'mp_error', detail: data });
      return;
    }
    res.status(200).json({ id: data.id, init_point: data.init_point });
  } catch {
    res.status(502).json({ error: 'mp_unreachable' });
  }
}

function safeParse(s: string): any {
  try {
    return JSON.parse(s || '{}');
  } catch {
    return {};
  }
}
