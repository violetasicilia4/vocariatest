import { motion } from 'motion/react';

interface ProgressBarProps {
  current: number;
  total: number;
  bloque?: string;
}

const bloqueLabel: Record<string, string> = {
  contexto: 'Tu contexto',
  actividad: 'Actividad y motivación',
  entorno: 'Entorno de trabajo',
  autoconocimiento: 'Autoconocimiento',
  adaptativa: 'Afinando tu perfil',
};

export default function ProgressBar({ current, total, bloque }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {bloque && (
          <span className="text-[11px] font-semibold text-white/40 tracking-widest uppercase">
            {bloqueLabel[bloque] ?? bloque}
          </span>
        )}
        <span className="ml-auto text-[11px] font-mono text-white/30">
          {current}/{total}
        </span>
      </div>
      <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-brand-lime"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
