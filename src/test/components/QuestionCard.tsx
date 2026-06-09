import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Question } from '../data/questions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: string) => void;
  currentAnswer?: string;
}

export default function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(currentAnswer ?? null);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(currentAnswer ?? null);
    if (question.tipo === 'multiselect' && currentAnswer) {
      setMultiSelected(currentAnswer.split(',').filter(Boolean));
    } else {
      setMultiSelected([]);
    }
  }, [question.id, currentAnswer]);

  const handleAutoSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => onAnswer(id), 220);
  };

  const handleScaleConfirm = () => {
    if (selected) onAnswer(selected);
  };

  const handleMultiToggle = (id: string) => {
    const max = question.maxSelect ?? 3;
    setMultiSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length < max) return [...prev, id];
      return prev;
    });
  };

  const handleMultiConfirm = () => {
    const max = question.maxSelect ?? 3;
    if (multiSelected.length === max) {
      onAnswer(multiSelected.join(','));
    }
  };

  return (
    <div className="w-full">
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

      {question.tipo === 'scale' && (
        <ScaleOptions
          opciones={question.opciones}
          selected={selected}
          onSelect={setSelected}
          onConfirm={handleScaleConfirm}
        />
      )}

      {question.tipo === 'visual' && (
        <VisualOptions
          opciones={question.opciones}
          selected={selected}
          onSelect={handleAutoSelect}
        />
      )}

      {question.tipo === 'pairs' && (
        <PairsOptions
          opciones={question.opciones}
          selected={selected}
          onSelect={handleAutoSelect}
        />
      )}

      {question.tipo === 'multiselect' && (
        <MultiSelectOptions
          opciones={question.opciones}
          selected={multiSelected}
          maxSelect={question.maxSelect ?? 3}
          onToggle={handleMultiToggle}
          onConfirm={handleMultiConfirm}
        />
      )}

      {question.tipo === 'situacional' && (
        <ChoiceOptions
          opciones={question.opciones}
          selected={selected}
          onSelect={handleAutoSelect}
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
      <div className="flex justify-between mb-3 px-1">
        <span className="text-[11px] text-white/35 font-medium max-w-[40%] leading-tight">{anchors[0]}</span>
        <span className="text-[11px] text-white/35 font-medium max-w-[40%] text-right leading-tight">{anchors[1]}</span>
      </div>
      <div className="flex gap-2 sm:gap-3 justify-between mb-6">
        {opciones.map((op, i) => {
          const active = selected === op.id;
          const size = i === 0 || i === opciones.length - 1 ? 'sm' : 'md';
          void size;
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

// ── Visual (emoji grid 2×3) ───────────────────────────────────────────────────

function VisualOptions({
  opciones, selected, onSelect,
}: {
  opciones: Question['opciones'];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {opciones.map(op => {
        const active = selected === op.id;
        return (
          <button
            key={op.id}
            onClick={() => onSelect(op.id)}
            className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-150 text-center active:scale-[0.98]
              ${active
                ? 'border-brand-lime bg-brand-lime/12 shadow-[0_0_20px_rgba(213,255,63,0.15)]'
                : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8'
              }`}
          >
            <span className="text-3xl">{op.emoji}</span>
            <span className={`font-display text-[12px] font-semibold leading-snug ${active ? 'text-white' : 'text-white/60'}`}>
              {op.texto}
            </span>
            {active && (
              <motion.div
                layoutId="visual-check"
                className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-brand-lime flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <span className="text-slate-950 text-[9px] font-black">✓</span>
              </motion.div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Pairs (this or that) ──────────────────────────────────────────────────────

function PairsOptions({
  opciones, selected, onSelect,
}: {
  opciones: Question['opciones'];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {opciones.map(op => {
        const active = selected === op.id;
        return (
          <button
            key={op.id}
            onClick={() => onSelect(op.id)}
            className={`w-full flex items-center gap-4 px-5 py-5 rounded-2xl border transition-all duration-150 text-left active:scale-[0.99]
              ${active
                ? 'border-brand-lime/60 bg-brand-lime/10 shadow-[0_0_24px_rgba(213,255,63,0.12)]'
                : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8'
              }`}
          >
            <span className="text-4xl shrink-0">{op.emoji}</span>
            <span className={`font-display font-bold text-[15px] leading-snug ${active ? 'text-white' : 'text-white/75'}`}>
              {op.texto}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Multi-select (pick N) ─────────────────────────────────────────────────────

function MultiSelectOptions({
  opciones, selected, maxSelect, onToggle, onConfirm,
}: {
  opciones: Question['opciones'];
  selected: string[];
  maxSelect: number;
  onToggle: (id: string) => void;
  onConfirm: () => void;
}) {
  const count = selected.length;
  const ready = count === maxSelect;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {opciones.map(op => {
          const active = selected.includes(op.id);
          const disabled = !active && count >= maxSelect;
          return (
            <button
              key={op.id}
              onClick={() => onToggle(op.id)}
              disabled={disabled}
              className={`px-4 py-2.5 rounded-xl font-display text-[13px] font-semibold transition-all border ${
                active
                  ? 'bg-brand-lime text-slate-950 border-brand-lime shadow-[0_0_16px_rgba(213,255,63,0.2)]'
                  : disabled
                  ? 'bg-white/3 text-white/20 border-white/8 cursor-not-allowed'
                  : 'bg-white/6 text-white/65 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {op.texto}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[12px] text-white/35 font-medium font-display">
          {count}/{maxSelect} elegidos
        </span>
        <AnimatePresence>
          {ready && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              onClick={onConfirm}
              className="flex-1 py-3.5 rounded-2xl bg-brand-lime text-slate-950 font-display font-black text-sm tracking-wide hover:brightness-105 active:scale-[0.98] transition-all"
            >
              Siguiente →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Choice (situacional 4-options) ────────────────────────────────────────────

function ChoiceOptions({
  opciones, selected, onSelect,
}: {
  opciones: Question['opciones'];
  selected: string | null;
  onSelect: (id: string) => void;
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
