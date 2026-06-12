import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Checkpoint } from '../data/stages';
import { CARD_SHADOW_LG, EASE } from '../ui/theme';

interface CheckpointModalProps {
  checkpoint: Checkpoint;
  confidence: number;
  onContinue: () => void;
}

/** Duración del "build" antes del reveal — el suspenso que hace que el hito pese. */
const ANALYZE_MS = 1900;
/** Tiempo que el hallazgo queda en pantalla antes de cerrarse solo. */
const HOLD_MS = 3200;

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
 * Hito de confianza, premium con suspenso. Primero "analiza" —el anillo y el
 * número suben lento, generando expectativa— y al completar revela el hallazgo.
 *
 * Jerarquía: el número manda. Es lo más grande de la escena, dentro de un
 * anillo que se lee como "nivel de confianza alcanzado" (no como progreso): un
 * trazo grueso con degradé sky→lima y un halo que respira al revelarse. Debajo,
 * la etiqueta que nombra esa cifra, el título del hito y el copy que lo explica.
 *
 * Es un momento autónomo: entra, analiza, revela y se cierra solo —el usuario
 * no tiene que tocar nada para volver al test. Un hilo de tiempo discreto avisa
 * que va a continuar. Sin confeti, sin puntos, sin emojis.
 */
export default function CheckpointModal({ checkpoint, confidence, onContinue }: CheckpointModalProps) {
  const startVal = Math.max(8, Math.round(confidence * 0.5));
  const value = useCountUp(confidence, ANALYZE_MS, startVal);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), ANALYZE_MS);
    return () => clearTimeout(t);
  }, []);

  // El hito se cierra solo cuando termina el reveal. El usuario no toca nada.
  useEffect(() => {
    if (!revealed) return;
    const t = setTimeout(onContinue, HOLD_MS);
    return () => clearTimeout(t);
  }, [revealed, onContinue]);

  // …pero si quiere adelantarse, tocar o una tecla lo cierra antes.
  useEffect(() => {
    if (!revealed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') onContinue();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [revealed, onContinue]);

  const R = 50;
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
        onClick={e => { e.stopPropagation(); if (revealed) onContinue(); }}
        role="dialog"
        aria-modal="true"
        aria-label={checkpoint.title}
        className="w-full max-w-[360px] bg-paper-raised rounded-[30px] px-9 pt-9 pb-7 text-center overflow-hidden"
        style={{ boxShadow: CARD_SHADOW_LG }}
      >
        {/* Anillo de confianza con el número como protagonista absoluto */}
        <div className="relative w-[128px] h-[128px] mx-auto mb-5">
          {/* Halo que respira: tenue mientras analiza, un pulso firme al revelar */}
          <AnimatePresence>
            {!revealed && (
              <motion.span
                className="absolute inset-1 rounded-full bg-brand-sky/12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.85, 1.12, 0.85], opacity: [0.45, 0, 0.45] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
          {revealed && (
            <motion.span
              className="absolute inset-1 rounded-full bg-brand-sky/15"
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: 1.25, opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          )}

          <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90 relative">
            <defs>
              <linearGradient id="confGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-brand-sky)" />
                <stop offset="100%" stopColor="var(--color-brand-lime)" />
              </linearGradient>
            </defs>
            <circle cx="64" cy="64" r={R} fill="none" stroke="var(--color-line)" strokeWidth="8" />
            <circle
              cx="64" cy="64" r={R} fill="none" stroke="url(#confGrad)" strokeWidth="8"
              strokeLinecap="round" strokeDasharray={C} strokeDashoffset={offset}
            />
          </svg>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={revealed ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="font-display font-black text-[40px] text-ink tabular-nums tracking-[-0.03em] leading-none">
              {value}<span className="text-[22px] align-top text-ink/40 ml-0.5">%</span>
            </span>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.p
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.45, 1, 0.45] }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
              className="text-[12px] font-bold text-ink/45 tracking-[0.16em] uppercase pb-1"
            >
              Analizando tus respuestas
            </motion.p>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="text-[11px] font-bold text-ink/40 tracking-[0.16em] uppercase mb-3">
                Confianza del perfil
              </p>
              <h3 className="font-display font-black text-[21px] text-ink tracking-tight leading-[1.15] mb-2.5">
                {checkpoint.title}
              </h3>
              <p className="text-[14.5px] text-ink/65 font-medium leading-[1.55] mx-auto max-w-[280px]">
                {checkpoint.text}
              </p>

              {/* Hilo de tiempo: avisa, sin botón, que el hito se va a cerrar solo */}
              <div className="mt-7 h-[3px] w-full rounded-full bg-line overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-brand-sky/70"
                  style={{ transformOrigin: 'left' }}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: HOLD_MS / 1000, ease: 'linear' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
