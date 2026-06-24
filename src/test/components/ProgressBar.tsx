import { motion, AnimatePresence } from 'motion/react';
import { stageForPct } from '../data/stages';
import { EASE } from '../ui/theme';

interface ProgressBarProps {
  /** Avance global 0–100 (congruente con las preguntas respondidas). */
  pct: number;
}

/**
 * Barra que cuenta una historia: una etapa que evoluciona (explora → detecta →
 * construye → valida → genera) y un medidor de confianza que sube. No es un
 * contador de preguntas — es la sensación de un sistema que entiende mejor a
 * cada paso.
 */
export default function ProgressBar({ pct }: ProgressBarProps) {
  const { label } = stageForPct(pct);

  return (
    <div className="w-full">
      <div className="flex items-end mb-1.5">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="block text-[13px] font-bold text-ink/65 tracking-tight font-display"
            >
              {label}
            </motion.span>
          </AnimatePresence>
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
