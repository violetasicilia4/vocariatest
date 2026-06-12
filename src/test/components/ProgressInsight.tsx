import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, Target, FlaskConical, Route } from 'lucide-react';
import type { Insight } from '../data/insights';
import { EASE } from '../ui/theme';

const ICON = {
  pattern: Sparkles,
  precision: Target,
  hypothesis: FlaskConical,
  adaptive: Route,
} as const;

/**
 * Chip de "el test te está leyendo". Aparece bajo el progreso cuando se cruza
 * un hito y se desliza suavemente. Usa la lima de marca para el ícono —el mismo
 * gesto de "alta afinidad" del hero— sobre una píldora clara y discreta.
 */
export default function ProgressInsight({ insight }: { insight: Insight | null }) {
  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        {insight && (
          <motion.div
            key={insight.text}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="pt-2.5"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-ink/[0.035] border border-line pl-1.5 pr-3 py-1">
              <span className="w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center shrink-0">
                {(() => {
                  const Icon = ICON[insight.tone];
                  return <Icon size={11} strokeWidth={2.6} className="text-slate-950" />;
                })()}
              </span>
              <span className="text-[12px] font-semibold text-ink/75 leading-none">
                {insight.text}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
