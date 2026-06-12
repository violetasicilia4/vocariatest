import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Checkpoint } from '../data/stages';
import { CTA_PRIMARY, CARD_SHADOW_LG, EASE } from '../ui/theme';

interface CheckpointModalProps {
  checkpoint: Checkpoint;
  confidence: number;
  onContinue: () => void;
}

/** Duración del "build" antes del reveal — el suspenso que hace que el hito pese. */
const ANALYZE_MS = 1900;

/** Cuenta ascendente con easing, en sync con el anillo. */
function useCountUp(target: number, duration: number, start: number): number {
  const [value, setValue] = useState(start);
  const rafRef = useRef(0);
  useEffect(() => {
    const t0 = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setValue(Math.round(start + (target - start) * easeOut(p)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);
  return value;
}

/**
 * Checkpoint premium con suspenso. Primero "analiza" —el anillo y el número
 * suben lento, generando expectativa— y recién cuando completa revela el
 * hallazgo. Inspirado en los anillos de Apple Fitness y el "analyzing" de
 * Stripe Radar. Sin confeti, sin puntos, sin emojis.
 */
export default function CheckpointModal({ checkpoint, confidence, onContinue }: CheckpointModalProps) {
  const startVal = Math.max(8, Math.round(confidence * 0.5));
  const value = useCountUp(confidence, ANALYZE_MS, startVal);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), ANALYZE_MS);
    return () => clearTimeout(t);
  }, []);

  // Solo se puede cerrar después del reveal (que el build siempre termine).
  useEffect(() => {
    if (!revealed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') onContinue();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [revealed, onContinue]);

  const R = 32;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - value / 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => { if (revealed) onContinue(); }}
      className="fixed inset-0 z-[70] flex items-center justify-center px-6 bg-ink/30 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={checkpoint.title}
        className="w-full max-w-[332px] bg-paper-raised rounded-[30px] p-8 text-center overflow-hidden"
        style={{ boxShadow: CARD_SHADOW_LG }}
      >
        {/* Anillo de confianza + número, centro de la escena */}
        <div className="relative w-[88px] h-[88px] mx-auto mb-6">
          {/* Pulso ambiental mientras analiza */}
          <AnimatePresence>
            {!revealed && (
              <motion.span
                className="absolute inset-0 rounded-full bg-brand-sky/15"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.5, 0, 0.5] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>

          <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90 relative">
            <circle cx="44" cy="44" r={R} fill="none" stroke="var(--color-line)" strokeWidth="6" />
            <circle
              cx="44" cy="44" r={R} fill="none" stroke="var(--color-brand-sky)" strokeWidth="6"
              strokeLinecap="round" strokeDasharray={C} strokeDashoffset={offset}
            />
          </svg>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={revealed ? { scale: [1, 1.12, 1] } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="font-display font-black text-[22px] text-ink tabular-nums">{value}%</span>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pb-1"
            >
              <motion.p
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[12px] font-bold text-ink/50 tracking-[0.14em] uppercase"
              >
                Analizando tus respuestas
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="text-[10.5px] font-bold text-brand-sky tracking-[0.16em] uppercase mb-2">
                Checkpoint
              </p>
              <h3 className="font-display font-black text-[22px] text-ink tracking-tight mb-2 leading-tight">
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
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
