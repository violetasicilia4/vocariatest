import { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate, useReducedMotion } from 'motion/react';

interface ProcessingScreenProps {
  nombre: string;
  onDone: () => void;
}

const STEPS = [
  'Analizando tu forma de decidir',
  'Cruzando con 130+ carreras',
  'Identificando tu arquetipo',
  'Generando tu resultado',
];

const STEP_MS = 620;
const TOTAL_MS = STEPS.length * STEP_MS;

// Geometría del anillo de progreso.
const SIZE = 180;
const STROKE = 12;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

export default function ProcessingScreen({ nombre, onDone }: ProcessingScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [pct, setPct] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const steps = STEPS.map((_, i) =>
      setTimeout(() => setStepIndex(i), i * STEP_MS)
    );
    const done = setTimeout(onDone, TOTAL_MS + 400);

    // El porcentaje sube de forma continua hasta 100 mientras avanzan las etapas.
    const controls = reduceMotion
      ? (setPct(100), null)
      : animate(0, 100, {
          duration: TOTAL_MS / 1000,
          ease: [0.4, 0, 0.2, 1],
          onUpdate: (v: number) => setPct(v),
        });

    return () => {
      steps.forEach(clearTimeout);
      clearTimeout(done);
      controls?.stop();
    };
  }, [onDone, reduceMotion]);

  const rounded = Math.round(pct);
  const offset = CIRC * (1 - pct / 100);

  return (
    <div className="min-h-[100dvh] bg-paper flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[320px] flex flex-col items-center">

        <h2 className="font-display font-extrabold text-[22px] lg:text-[26px] text-ink text-center mb-10 tracking-tight leading-tight">
          {nombre ? `Calculando tu perfil, ${nombre.split(' ')[0]}` : 'Calculando tu perfil'}
        </h2>

        {/* Anillo de progreso: track frío + arco azul cielo de marca con remates
            redondeados. El porcentaje cuenta en el centro. */}
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="-rotate-90"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="vocaria-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#258ef9" />
                <stop offset="100%" stopColor="#5fb0ff" />
              </linearGradient>
            </defs>

            {/* Track */}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="currentColor"
              className="text-line"
              strokeWidth={STROKE}
            />

            {/* Arco de avance */}
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="url(#vocaria-ring)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.2, ease: 'linear' }}
              style={{
                strokeDashoffset: offset,
                filter: 'drop-shadow(0 0 8px rgba(37,142,249,0.35))',
              }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-extrabold text-ink text-[38px] tracking-tight tabular-nums">
              {rounded}
              <span className="text-ink/40 text-[24px] font-bold ml-0.5">%</span>
            </span>
          </div>
        </div>

        {/* Etapa actual — debajo del anillo. */}
        <div className="h-5 overflow-hidden mt-8 w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-ink/50 text-[12.5px] font-medium text-center tracking-wide tabular-nums"
            >
              {STEPS[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
