import { motion } from 'motion/react';
import { Check, Lock, FileText, MapPin, TrendingUp, Shield } from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import LogoIcon from '../../components/ui/LogoIcon';

interface CheckoutScreenProps {
  nombre: string;
  email: string;
  result: ScoringResult;
  onBack: () => void;
}

const INCLUYE = [
  'Descripción completa de tu arquetipo vocacional',
  'Top 8 carreras con justificación personalizada',
  'Universidades disponibles en tu provincia',
  'Duración real de cada carrera (no solo la oficial)',
  'Salidas laborales concretas y rangos salariales',
  '"Lo que nadie te cuenta" — contras honestos',
  'Guía de próximos pasos para explorar cada carrera',
  'Comparativa entre tus 3 mejores opciones',
  'Plan B vocacional — qué hacer si te equivocás',
  'PDF descargable por 30 días',
];

export default function CheckoutScreen({ nombre, email, result, onBack }: CheckoutScreenProps) {
  const { arquetipoPrimario, confianza } = result;
  const firstName = nombre.split(' ')[0];

  const handlePago = () => {
    alert('Integración con Mercado Pago próximamente. Tu resultado fue guardado.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <LogoIcon size={22} />
          <span className="font-display font-bold text-[13px] text-slate-400">Vocaria</span>
        </div>
        <button onClick={onBack} className="text-[13px] text-slate-400 hover:text-slate-700 transition-colors font-medium">
          ← Volver
        </button>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-5 py-8 pb-32 space-y-5">

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-slate-400 text-[13px] font-medium mb-1">Tu informe está listo, {firstName}</p>
          <h1 className="font-display font-black text-[26px] sm:text-[30px] text-slate-900 leading-tight tracking-tight">
            Desbloqueá tu informe completo
          </h1>
          <p className="text-slate-500 text-[14px] mt-2 leading-relaxed">
            Basado en tu arquetipo <span className="text-slate-900 font-bold">{arquetipoPrimario.nombre}</span> con {confianza}% de precisión.
          </p>
        </motion.div>

        {/* Precio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-3xl border-2 border-slate-900 bg-[#07111F] p-6"
        >
          <div className="flex items-end gap-2 mb-1">
            <span className="font-display font-black text-[42px] text-white leading-none">$4.900</span>
            <span className="text-white/50 text-[14px] font-medium mb-2">ARS · pago único</span>
          </div>
          <p className="text-white/40 text-[12px]">Menos que un café por año de carrera.</p>
        </motion.div>

        {/* Incluye */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-4">Tu informe incluye</p>
          <div className="space-y-3">
            {INCLUYE.map(item => (
              <div key={item} className="flex items-start gap-3">
                <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-[13px] text-slate-600 font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
          className="rounded-2xl border border-slate-200 p-4 flex items-center gap-3"
        >
          <FileText size={16} className="text-slate-300 shrink-0" />
          <div>
            <p className="text-[12px] text-slate-400 font-medium">PDF enviado a</p>
            <p className="text-[13px] text-slate-900 font-bold">{email}</p>
          </div>
        </motion.div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-5 flex-wrap"
        >
          {[
            { icon: Shield, text: 'Pago seguro' },
            { icon: Lock, text: 'Datos protegidos' },
            { icon: MapPin, text: 'Universidades de Argentina' },
            { icon: TrendingUp, text: 'Salarios actualizados' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon size={12} className="text-slate-300" />
              <span className="text-[11px] text-slate-400 font-medium">{text}</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 sm:px-5 pb-5 pt-4 bg-gradient-to-t from-white via-white/95 to-transparent">
        <button
          onClick={handlePago}
          className="w-full max-w-xl mx-auto block py-4 rounded-2xl bg-brand-lime text-slate-950 font-display font-black text-[16px] tracking-wide hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_8px_32px_rgba(213,255,63,0.4)]"
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
