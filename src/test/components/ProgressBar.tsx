import { motion, AnimatePresence } from 'motion/react';
import { stageForPct } from '../data/stages';
import { EASE } from '../ui/theme';

interface ProgressBarProps {
  /** Avance global 0–100. */
  pct: number;
  /** Confianza del perfil 0–100 (medidor de precisión percibida). */
  confidence: number;
}

/**
 * Barra que cuenta una historia: una etapa que evoluciona (explora → detecta →
 * construye → valida → genera) y un medidor de confianza que sube. No es un
 * contador de preguntas — es la sensación de un sistema que entiende mejor a
 * cada paso.
 */
export default function ProgressBar({ pct, confidence }: ProgressBarProps) {
  const { label } = stageForPct(pct);

  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-2 gap-3">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="block text-[13px] font-extrabold text-ink tracking-tight font-display"
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-baseline gap-1 shrink-0">
          <span className="text-[14px] font-black text-brand-sky tabular-nums leading-none">{confidence}%</span>
          <span className="text-[9.5px] font-bold text-ink/35 uppercase tracking-[0.1em]">conf.</span>
        </div>
      </div>

      <div className="h-[6px] rounded-full bg-line overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-brand-sky"
          style={{ boxShadow: '0 0 12px rgba(37,142,249,0.5)' }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>
    </div>
  );
}
