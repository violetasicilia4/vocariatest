import { useEffect } from 'react';
import { motion } from 'motion/react';
import type { Checkpoint } from '../data/stages';
import { CTA_PRIMARY, CARD_SHADOW_LG, EASE } from '../ui/theme';

interface CheckpointModalProps {
  checkpoint: Checkpoint;
  confidence: number;
  onContinue: () => void;
}

/**
 * Checkpoint premium: interrumpe el flujo apenas un instante para que el avance
 * sea imposible de ignorar. Un anillo de confianza que se dibuja, un título
 * corto y una sola acción. Sin confeti, sin puntos, sin emojis.
 */
export default function CheckpointModal({ checkpoint, confidence, onContinue }: CheckpointModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') onContinue();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onContinue]);

  const R = 30;
  const C = 2 * Math.PI * R;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onContinue}
      className="fixed inset-0 z-[70] flex items-center justify-center px-6 bg-ink/25 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={checkpoint.title}
        className="w-full max-w-[330px] bg-paper-raised rounded-[28px] p-7 text-center"
        style={{ boxShadow: CARD_SHADOW_LG }}
      >
        {/* Anillo de confianza */}
        <div className="relative w-[76px] h-[76px] mx-auto mb-5">
          <svg width="76" height="76" viewBox="0 0 76 76" className="-rotate-90">
            <circle cx="38" cy="38" r={R} fill="none" stroke="var(--color-line)" strokeWidth="5" />
            <motion.circle
              cx="38" cy="38" r={R} fill="none" stroke="var(--color-brand-sky)" strokeWidth="5"
              strokeLinecap="round" strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: C * (1 - confidence / 100) }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-black text-[18px] text-ink tabular-nums">{confidence}%</span>
          </div>
        </div>

        <h3 className="font-display font-black text-[21px] text-ink tracking-tight mb-2">
          {checkpoint.title}
        </h3>
        <p className="text-[13.5px] text-ink/55 font-medium leading-relaxed mb-6">
          {checkpoint.text}
        </p>

        <button
          onClick={onContinue}
          autoFocus
          className={`w-full py-3.5 text-[15px] ${CTA_PRIMARY}`}
        >
          Continuar
        </button>
      </motion.div>
    </motion.div>
  );
}
