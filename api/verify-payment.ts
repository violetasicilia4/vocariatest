/**
 * Verifica server-side el estado de un pago de Mercado Pago.
 *
 * El frontend lo llama al volver del checkout (?payment_id=...). Confiar solo en
 * el parámetro `status` de la URL sería inseguro (se puede falsificar): acá se
 * consulta la API de MP con el token secreto y se devuelve si está aprobado.
 *
 *   GET /api/verify-payment?payment_id=123456789
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
