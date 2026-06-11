import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Question } from '../data/questions';
import { CTA_PRIMARY, OPTION_IDLE, OPTION_ACTIVE, OPTION_DISABLED } from '../ui/theme';

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
        <p className="font-display font-bold text-[19px] sm:text-[23px] text-slate-900 leading-snug tracking-tight">
          {question.enunciado}
        </p>
        {question.subtext && (
          <p className="mt-2 text-[13px] text-slate-500 font-medium leading-relaxed">
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
        <span className="text-[11px] text-slate-400 font-medium max-w-[40%] leading-tight">{anchors[0]}</span>
        <span className="text-[11px] text-slate-400 font-medium max-w-[40%] text-right leading-tight">{anchors[1]}</span>
      </div>
      <div className="flex gap-2 sm:gap-3 justify-between mb-6">
        {opciones.map(op => {
          const active = selected === op.id;
          return (
            <button
              key={op.id}
              onClick={() => onSelect(op.id)}
              aria-pressed={active}
              className={`flex-1 aspect-square rounded-2xl font-display font-bold text-sm transition-all duration-150 flex items-center justify-center border
                ${active
                  ? 'bg-[#07111F] text-white border-[#07111F] scale-105 shadow-[0_8px_24px_rgba(5,8,22,0.18)]'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700'
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
            className={`w-full py-3.5 text-sm ${CTA_PRIMARY}`}
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
            aria-pressed={active}
            className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-150 text-center active:scale-[0.98]
              ${active ? OPTION_ACTIVE : OPTION_IDLE}`}
          >
            <span className="text-3xl">{op.emoji}</span>
            <span className={`font-display text-[12px] font-semibold leading-snug ${active ? 'text-white' : 'text-slate-600'}`}>
              {op.texto}
            </span>
            {active && (
              <motion.div
                layoutId="visual-check"
                className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-brand-lime flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <span className="text-[#07111F] text-[9px] font-black">✓</span>
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
            aria-pressed={active}
            className={`w-full flex items-center gap-4 px-5 py-5 rounded-2xl border transition-all duration-150 text-left active:scale-[0.99]
              ${active ? OPTION_ACTIVE : OPTION_IDLE}`}
          >
            <span className="text-4xl shrink-0">{op.emoji}</span>
            <span className={`font-display font-bold text-[15px] leading-snug ${active ? 'text-white' : 'text-slate-800'}`}>
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
              aria-pressed={active}
              className={`px-4 py-2.5 rounded-xl font-display text-[13px] font-semibold transition-all border ${
                active ? OPTION_ACTIVE : disabled ? OPTION_DISABLED : OPTION_IDLE
              }`}
            >
              {op.texto}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[12px] text-slate-400 font-medium font-display whitespace-nowrap">
          {count}/{maxSelect} elegidos
        </span>
        <AnimatePresence>
          {ready && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              onClick={onConfirm}
              className={`flex-1 py-3.5 text-sm ${CTA_PRIMARY}`}
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
            aria-pressed={active}
            className={`w-full text-left px-4 py-3.5 rounded-2xl border font-display text-[14px] font-medium transition-all duration-150 flex items-start gap-3 active:scale-[0.99]
              ${active ? OPTION_ACTIVE : OPTION_IDLE}`}
          >
            <span
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold mt-0.5
                ${active ? 'bg-brand-lime text-[#07111F]' : 'bg-slate-100 text-slate-400'}`}
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
