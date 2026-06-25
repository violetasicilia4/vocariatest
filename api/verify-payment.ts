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
export default async function handler(req: any, res: any): Promise<void> {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    res.status(503).json({ approved: false, error: 'mp_not_configured' });
    return;
  }

  const paymentId =
    (req.query && (req.query.payment_id || req.query.collection_id)) ||
    new URL(req.url, 'http://localhost').searchParams.get('payment_id');

  if (!paymentId) {
    res.status(400).json({ approved: false, error: 'missing_payment_id' });
    return;
  }

  try {
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!mpRes.ok) {
      res.status(200).json({ approved: false });
      return;
    }
    const pay = await mpRes.json();
    res.status(200).json({
      approved: pay.status === 'approved',
      status: pay.status,
      planId: pay.metadata?.plan_id ?? null,
      externalReference: pay.external_reference ?? null,
    });
  } catch {
    res.status(200).json({ approved: false });
  }
}
