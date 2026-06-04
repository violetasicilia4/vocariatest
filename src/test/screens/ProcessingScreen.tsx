import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProcessingScreenProps {
  nombre: string;
  onDone: () => void;
}

const STEPS = [
  'Analizando tus respuestas...',
  'Calculando tu perfil vocacional...',
  'Identificando tu arquetipo...',
  'Preparando tu resultado personalizado...',
];

export default function ProcessingScreen({ nombre, onDone }: ProcessingScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setStepIndex(i), i * 900)
    );
    const done = setTimeout(onDone, STEPS.length * 900 + 500);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onDone]);

  const firstName = nombre.split(' ')[0];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
      {/* Animated circles */}
      <div className="relative mb-12 w-24 h-24">
        <motion.div
          className="absolute inset-0 rounded-full bg-slate-900"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-brand-lime"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🧭</span>
        </div>
      </div>

      <h2 className="font-display font-black text-[22px] text-slate-900 text-center mb-3 tracking-tight">
        {firstName ? `Calculando tu perfil, ${firstName}...` : 'Calculando tu perfil...'}
      </h2>

      <div className="h-6 overflow-hidden mb-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-slate-400 text-[14px] font-medium text-center"
          >
            {STEPS[stepIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Step dots */}
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full"
            animate={{
              width: i <= stepIndex ? 24 : 8,
              backgroundColor: i <= stepIndex ? '#0f172a' : '#e2e8f0',
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}
