import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Download, X } from 'lucide-react';
import LogoIcon from '../../components/ui/LogoIcon';
import { CTA_PRIMARY, CTA_DARK, EASE } from '../ui/theme';
import { verifyPayment, loadPendingOrder, clearPendingOrder, type PendingOrder } from '../../services/payments';
import { openPlanReport } from '../report/printableReport';
import { PLANES, type PlanId } from '../data/profile';

type Estado = 'verifying' | 'approved' | 'rejected';

/**
 * Pantalla de retorno de Mercado Pago. Verifica el pago server-side y, si está
 * aprobado, entrega el informe (PDF) con un click del usuario — el click es un
 * gesto que evita el bloqueo de popups al abrir la ventana del informe.
 */
export default function PaymentReturn({ onClose }: { onClose: () => void }) {
  const [estado, setEstado] = useState<Estado>('verifying');
  const [order] = useState<PendingOrder | null>(() => loadPendingOrder());
  const [planId, setPlanId] = useState<PlanId | null>(order?.plan ?? null);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get('payment_id') || params.get('collection_id') || '';
    const status = params.get('status') || params.get('collection_status');
    // Limpiamos la URL para que un refresh no vuelva a disparar el retorno.
    window.history.replaceState({}, '', window.location.pathname);

    let active = true;
    (async () => {
      if (!paymentId) {
        if (active) setEstado(status === 'approved' ? 'approved' : 'rejected');
        return;
      }
      const { approved, planId: verifiedPlan } = await verifyPayment(paymentId);
      if (!active) return;
      if (approved) {
        if (verifiedPlan) setPlanId(verifiedPlan);
        setEstado('approved');
      } else {
        setEstado('rejected');
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const firstName = order?.nombre?.split(' ')[0] ?? '';
  const planNombre = planId ? PLANES[planId].nombre : '';

  const handleDescargar = () => {
    if (order && planId) {
      openPlanReport(order.nombre, order.result, planId);
      clearPendingOrder();
      setAbierto(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-paper overflow-y-auto">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[121] w-9 h-9 rounded-full flex items-center justify-center text-ink/40 hover:text-ink hover:bg-line/60 transition-colors"
        aria-label="Cerrar"
      >
        <X size={18} strokeWidth={2.2} />
      </button>

      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
        <div className="flex items-center gap-2 mb-8 text-ink">
          <LogoIcon size={22} />
          <span className="font-display font-bold text-[14px] tracking-tight">Vocaria</span>
        </div>

        {estado === 'verifying' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-brand-sky/30 border-t-brand-sky rounded-full animate-spin mb-5" />
            <p className="text-ink/60 text-[14px] font-medium">Confirmando tu pago…</p>
          </motion.div>
        )}

        {estado === 'approved' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full max-w-md flex flex-col items-center"
          >
            <span className="w-16 h-16 rounded-full bg-brand-lime/25 flex items-center justify-center mb-5">
              <CheckCircle2 size={34} className="text-sky-deep" strokeWidth={2} />
            </span>
            <h1 className="font-display font-black text-[26px] text-ink tracking-tight leading-tight mb-2">
              ¡Pago confirmado{firstName ? `, ${firstName}` : ''}!
            </h1>
            {order && planId ? (
              <>
                <p className="text-ink/60 text-[14px] font-medium leading-relaxed mb-7">
                  Tu informe <span className="text-ink font-semibold">{planNombre}</span> está listo.
                  {abierto && ' Se abrió en una pestaña nueva — desde ahí podés guardarlo como PDF.'}
                </p>
                <button
                  onClick={handleDescargar}
                  className={`w-full flex items-center justify-center gap-2 py-4 text-[15px] ${CTA_PRIMARY}`}
                >
                  <Download size={17} strokeWidth={2.3} />
                  {abierto ? 'Abrir mi informe de nuevo' : 'Abrir mi informe (PDF)'}
                </button>
                <button onClick={onClose} className={`w-full mt-3 py-3.5 text-[14px] ${CTA_DARK}`}>
                  Volver al inicio
                </button>
              </>
            ) : (
              <>
                <p className="text-ink/60 text-[14px] font-medium leading-relaxed mb-7">
                  Tu pago se acreditó. Para descargar el informe, abrí Vocaria en el mismo
                  dispositivo y navegador donde hiciste el test.
                </p>
                <button onClick={onClose} className={`w-full py-4 text-[15px] ${CTA_PRIMARY}`}>
                  Entendido
                </button>
              </>
            )}
          </motion.div>
        )}

        {estado === 'rejected' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full max-w-md flex flex-col items-center"
          >
            <span className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-5">
              <XCircle size={34} className="text-red-500" strokeWidth={2} />
            </span>
            <h1 className="font-display font-black text-[24px] text-ink tracking-tight leading-tight mb-2">
              No pudimos confirmar el pago
            </h1>
            <p className="text-ink/60 text-[14px] font-medium leading-relaxed mb-7">
              Si el cobro se hizo, vas a recibir la confirmación de Mercado Pago. No se generó
              ningún cargo si la operación quedó pendiente o rechazada.
            </p>
            <button onClick={onClose} className={`w-full py-4 text-[15px] ${CTA_PRIMARY}`}>
              Volver al inicio
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
