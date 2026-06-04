import { motion } from 'motion/react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-slate-400 font-mono">
          {current} de {total}
        </span>
        <span className="text-[11px] font-bold text-slate-500 font-mono">
          {pct}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#07111F]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
