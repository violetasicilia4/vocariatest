import { motion } from 'motion/react';
import { TOTAL_CHAPTERS, type ChapterPosition } from '../data/chapters';
import { EASE } from '../ui/theme';

interface ProgressBarProps {
  position: ChapterPosition;
}

/**
 * Progreso segmentado por capítulos. Cada segmento es un capítulo; el actual
 * se llena de forma proporcional a las preguntas respondidas dentro de él.
 * Comunica avance constante y, al dividir el test en pocas etapas, reduce la
 * sensación de "formulario largo".
 */
export default function ProgressBar({ position }: ProgressBarProps) {
  const { chapter, indexInChapter, countInChapter } = position;
  const currentNumero = chapter.numero;

  // Fracción de avance dentro del capítulo actual (la adaptativa no tiene total
  // conocido: se muestra como recién iniciada para no prometer un largo).
  const fraction = countInChapter > 0
    ? Math.min(1, (indexInChapter - 1) / countInChapter + 1 / countInChapter)
    : 0.5;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[12px] font-bold text-ink tracking-tight font-display">
          {chapter.titulo}
        </span>
        <span className="text-[11px] font-medium text-ink/40 font-display tabular-nums">
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
              className="relative h-[5px] flex-1 rounded-full bg-line overflow-hidden"
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-clay"
                initial={false}
                animate={{ width: `${fill * 100}%` }}
                transition={{ duration: 0.55, ease: EASE }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
