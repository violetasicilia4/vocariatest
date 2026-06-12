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

  return (
    <div className="min-h-[100dvh] bg-paper flex flex-col items-center justify-center px-5">
      {/* Pulso calmo */}
      <div className="relative mb-12 flex items-center justify-center w-28 h-28">
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{ background: 'radial-gradient(circle at 38% 34%, #9fd2f1, #258ef9)' }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full border border-sky/30"
          animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <h2 className="font-display font-extrabold text-[25px] lg:text-[30px] text-ink text-center mb-5 tracking-tight leading-tight">
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
            animate={{ width: i <= stepIndex ? 26 : 8, backgroundColor: i <= stepIndex ? '#258ef9' : '#e8eef5' }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}
