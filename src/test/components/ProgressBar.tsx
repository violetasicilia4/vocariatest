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
      {/* Etapa narrativa como CONTEXTO, no como título: chica y liviana para
          no competir con la pregunta (el héroe de la pantalla). */}
      <div className="flex items-end mb-1.5">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="block text-[11.5px] font-semibold text-ink/45 tracking-tight font-display"
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Riel fino y elegante (estilo Linear/Stripe): sin glow gamificado.
          Una capa de luz muy sutil viaja con el borde de avance para dar vida
          sin gritar. La punta redondeada cierra el progreso de forma limpia. */}
      <div className="h-[4px] rounded-full bg-ink/[0.06] overflow-hidden">
        <motion.div
          className="relative h-full rounded-full bg-brand-sky"
          style={{ boxShadow: '0 1px 3px rgba(37,142,249,0.28)' }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="absolute inset-y-0 right-0 w-6 rounded-full bg-gradient-to-l from-white/35 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
