import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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

export default function ProcessingScreen({ nombre, onDone }: ProcessingScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const intervals = STEPS.map((_, i) =>
      setTimeout(() => setStepIndex(i), i * 620)
    );
    const done = setTimeout(onDone, STEPS.length * 620 + 400);
    return () => {
      intervals.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [onDone]);

  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-[100dvh] bg-paper flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[300px] flex flex-col items-center">

        <h2 className="font-display font-extrabold text-[22px] lg:text-[26px] text-ink text-center mb-8 tracking-tight leading-tight">
          {nombre ? `Calculando tu perfil, ${nombre.split(' ')[0]}` : 'Calculando tu perfil'}
        </h2>

        {/* Barra de procesamiento minimalista: avance determinado + un destello
            que recorre la barra para dar la sensación de "datos en proceso". */}
        <div className="relative w-full h-[3px] rounded-full bg-line overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-ink"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-brand-sky/70 to-transparent"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Estado actual — alineado a la barra, monoespaciado sutil de "sistema". */}
        <div className="h-5 overflow-hidden mt-5 w-full">
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
