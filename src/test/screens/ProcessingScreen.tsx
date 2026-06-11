import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProcessingScreenProps {
  nombre: string;
  onDone: () => void;
}

const STEPS = [
  'Analizando tu perfil vocacional',
  'Cruzando tus dimensiones con las carreras',
  'Identificando tu arquetipo',
  'Preparando tu resultado personalizado',
];

export default function ProcessingScreen({ nombre, onDone }: ProcessingScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const intervals = STEPS.map((_, i) =>
      setTimeout(() => setStepIndex(i), i * 900)
    );
    const done = setTimeout(onDone, STEPS.length * 900 + 600);
    return () => {
      intervals.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-5">
      {/* Pulso calmo */}
      <div className="relative mb-12 flex items-center justify-center w-28 h-28">
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{ background: 'radial-gradient(circle at 38% 34%, #e7c6b3, #c45d3a)' }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full border border-clay/30"
          animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <h2 className="font-serif font-semibold text-[25px] text-ink text-center mb-5 tracking-[-0.01em] leading-tight">
        {nombre ? `Calculando tu perfil, ${nombre.split(' ')[0]}` : 'Calculando tu perfil'}
      </h2>

      <div className="h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-ink/55 text-[14px] font-medium text-center"
          >
            {STEPS[stepIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex gap-2 mt-9">
        {STEPS.map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full"
            animate={{ width: i <= stepIndex ? 26 : 8, backgroundColor: i <= stepIndex ? '#c45d3a' : '#e8e1d4' }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}
