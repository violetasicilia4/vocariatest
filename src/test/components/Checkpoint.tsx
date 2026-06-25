import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'motion/react';
import { CHECKPOINTS, type Checkpoint } from '../data/stages';
import { EASE, SKY } from '../ui/theme';

interface CheckpointCardProps {
  checkpoint: Checkpoint;
  onContinue: () => void;
}

/** Tiempo total en pantalla — suficiente para leer el hito sin demorar el flujo. */
const HOLD_MS = 3100;

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

  // Punto líder: viaja por la punta del arco para sugerir "lectura en vivo".
  // Ángulo medido desde arriba (−90°) y avanzando en sentido horario.
  const dotX = useTransform(mv, (v) => SIZE / 2 + R * Math.cos((v / 100) * Math.PI * 2 - Math.PI / 2));
  const dotY = useTransform(mv, (v) => SIZE / 2 + R * Math.sin((v / 100) * Math.PI * 2 - Math.PI / 2));

  // Mientras el anillo "calcula" titila; cuando el valor aterriza, se aquieta.
  const [settled, setSettled] = useState(reduceMotion);

  // Avance del anillo + conteo (spring suave, "físico").
  useEffect(() => {
    const unsub = mv.on('change', (v) => setDisplay(Math.round(v)));
    if (reduceMotion) {
      mv.set(to);
      setDisplay(to);
      setSettled(true);
      return unsub;
    }
    setSettled(false);
    const controls = animate(mv, to, {
      type: 'spring',
      stiffness: 70,
      damping: 20,
      mass: 1,
      delay: 0.15,
      onComplete: () => setSettled(true),
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
      {/* Halo sutil de marca (azul cielo) — da aire sin romper la paleta. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[40px] opacity-70 blur-2xl
                   bg-[radial-gradient(120%_120%_at_50%_0%,rgba(37,142,249,0.22),transparent_62%)]"
      />

      {/* Tarjeta — misma identidad que las cards del test: blanco, borde frío,
          radio y sombra azulada de marca. */}
      <div
        className="relative rounded-[24px] border border-line bg-paper-raised
                   px-7 pt-7 pb-6 flex flex-col items-center text-center"
        style={{ boxShadow: '0 16px 48px rgba(11,22,40,0.14)' }}
      >
        {/* ── Anillo (héroe) ─────────────────────────────────────────── */}
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          {/* Halo circular detrás del anillo — azul cielo de marca, MUY sutil.
              Respira despacio mientras "procesa" (no es un glow neón, es la misma
              luz fría sky-soft de la landing). Es un círculo difuso, así nunca se
              recorta en cuadrado. Al aterrizar el valor, se calma. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              inset: -6,
              background:
                'radial-gradient(circle at 50% 50%, rgba(37,142,249,0.16) 0%, rgba(37,142,249,0.06) 48%, transparent 72%)',
              filter: 'blur(6px)',
            }}
            animate={
              reduceMotion || settled
                ? { opacity: 0.5, scale: 1 }
                : { opacity: [0.45, 0.75, 0.55, 0.7, 0.45], scale: [0.99, 1.03, 1.0, 1.02, 0.99] }
            }
            transition={
              reduceMotion || settled
                ? { duration: 0.6, ease: EASE }
                : { duration: 2.4, times: [0, 0.3, 0.55, 0.78, 1], repeat: Infinity, ease: 'easeInOut' }
            }
          />

          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="relative -rotate-90 overflow-visible"
          >
            {/* Track — mismo gris frío que las barras del test. */}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth={STROKE}
            />

            {/* Arco de progreso — azul cielo de marca (#258ef9): el mismo color
                "vivo" del progreso/foco en toda la web. Sombra fría y suave, sin
                neón. Una respiración mínima de opacidad insinúa el cálculo sin
                gritar. */}
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke={SKY}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              style={{
                strokeDashoffset: dashOffset,
                filter: 'drop-shadow(0 1px 3px rgba(37,142,249,0.30))',
              }}
              animate={reduceMotion || settled ? { opacity: 1 } : { opacity: [1, 0.9, 1] }}
              transition={
                reduceMotion || settled
                  ? { duration: 0.4, ease: EASE }
                  : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
              }
            />
          </svg>

          {/* Punto líder en la punta del arco — viaja con el progreso como un
              cabezal de lectura. Blanco con borde sky y una sombra fría discreta
              (coherente con los checks/acentos de marca). Se desvanece al fijar. */}
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 overflow-visible pointer-events-none"
          >
            <motion.circle
              cx={dotX}
              cy={dotY}
              r={STROKE / 2 - 0.5}
              fill="#ffffff"
              stroke={SKY}
              strokeWidth={2.5}
              style={{
                filter: 'drop-shadow(0 1px 4px rgba(37,142,249,0.45))',
                transformBox: 'fill-box',
                transformOrigin: 'center',
              }}
              animate={
                reduceMotion ? { opacity: 0 } : settled ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: [0.92, 1.08, 0.92] }
              }
              transition={
                reduceMotion || settled
                  ? { duration: 0.45, ease: EASE }
                  : { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }
              }
            />
          </svg>

          {/* Número — cuenta en sync con el anillo (tipografía del test).
              Mientras calcula, respira suave en opacidad; al fijar el valor,
              queda firme. Sobrio, sin parpadeo brusco. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="font-display font-bold text-ink text-[30px] leading-none tracking-tight tabular-nums"
              animate={reduceMotion || settled ? { opacity: 1 } : { opacity: [1, 0.72, 1] }}
              transition={
                reduceMotion || settled
                  ? { duration: 0.3, ease: EASE }
                  : { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              {display}%
            </motion.span>
          </div>
        </div>

        {/* ── Mensaje — aparece después del anillo, en un solo renglón ── */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.4, duration: 0.45, ease: EASE }}
          className="mt-5"
        >
          <h3 className="font-display font-bold text-[16px] text-ink tracking-tight leading-tight whitespace-nowrap">
            {checkpoint.title}
          </h3>
          <p className="mt-1.5 text-[12.5px] text-ink/55 font-medium leading-snug whitespace-nowrap">
            {checkpoint.text}
          </p>
        </motion.div>
      </div>
      </motion.div>
    </motion.div>
  );
}
