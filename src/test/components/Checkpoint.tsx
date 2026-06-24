import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'motion/react';
import { CHECKPOINTS, type Checkpoint } from '../data/stages';
import { EASE } from '../ui/theme';

interface CheckpointCardProps {
  checkpoint: Checkpoint;
  onContinue: () => void;
}

/** Tiempo total en pantalla antes de que la pieza se retire sola (rápido). */
const HOLD_MS = 1700;

// Geometría del anillo — protagonista de la escena.
const SIZE = 116;
const STROKE = 9;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

/** Valor del hito anterior (de dónde "arranca" el anillo). 0 para el primero. */
function previousValue(at: number): number {
  const idx = CHECKPOINTS.findIndex((c) => c.at === at);
  return idx > 0 ? CHECKPOINTS[idx - 1].value : 0;
}

/**
 * Hito de avance del test — reinterpretado como una pieza premium: una tarjeta
 * flotante de cristal (bottom-right en desktop, bottom-center en mobile) con un
 * anillo de progreso dimensional como héroe.
 *
 * Inspiración: Apple Fitness Rings + visionOS (cristal, profundidad, luz),
 * Stripe/Linear (sobriedad), Emil Kowalski (springs suaves). El anillo viaja
 * del hito anterior al actual, el número cuenta en sync, el mensaje aparece y
 * la pieza se retira sola — sin gamificación, sin trofeos, sin confeti.
 *
 * No bloquea el flujo: flota en una esquina y se va. GPU-friendly (solo
 * transform/opacity) y respeta prefers-reduced-motion.
 */
export default function CheckpointCard({ checkpoint, onContinue }: CheckpointCardProps) {
  const reduceMotion = useReducedMotion();

  const from = previousValue(checkpoint.at);
  const to = checkpoint.value;

  // Una sola fuente de verdad anima anillo + número, perfectamente sincronizados.
  const mv = useMotionValue(from);
  const dashOffset = useTransform(mv, (v) => CIRC * (1 - v / 100));
  const [display, setDisplay] = useState(from);

  // Avance del anillo + conteo (spring suave, "físico").
  useEffect(() => {
    const unsub = mv.on('change', (v) => setDisplay(Math.round(v)));
    if (reduceMotion) {
      mv.set(to);
      setDisplay(to);
      return unsub;
    }
    const controls = animate(mv, to, {
      type: 'spring',
      stiffness: 140,
      damping: 20,
      mass: 0.8,
      delay: 0.08,
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [mv, to, reduceMotion]);

  // Se retira sola tras el hold. El usuario no toca nada.
  useEffect(() => {
    const t = setTimeout(onContinue, HOLD_MS);
    return () => clearTimeout(t);
  }, [onContinue]);

  // …pero puede adelantarse con teclado.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') onContinue();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onContinue]);

  const enter = reduceMotion
    ? { duration: 0.2, ease: EASE }
    : { type: 'spring' as const, stiffness: 380, damping: 30, mass: 0.9 };

  return (
    // Overlay que tapa la pantalla y se desvanece — la pieza vuelve al centro.
    <motion.div
      onClick={onContinue}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.3, ease: EASE }}
      className="fixed inset-0 z-[80] flex items-center justify-center px-6
                 bg-ink/30 backdrop-blur-md"
    >
      {/* Tarjeta de cristal centrada. */}
      <motion.div
        role="status"
        aria-live="polite"
        aria-label={`${checkpoint.title}. ${to}% completado.`}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.96 }}
        transition={enter}
        className="relative w-[300px] max-w-[calc(100vw-3rem)] transform-gpu will-change-transform"
      >
      {/* Resplandor difuso detrás del cristal — da aire y temperatura de marca. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[44px] opacity-80 blur-2xl
                   bg-[radial-gradient(120%_120%_at_50%_0%,rgba(37,142,249,0.30),transparent_60%)]"
      />

      {/* Tarjeta de cristal: borde lumínico, blur, sombras en capas y reflejo superior. */}
      <div
        className="relative overflow-hidden rounded-[28px] border border-white/60
                   bg-white/65 backdrop-blur-2xl backdrop-saturate-150
                   px-6 pt-7 pb-6 flex flex-col items-center text-center
                   shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_0_0_1px_rgba(255,255,255,0.25),0_24px_60px_-18px_rgba(11,22,40,0.32),0_10px_24px_-12px_rgba(11,22,40,0.20)]"
      >
        {/* Sheen superior — la "luz" que entra desde arriba sobre el cristal. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[28px] opacity-70
                     bg-gradient-to-b from-white/80 via-white/20 to-transparent"
        />

        {/* ── Anillo (héroe) ─────────────────────────────────────────── */}
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          {/* Disco de cristal interior: profundidad + reflejo especular. */}
          <div
            aria-hidden
            className="absolute rounded-full bg-gradient-to-b from-white/85 to-white/35
                       shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),inset_0_-10px_18px_rgba(11,22,40,0.06)]"
            style={{ inset: STROKE + 3 }}
          />

          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="relative -rotate-90">
            {/* Track grabado en el cristal. */}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="rgba(11,22,40,0.07)"
              strokeWidth={STROKE}
            />

            {/* Arco de progreso — color estático de marca + luz propia. */}
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="#258ef9"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              style={{
                strokeDashoffset: dashOffset,
                filter: 'drop-shadow(0 2px 8px rgba(37,142,249,0.40))',
              }}
            />
          </svg>

          {/* Número — cuenta en sync con el anillo. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-semibold text-ink text-[30px] leading-none tracking-tight tabular-nums">
              {display}
              <span className="text-[17px] font-medium text-ink/45 ml-[1px]">%</span>
            </span>
          </div>
        </div>

        {/* ── Mensaje — aparece después del anillo ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.32, duration: 0.4, ease: EASE }}
          className="mt-5"
        >
          <h3 className="font-display font-semibold text-[16px] text-ink tracking-tight leading-tight">
            {checkpoint.title}
          </h3>
          <p className="mt-1.5 text-[12.5px] text-ink/55 font-medium leading-snug max-w-[220px] mx-auto">
            {checkpoint.text}
          </p>
        </motion.div>
      </div>
      </motion.div>
    </motion.div>
  );
}
