import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Route } from 'lucide-react';
import type { Chapter } from '../data/chapters';
import { TOTAL_CHAPTERS } from '../data/chapters';
import { EASE } from '../ui/theme';

interface ChapterTransitionProps {
  chapter: Chapter;
  onContinue: () => void;
}

/**
 * Transición entre capítulos — un respiro calmo (estilo Headspace/Calm) que
 * marca el avance por etapas sin gamificación infantil. Se auto-avanza para no
 * agregar fricción, pero es saltable con un toque en cualquier parte.
 */
export default function ChapterTransition({ chapter, onContinue }: ChapterTransitionProps) {
  useEffect(() => {
    const t = setTimeout(onContinue, 2000);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onContinue}
      className="fixed inset-0 z-[60] bg-paper flex flex-col items-center justify-center text-center px-8 cursor-pointer"
    >
      {/* Segmentos de capítulo */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
        className="flex items-center gap-1.5 mb-9"
      >
        {Array.from({ length: TOTAL_CHAPTERS }).map((_, i) => (
          <div
            key={i}
            className={`h-[5px] rounded-full transition-all duration-500 ${
              i < chapter.numero - 1 ? 'bg-brand-sky w-5' : i === chapter.numero - 1 ? 'bg-ink w-8' : 'bg-line w-5'
            }`}
          />
        ))}
      </motion.div>

      {chapter.adaptive ? (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.45, ease: EASE }}
          className="inline-flex items-center gap-2 mb-4 rounded-full bg-ink/[0.04] border border-line pl-2 pr-3 py-1"
        >
          <span className="w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center">
            <Route size={11} strokeWidth={2.6} className="text-slate-950" />
          </span>
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-ink/70">
            Recorrido personalizado
          </span>
        </motion.span>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.45, ease: EASE }}
          className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-sky mb-3"
        >
          Módulo {chapter.numero}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.5, ease: EASE }}
        className="font-display font-black text-[32px] sm:text-[38px] text-ink leading-[1.08] tracking-tight mb-3 max-w-sm"
      >
        {chapter.titulo}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
        className="text-ink/55 text-[14.5px] leading-relaxed max-w-[280px]"
      >
        {chapter.subtitulo}
      </motion.p>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-10 text-[11.5px] text-ink/35 font-medium"
      >
        Tocá para continuar
      </motion.span>
    </motion.div>
  );
}
