import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MilestoneCelebrationProps {
  show: boolean;
  milestone: 25 | 50 | 75;
  onDone: () => void;
}

const MESSAGES = {
  25: { emoji: '🔥', text: '¡Arrancaste muy bien!', sub: 'Ya completaste el primer cuarto del test.' },
  50: { emoji: '⚡', text: '¡A mitad de camino!', sub: 'Tu perfil ya está tomando forma.' },
  75: { emoji: '🎯', text: '¡Casi llegás!', sub: 'Las últimas preguntas son las más reveladoras.' },
};

export default function MilestoneCelebration({ show, milestone, onDone }: MilestoneCelebrationProps) {
  const msg = MESSAGES[milestone];

  useEffect(() => {
    if (show) {
      const t = setTimeout(onDone, 2200);
      return () => clearTimeout(t);
    }
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-100 shadow-2xl rounded-3xl px-8 py-6 text-center max-w-[260px]"
          >
            <div className="text-4xl mb-3">{msg.emoji}</div>
            <p className="font-display font-black text-[18px] text-slate-900 mb-1">{msg.text}</p>
            <p className="text-[13px] text-slate-500 font-medium leading-snug">{msg.sub}</p>

            {/* Progress ring visual */}
            <div className="mt-4 flex items-center justify-center gap-1.5">
              {[25, 50, 75, 100].map(v => (
                <div
                  key={v}
                  className={`h-1.5 w-6 rounded-full ${v <= milestone ? 'bg-brand-sky' : 'bg-slate-100'}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
