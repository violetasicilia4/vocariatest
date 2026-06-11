import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProcessingScreenProps {
  nombre: string;
  onDone: () => void;
}

const STEPS = [
  'Analizando tu perfil vocacional...',
  'Cruzando tus dimensiones con las carreras...',
  'Identificando tu arquetipo...',
  'Preparando tu resultado personalizado...',
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-5">
      {/* Animated orb */}
      <div className="relative mb-12">
        <motion.div
          className="w-24 h-24 rounded-full"
          style={{ background: 'radial-gradient(circle at 35% 35%, #d5ff3f, #258ef9)' }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(213,255,63,0.2), transparent)' }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <h2 className="font-display font-black text-[22px] text-slate-900 text-center mb-4 tracking-tight">
        {nombre ? `Calculando tu perfil, ${nombre.split(' ')[0]}...` : 'Calculando tu perfil...'}
      </h2>

      <div className="h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="text-slate-500 text-[14px] font-medium text-center"
          >
            {STEPS[stepIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {STEPS.map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full"
            animate={{ width: i <= stepIndex ? 24 : 8, backgroundColor: i <= stepIndex ? '#d5ff3f' : '#e2e8f0' }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}
