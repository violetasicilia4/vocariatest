/**
 * Webhook de notificaciones de Mercado Pago.
 *
 * MP avisa acá cuando cambia el estado de un pago (incluso si la persona cerró la
 * pestaña antes de volver). Verificamos el pago y, si hay Supabase configurado,
 * registramos la compra. SIEMPRE respondemos 200 para que MP no reintente en loop.
 *
 * Configurar la URL en: Mercado Pago → Tus integraciones → Webhooks
 *   https://<tu-dominio>/api/mp-webhook   (evento: "payments")
 *
 * ⚠️ MERCADO PAGO — INTEGRACIÓN PENDIENTE (NO PRODUCTIVA)
 * El webhook registra la compra pero NO es confiable todavía. Antes de producción:
 *   TODO(mp): validar la firma `x-signature` de Mercado Pago (autenticidad del
 *             webhook); hoy cualquiera podría hacer POST a esta URL.
 *   TODO(mp): usar SUPABASE_SERVICE_KEY (no la anon key) para escribir `purchases`
 *             con RLS que impida inserts desde el cliente.
 *   TODO(mp): idempotencia — no duplicar la compra si MP reintenta el webhook.
 *   TODO(mp): validar monto/plan/external_reference igual que en verify-payment.
 *   TODO(mp): definir y manejar transiciones de estado (pending → approved →
 *             refunded/charged_back), no sólo "approved".
 */
export default async function handler(req: any, res: any): Promise<void> {
  const token = process.env.MP_ACCESS_TOKEN;
  try {
    const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
    const type = body.type || (req.query && req.query.type);
    const paymentId = body?.data?.id || (req.query && (req.query['data.id'] || req.query.id));

    if (token && type === 'payment' && paymentId) {
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (mpRes.ok) {
        const pay = await mpRes.json();
        if (pay.status === 'approved') await recordPurchase(pay);
      }
    }
  } catch {
    /* nunca fallar el webhook */
  }
  res.status(200).json({ received: true });
}

/** Registra la compra en Supabase (best-effort). Requiere la tabla `purchases`. */
async function recordPurchase(pay: any): Promise<void> {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return;
  try {
    await fetch(`${url}/rest/v1/purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        payment_id: String(pay.id),
        plan_id: pay.metadata?.plan_id ?? null,
        email: pay.payer?.email ?? null,
        amount: pay.transaction_amount ?? null,
        status: pay.status,
        external_reference: pay.external_reference ?? null,
      }),
    });
  } catch {
    /* best-effort */
  }
}

function safeParse(s: string): any {
  try {
    return JSON.parse(s || '{}');
  } catch {
    return {};
  }
}
