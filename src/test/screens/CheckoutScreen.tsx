import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Lock, FileText, MapPin, Shield, ChevronLeft, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import LogoIcon from '../../components/ui/LogoIcon';
import { PLANES, type PlanId } from '../data/profile';
import { CARD, CARD_SHADOW, CTA_PRIMARY, EASE } from '../ui/theme';
import { captureLead } from '../../services/leads';
import { paymentsEnabled, createPreference, savePendingOrder } from '../../services/payments';

interface CheckoutScreenProps {
  nombre: string;
  email: string;
  result: ScoringResult;
  plan: PlanId;
  onBack: () => void;
}

export default function CheckoutScreen({ nombre, email, result, plan, onBack }: CheckoutScreenProps) {
  const { primario, confianza } = result;
  const firstName = nombre.split(' ')[0];
  const planData = PLANES[plan];
  const pay = paymentsEnabled();

  const [sending, setSending] = useState(false);
  const [intentSent, setIntentSent] = useState(false);
  const [error, setError] = useState('');

  // Pago real con Mercado Pago: guardamos el pedido (incluido el resultado del
  // test) en localStorage porque el redirect nos saca de la SPA, pedimos la
  // preferencia al backend y redirigimos al checkout hosteado por MP. Al volver,
  // App verifica el pago y entrega el PDF.
  const handleMercadoPago = async () => {
    setError('');
    setSending(true);
    const ref = `vocaria-${plan}-${Date.now()}`;
    savePendingOrder({ plan, nombre, email, ref, result });
    const initPoint = await createPreference(plan, email, ref);
    if (initPoint) {
      window.location.href = initPoint;
      return; // se va de la página
    }
    setSending(false);
    setError('No pudimos iniciar el pago en este momento. Probá de nuevo en unos segundos.');
  };

  // Fallback (sin cobro habilitado): registramos la intención de compra real y
  // mostramos la reserva, sin prometer un entregable que todavía no se cobra.
  const handleReserva = async () => {
    setSending(true);
    await captureLead({ email, nombre, source: 'purchase_intent', consent: true });
    setSending(false);
    setIntentSent(true);
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-line/70 bg-paper/85 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex items-center gap-2 text-ink">
          <LogoIcon size={20} />
          <span className="font-display font-bold text-[13px] tracking-tight">Vocaria</span>
        </div>
        <button onClick={onBack} className="text-[13px] text-ink/40 hover:text-ink transition-colors font-medium flex items-center gap-1">
          <ChevronLeft size={15} strokeWidth={2.4} />
          Volver
        </button>
      </div>

      <div className="max-w-xl lg:max-w-2xl mx-auto px-5 lg:px-8 py-8 lg:py-12 pb-32 space-y-6">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <p className="text-ink/50 text-[13px] font-medium mb-2">
            {pay ? `Comprá tu informe completo, ${firstName}` : `Reservá tu informe completo, ${firstName}`}
          </p>
          <h1 className="font-display font-black text-[28px] text-ink leading-tight tracking-tight">
            Plan {planData.nombre}
          </h1>
          <p className="text-ink/55 text-[14px] mt-2 leading-relaxed">
            Basado en tu arquetipo <span className="text-ink font-semibold">{primario.nombre}</span>, con un perfil definido al {confianza}%.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: EASE }}
          className="rounded-[22px] border border-sky bg-sky-soft/50 p-6"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div className="flex items-end gap-2 mb-1">
            <span className="font-display font-extrabold tracking-tight text-[42px] text-ink leading-none">${planData.precio}</span>
            <span className="text-ink/50 text-[14px] font-medium mb-2">ARS · {pay ? 'pago único' : 'precio de lanzamiento'}</span>
          </div>
          <p className="text-ink/55 text-[12px]">{planData.tagline}</p>
          <p className="text-ink/70 text-[12.5px] font-medium mt-3 pt-3 border-t border-sky/30 leading-relaxed">
            {pay
              ? 'Pagás de forma segura con Mercado Pago y descargás tu informe completo al instante.'
              : 'Reservás sin pagar ahora. Te avisamos primero cuando esté listo y mantenés este precio de lanzamiento.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, ease: EASE }}
          className={`${CARD} p-5`}
          style={{ boxShadow: CARD_SHADOW }}
        >
          <p className="text-[11px] font-bold text-ink/40 tracking-[0.12em] uppercase mb-4">Tu informe incluye</p>
          <div className="space-y-3">
            {planData.incluye.map(item => (
              <div key={item} className="flex items-start gap-3">
                <Check size={14} strokeWidth={2.5} className="text-sky-deep shrink-0 mt-0.5" />
                <span className="text-[13px] text-ink/65 font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${CARD} p-4 flex items-center gap-3`}
          style={{ boxShadow: CARD_SHADOW }}
        >
          {pay ? <Zap size={16} className="text-ink/40 shrink-0" /> : <FileText size={16} className="text-ink/40 shrink-0" />}
          <div>
            <p className="text-[13px] text-ink/50 font-medium">{pay ? 'Lo recibís' : 'Tu informe llegará a'}</p>
            <p className="text-[13px] text-ink font-bold">{pay ? 'Al instante, apenas se acredite el pago' : email}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex gap-4 flex-wrap"
        >
          {[
            { icon: Shield, text: pay ? 'Pago protegido por Mercado Pago' : 'Sin pago ahora' },
            { icon: Lock, text: 'Datos protegidos' },
            { icon: MapPin, text: 'Universidades de Argentina' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon size={12} className="text-ink/40" />
              <span className="text-[11px] text-ink/45 font-medium">{text}</span>
            </div>
          ))}
        </motion.div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 px-5 pb-6 pt-6 bg-gradient-to-t from-paper via-paper to-transparent">
        {intentSent ? (
          <div className="w-full max-w-xl lg:max-w-2xl mx-auto rounded-[20px] border border-sky bg-sky-soft/60 px-5 py-4 flex items-start gap-3">
            <CheckCircle2 size={20} className="text-sky-deep shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-bold text-ink">Te reservamos el lugar, {firstName}.</p>
              <p className="text-[12.5px] text-ink/60 leading-snug mt-0.5">
                Estamos habilitando el pago con Mercado Pago. Te escribimos a{' '}
                <span className="text-ink font-semibold">{email}</span> apenas esté listo
                tu informe completo, sin costo de reserva.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-xl lg:max-w-2xl mx-auto">
            <button
              onClick={pay ? handleMercadoPago : handleReserva}
              disabled={sending}
              className={`w-full flex items-center justify-center gap-2 py-4 text-[16px] disabled:opacity-60 ${CTA_PRIMARY}`}
            >
              {pay
                ? (sending ? 'Abriendo Mercado Pago…' : `Pagar $${planData.precio} con Mercado Pago`)
                : (sending ? 'Reservando…' : 'Reservar mi informe completo')}
              {!sending && <ArrowRight size={18} strokeWidth={2.5} />}
            </button>
            {error && <p className="text-center text-[12px] text-red-500 font-semibold mt-2.5">{error}</p>}
            <p className="text-center text-[11px] text-ink/40 mt-2.5 font-medium">
              {pay
                ? 'Pago seguro · te lleva al checkout de Mercado Pago'
                : 'Pago con Mercado Pago en proceso de habilitación · te avisamos al mail'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
