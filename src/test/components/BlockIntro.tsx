import { motion } from 'motion/react';

interface BlockIntroProps {
  numero: number;
  totalBloques: number;
  titulo: string;
  descripcion: string;
  emoji: string;
  questionCount: number;
  onContinue: () => void;
}

export default function BlockIntro({
  numero, totalBloques, titulo, descripcion, emoji, questionCount, onContinue,
}: BlockIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center px-6 py-12 min-h-[60vh]"
    >
      {/* Block number */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: totalBloques }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i < numero ? 'bg-brand-sky w-6' : i === numero - 1 ? 'bg-[#07111F] w-6' : 'bg-slate-200 w-3'
            }`}
          />
        ))}
      </div>

      {/* Emoji */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl mb-5"
      >
        {emoji}
      </motion.div>

      {/* Label */}
      <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2">
        Bloque {numero} de {totalBloques}
      </p>

      {/* Título */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="font-display font-black text-[26px] sm:text-[30px] text-slate-900 leading-tight tracking-tight mb-3"
      >
        {titulo}
      </motion.h2>

      {/* Descripción */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-slate-500 text-[14px] leading-relaxed max-w-xs mb-8"
      >
        {descripcion}
      </motion.p>

      {/* Count chip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-1.5 text-[12px] text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          {questionCount} preguntas
        </span>
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onContinue}
        className="px-8 py-3.5 rounded-2xl bg-[#07111F] text-white font-display font-black text-[14px] tracking-wide hover:bg-slate-800 active:scale-[0.98] transition-all"
      >
        Continuar →
      </motion.button>
    </motion.div>
  );
}
