import { motion } from 'motion/react';
import { Check, Lock, FileText, MapPin, TrendingUp, Shield } from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import LogoIcon from '../../components/ui/LogoIcon';
import { PLANES, type PlanId } from '../data/profile';
import { CARD, CARD_SHADOW, CTA_PRIMARY } from '../ui/theme';

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

  const handlePago = () => {
    alert('Integración con Mercado Pago próximamente. Tu resultado fue guardado.');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white/70 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2 text-[#07111F]">
          <LogoIcon size={22} />
          <span className="font-display font-bold text-[13px] text-slate-700">Vocaria</span>
        </div>
        <button onClick={onBack} className="text-[13px] text-slate-400 hover:text-slate-700 transition-colors font-medium">
          ← Volver
        </button>
      </div>

      <div className="max-w-xl mx-auto px-5 py-8 pb-32 space-y-6">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-slate-500 text-[13px] font-medium mb-2">Tu informe está listo, {firstName}</p>
          <h1 className="font-display font-black text-[28px] text-slate-900 leading-tight tracking-tight">
            Plan {planData.nombre}
          </h1>
          <p className="text-slate-500 text-[14px] mt-2 leading-relaxed">
            Basado en tu arquetipo <span className="text-slate-900 font-semibold">{primario.nombre}</span> con {confianza}% de precisión.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[20px] border border-brand-lime bg-brand-lime/10 p-6"
          style={{ boxShadow: '0 10px 32px rgba(213,255,63,0.18)' }}
        >
          <div className="flex items-end gap-2 mb-1">
            <span className="font-display font-black text-[42px] text-slate-900 leading-none">${planData.precio}</span>
            <span className="text-slate-500 text-[14px] font-medium mb-2">ARS · pago único</span>
          </div>
          <p className="text-slate-500 text-[12px]">{planData.tagline}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`${CARD} p-5`}
          style={{ boxShadow: CARD_SHADOW }}
        >
          <p className="text-[12px] font-bold text-slate-400 tracking-widest uppercase mb-4">Tu informe incluye</p>
          <div className="space-y-3">
            {planData.incluye.map(item => (
              <div key={item} className="flex items-start gap-3">
                <Check size={14} className="text-[#07111F] shrink-0 mt-0.5" />
                <span className="text-[13px] text-slate-600 font-medium leading-snug">{item}</span>
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
          <FileText size={16} className="text-slate-400 shrink-0" />
          <div>
            <p className="text-[13px] text-slate-500 font-medium">PDF enviado a</p>
            <p className="text-[13px] text-slate-900 font-bold">{email}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex gap-4 flex-wrap"
        >
          {[
            { icon: Shield, text: 'Pago seguro' },
            { icon: Lock, text: 'Datos protegidos' },
            { icon: MapPin, text: 'Universidades de Argentina' },
            { icon: TrendingUp, text: 'Salarios actualizados' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon size={12} className="text-slate-400" />
              <span className="text-[11px] text-slate-400 font-medium">{text}</span>
            </div>
          ))}
        </motion.div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 px-5 pb-6 pt-6 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent">
        <button
          onClick={handlePago}
          className={`w-full max-w-xl mx-auto block py-4 text-[16px] ${CTA_PRIMARY}`}
        >
          Pagar con Mercado Pago →
        </button>
        <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
          Acceso inmediato después del pago
        </p>
      </div>
    </div>
  );
}
