import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Question } from '../data/questions';
import { PROVINCIAS } from '../data/questions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionId: string) => void;
  currentAnswer?: string;
}

export default function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(currentAnswer ?? null);

  useEffect(() => {
    setSelected(currentAnswer ?? null);
  }, [question.id, currentAnswer]);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (question.tipo !== 'scale') {
      setTimeout(() => onAnswer(id), 200);
    }
  };

  const handleScaleConfirm = () => {
    if (selected) onAnswer(selected);
  };

  return (
    <div className="w-full">
      {/* Enunciado */}
      <div className="mb-6">
        <p className="font-display font-bold text-[19px] sm:text-[22px] text-slate-900 leading-snug tracking-tight">
          {question.enunciado}
        </p>
        {question.subtext && (
          <p className="mt-2 text-[13px] text-slate-400 font-medium leading-relaxed">
            {question.subtext}
          </p>
        )}
      </div>

      {/* Render por tipo */}
      {question.tipo === 'scale' && (
        <ScaleOptions
          question={question}
          selected={selected}
          onSelect={setSelected}
          onConfirm={handleScaleConfirm}
        />
      )}
      {question.tipo === 'dropdown' && (
        <DropdownOption
          selected={selected}
          onSelect={id => { setSelected(id); setTimeout(() => onAnswer(id), 150); }}
        />
      )}
      {(question.tipo === 'forced_choice' || question.tipo === 'situational' || question.tipo === 'context') && (
        <ChoiceOptions
          opciones={question.opciones}
          selected={selected}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

// ── Dropdown (provincia) ───────────────────────────────────────────────────

function DropdownOption({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div>
      <div className="relative">
        <select
          ref={selectRef}
          value={selected ?? ''}
          onChange={e => e.target.value && onSelect(e.target.value)}
          className="w-full appearance-none px-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-display text-[14px] font-medium focus:outline-none focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/10 transition-all cursor-pointer pr-10"
        >
          <option value="" disabled>Seleccioná tu provincia...</option>
          {PROVINCIAS.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 px-4 py-3 rounded-xl bg-slate-100 border border-slate-200"
        >
          <p className="text-[13px] font-semibold text-slate-700">📍 {selected}</p>
        </motion.div>
      )}
    </div>
  );
}

// ── Scale (1-5) ────────────────────────────────────────────────────────────

function ScaleOptions({
  question, selected, onSelect, onConfirm,
}: {
  question: Question;
  selected: string | null;
  onSelect: (id: string) => void;
  onConfirm: () => void;
}) {
  return (
    <div>
      {/* Anchor labels */}
      {(question.anclaMin || question.anclaMax) && (
        <div className="flex justify-between mb-4 px-1 gap-4">
          <span className="text-[12px] text-slate-400 font-medium max-w-[45%] leading-tight">{question.anclaMin}</span>
          <span className="text-[12px] text-slate-400 font-medium max-w-[45%] text-right leading-tight">{question.anclaMax}</span>
        </div>
      )}

      {/* Scale buttons */}
      <div className="flex gap-2 sm:gap-3 mb-6">
        {question.opciones.map((op, i) => {
          const active = selected === op.id;
          const sizes = ['w-12 h-12', 'w-13 h-13', 'w-14 h-14', 'w-13 h-13', 'w-12 h-12'];
          return (
            <button
              key={op.id}
              onClick={() => onSelect(op.id)}
              className={`flex-1 aspect-square rounded-xl font-display font-bold text-sm transition-all duration-150 flex items-center justify-center border-2
                ${active
                  ? 'bg-[#07111F] text-white border-[#07111F] scale-105 shadow-md'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
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
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={onConfirm}
            className="w-full py-3.5 rounded-2xl bg-[#07111F] text-white font-display font-black text-sm tracking-wide hover:bg-slate-800 active:scale-[0.98] transition-all"
          >
            Siguiente →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Choice (forced / situational / context) ───────────────────────────────

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
            className={`w-full text-left px-4 py-4 rounded-2xl border-2 font-display text-[14px] font-medium transition-all duration-150 flex items-start gap-3 active:scale-[0.99]
              ${active
                ? 'bg-[#07111F] text-white border-[#07111F] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
              }`}
          >
            <span
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold mt-0.5
                ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}
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
