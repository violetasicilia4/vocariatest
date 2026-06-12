import { motion } from 'motion/react';
import { TOTAL_CHAPTERS, type ChapterPosition } from '../data/chapters';
import { EASE } from '../ui/theme';

interface ProgressBarProps {
  position: ChapterPosition;
  /** Avance global del perfil (0–100), protagonista persistente del header. */
  overallPct: number;
}

/**
 * Progreso protagonista del test. Vive fijo en el header durante todo el flujo
 * y comunica tres cosas a la vez sin ruido:
 *   1. En qué módulo temático está el usuario (título descriptivo).
 *   2. El avance dentro del módulo ("3 de 5").
 *   3. Cuánto perfil lleva construido (porcentaje en vivo, en azul de marca).
 * Los segmentos se llenan con el azul cielo de la landing y el activo lleva un
 * glow sutil para reforzar la sensación de "esto está pasando ahora".
 */
export default function ProgressBar({ position, overallPct }: ProgressBarProps) {
  const { chapter, indexInChapter, countInChapter } = position;
  const currentNumero = chapter.numero;

  // Fracción de avance dentro del capítulo actual (la adaptativa no tiene total
  // conocido: se muestra como recién iniciada para no prometer un largo).
  const fraction = countInChapter > 0
    ? Math.min(1, (indexInChapter - 1) / countInChapter + 1 / countInChapter)
    : 0.5;

  const pct = Math.round(overallPct);

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-bold text-brand-sky tracking-[0.14em] uppercase shrink-0 tabular-nums">
            {String(chapter.numero).padStart(2, '0')}
          </span>
          <span className="text-[13px] font-extrabold text-ink tracking-tight font-display truncate">
            {chapter.titulo}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-ink/40 font-display tabular-nums shrink-0 pl-3">
          {countInChapter > 0
            ? `${indexInChapter} de ${countInChapter}`
            : 'Tramo final'}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: TOTAL_CHAPTERS }).map((_, i) => {
          const numero = i + 1;
          const done = numero < currentNumero;
          const active = numero === currentNumero;
          const fill = done ? 1 : active ? fraction : 0;
          return (
            <div
              key={numero}
              className="relative h-[6px] flex-1 rounded-full bg-line overflow-hidden"
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-brand-sky"
                style={active ? { boxShadow: '0 0 12px rgba(37,142,249,0.55)' } : undefined}
                initial={false}
                animate={{ width: `${fill * 100}%` }}
                transition={{ duration: 0.55, ease: EASE }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <span className="text-[11px] font-bold text-brand-sky tabular-nums">{pct}%</span>
        <span className="text-[11px] font-medium text-ink/40">de tu perfil construido</span>
      </div>
    </div>
  );
}
