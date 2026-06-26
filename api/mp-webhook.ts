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
import { type ApiRequest, type ApiResponse, parseJsonBody, isPlainObject, paymentsEnabledServer } from './_lib';

interface MpPayment {
  id?: string | number;
  status?: string;
  metadata?: { plan_id?: string };
  payer?: { email?: string };
  transaction_amount?: number;
  external_reference?: string;
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  // GUARD (NO PRODUCTIVO): con el cobro deshabilitado no procesamos ni
  // persistimos compras (el webhook todavía no valida firma ni idempotencia).
  // Respondemos 200 igual para que MP no reintente en loop. Ver
  // paymentsEnabledServer() y los TODO(mp) de este archivo.
  if (!paymentsEnabledServer()) {
    res.status(200).json({ received: true });
    return;
  }

  const token = process.env.MP_ACCESS_TOKEN;
  try {
    const body = parseJsonBody(req) ?? {};
    const type = body.type ?? queryValue(req, 'type');
    const dataId = isPlainObject(body.data) ? body.data.id : undefined;
    const paymentId = dataId ?? queryValue(req, 'data.id') ?? queryValue(req, 'id');

    if (token && type === 'payment' && paymentId) {
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (mpRes.ok) {
        const pay = (await mpRes.json()) as MpPayment;
        if (pay.status === 'approved') await recordPurchase(pay);
      }
    }
  } catch {
    /* nunca fallar el webhook */
  }
  // SIEMPRE 200 para que MP no reintente en loop.
  res.status(200).json({ received: true });
}

function queryValue(req: ApiRequest, key: string): string | undefined {
  const v = req.query?.[key];
  return Array.isArray(v) ? v[0] : v;
}

/** Registra la compra en Supabase (best-effort). Requiere la tabla `purchases`. */
async function recordPurchase(pay: MpPayment): Promise<void> {
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
