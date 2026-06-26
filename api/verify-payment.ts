/**
 * Verifica server-side el estado de un pago de Mercado Pago.
 *
 * El frontend lo llama al volver del checkout (?payment_id=...). Confiar solo en
 * el parámetro `status` de la URL sería inseguro (se puede falsificar): acá se
 * consulta la API de MP con el token secreto y se devuelve si está aprobado.
 *
 *   GET /api/verify-payment?payment_id=123456789
 *
 * ⚠️ MERCADO PAGO — INTEGRACIÓN PENDIENTE (NO PRODUCTIVA)
 * Hoy verifica el estado del pago contra MP, pero NO valida que el pago
 * corresponda al pedido. Antes de entregar el producto pago de verdad:
 *   TODO(mp): comparar `external_reference` con el pedido pendiente del usuario.
 *   TODO(mp): validar el MONTO (`transaction_amount`) contra el precio del plan
 *             (un pago aprobado por $1 no debe desbloquear el informe).
 *   TODO(mp): validar que `metadata.plan_id` sea un plan conocido y coincida.
 *   TODO(mp): no confiar nunca en el `planId` que devuelve el cliente para
 *             entregar contenido; derivarlo de la verificación server-side.
 */
import {
  type ApiRequest,
  type ApiResponse,
  assertMethod,
  jsonResponse,
  errorResponse,
  paymentsEnabledServer,
} from './_lib';

interface MpPayment {
  status?: string;
  metadata?: { plan_id?: string };
  external_reference?: string;
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (!assertMethod(req, res, 'GET')) return;

  // GUARD (NO PRODUCTIVO): con el cobro deshabilitado, este endpoint no debe
  // poder usarse para "aprobar" un pago y desbloquear el informe. Devolvemos
  // siempre `approved:false` para que ningún flujo entregue contenido pago
  // mientras la integración no esté endurecida. Ver paymentsEnabledServer().
  if (!paymentsEnabledServer()) {
    jsonResponse(res, 200, { approved: false });
    return;
  }

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    errorResponse(res, 503, 'mp_not_configured');
    return;
  }

  const rawId = req.query?.payment_id ?? req.query?.collection_id;
  const paymentId = Array.isArray(rawId) ? rawId[0] : rawId;
  // Sólo dígitos: los payment_id de MP son numéricos. Evita inyección en la URL.
  if (!paymentId || !/^\d{1,32}$/.test(paymentId)) {
    errorResponse(res, 400, 'missing_payment_id');
    return;
  }

  try {
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!mpRes.ok) {
      jsonResponse(res, 200, { approved: false });
      return;
    }
    const pay = (await mpRes.json()) as MpPayment;
    // Sólo devolvemos lo mínimo necesario para el frontend (no el pago entero).
    jsonResponse(res, 200, {
      approved: pay.status === 'approved',
      status: pay.status ?? null,
      planId: pay.metadata?.plan_id ?? null,
      externalReference: pay.external_reference ?? null,
    });
  } catch {
    jsonResponse(res, 200, { approved: false });
  }
}
