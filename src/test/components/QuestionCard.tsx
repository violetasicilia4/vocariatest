import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Question } from '../data/questions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionId: string) => void;
  currentAnswer?: string;
}

const SCALE_LABELS: Record<string, string> = {
  '1': '', '2': '', '3': '', '4': '', '5': '',
};

export default function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(currentAnswer ?? null);

  useEffect(() => {
    setSelected(currentAnswer ?? null);
  }, [question.id, currentAnswer]);

  const isScale = question.tipo === 'scale';
  const isContext = question.tipo === 'context';

  const handleSelect = (id: string) => {
    setSelected(id);
    // Para forced_choice y context auto-avanza en 200ms
    if (question.tipo !== 'scale') {
      setTimeout(() => onAnswer(id), 220);
    }
  };

  const handleScaleConfirm = () => {
    if (selected) onAnswer(selected);
  };

  return (
    <div className="w-full">
      {/* Enunciado */}
      <div className="mb-6 sm:mb-8">
        <p className="font-display font-bold text-[18px] sm:text-[22px] text-white leading-snug tracking-tight">
          {question.enunciado}
        </p>
        {question.subtext && (
          <p className="mt-2 text-[13px] text-white/40 font-medium leading-relaxed">
            {question.subtext}
          </p>
        )}
      </div>

      {/* Opciones */}
      {isScale ? (
        <ScaleOptions
          opciones={question.opciones}
          selected={selected}
          onSelect={setSelected}
          onConfirm={handleScaleConfirm}
        />
      ) : (
        <ChoiceOptions
          opciones={question.opciones}
          selected={selected}
          onSelect={handleSelect}
          compact={question.opciones.length > 4}
        />
      )}
    </div>
  );
}

// ── Scale (1-5) ───────────────────────────────────────────────────────────────

function ScaleOptions({
  opciones, selected, onSelect, onConfirm,
}: {
  opciones: Question['opciones'];
  selected: string | null;
  onSelect: (id: string) => void;
  onConfirm: () => void;
}) {
  const anchors = [opciones[0]?.texto, opciones[opciones.length - 1]?.texto];

  return (
    <div>
      {/* Anchor labels */}
      <div className="flex justify-between mb-3 px-1">
        <span className="text-[11px] text-white/35 font-medium max-w-[40%] leading-tight">{anchors[0]}</span>
        <span className="text-[11px] text-white/35 font-medium max-w-[40%] text-right leading-tight">{anchors[1]}</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 sm:gap-3 justify-between mb-6">
        {opciones.map((op, i) => {
          const active = selected === op.id;
          const size = i === 0 || i === opciones.length - 1 ? 'sm' : 'md';
          return (
            <button
              key={op.id}
              onClick={() => onSelect(op.id)}
              className={`flex-1 aspect-square rounded-xl font-display font-bold text-sm transition-all duration-150 flex items-center justify-center
                ${active
                  ? 'bg-brand-lime text-slate-950 scale-105 shadow-[0_0_20px_rgba(213,255,63,0.3)]'
                  : 'bg-white/8 text-white/50 hover:bg-white/14 hover:text-white border border-white/10'
                }`}
            >
              {op.id}
            </button>
          );
        })}
      </div>

      {/* Confirm */}
      <AnimatePresence>
        {selected && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={onConfirm}
            className="w-full py-3.5 rounded-2xl bg-brand-lime text-slate-950 font-display font-black text-sm tracking-wide hover:brightness-105 active:scale-[0.98] transition-all"
          >
            Siguiente →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Choice (forced / situational / context) ───────────────────────────────────

function ChoiceOptions({
  opciones, selected, onSelect, compact,
}: {
  opciones: Question['opciones'];
  selected: string | null;
  onSelect: (id: string) => void;
  compact: boolean;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {opciones.map(op => {
        const active = selected === op.id;
        return (
          <button
            key={op.id}
            onClick={() => onSelect(op.id)}
            className={`w-full text-left px-4 py-3.5 rounded-2xl border font-display text-[14px] font-medium transition-all duration-150 flex items-start gap-3 active:scale-[0.99]
              ${active
                ? 'bg-brand-lime text-slate-950 border-brand-lime shadow-[0_0_20px_rgba(213,255,63,0.2)]'
                : 'bg-white/5 text-white/80 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
          >
            <span
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold mt-0.5
                ${active ? 'bg-slate-900/20 text-slate-900' : 'bg-white/10 text-white/40'}`}
            >
              {op.id}
            </span>
            <span className="leading-snug">{op.texto}</span>
          </button>
        );
      })}
    </div>
  );
}
