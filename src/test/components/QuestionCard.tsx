import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import type { Question } from '../data/questions';
import { iconForEmoji } from '../ui/icons';
import { CTA_PRIMARY, OPTION_IDLE, OPTION_ACTIVE, OPTION_DISABLED, EASE } from '../ui/theme';

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
    setTimeout(() => onAnswer(id), 240);
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
      <div className="mb-4 sm:mb-5 lg:mb-7">
        <h2 className="font-display font-extrabold text-[20px] sm:text-[26px] lg:text-[32px] text-ink leading-[1.16] tracking-tight">
          {question.enunciado}
        </h2>
        {question.subtext && (
          <p className="mt-2 lg:mt-2.5 text-[12.5px] lg:text-[14.5px] text-ink/55 font-medium leading-relaxed">
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

// ── CTA "Siguiente" reutilizable ──────────────────────────────────────────────

function NextButton({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 py-3.5 lg:py-4 text-[15px] lg:text-[16px] ${CTA_PRIMARY} ${className}`}
    >
      Siguiente
      <ArrowRight size={17} strokeWidth={2.5} />
    </motion.button>
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
  const activeOpt = opciones.find(o => o.id === selected);

  return (
    <div>
      <div className="flex justify-between mb-2.5 px-0.5 gap-4">
        <span className="text-[11.5px] text-ink/45 font-medium max-w-[44%] leading-snug">{anchors[0]}</span>
        <span className="text-[11.5px] text-ink/45 font-medium max-w-[44%] text-right leading-snug">{anchors[1]}</span>
      </div>
      <div className="flex gap-2 sm:gap-2.5 lg:gap-3 justify-between mb-3">
        {opciones.map(op => {
          const active = selected === op.id;
          return (
            <button
              key={op.id}
              onClick={() => onSelect(op.id)}
              aria-pressed={active}
              aria-label={op.texto}
              className={`flex-1 max-w-[72px] lg:max-w-[88px] min-h-[52px] aspect-square rounded-2xl font-display font-bold text-[17px] lg:text-[19px] transition-all duration-200 flex items-center justify-center border
                ${active
                  ? 'bg-ink text-white border-ink scale-[1.04] shadow-[0_10px_26px_rgba(7,17,31,0.22)]'
                  : 'bg-paper-raised text-ink/45 border-line hover:border-sky/45 hover:text-ink/70'
                }`}
            >
              {op.id}
            </button>
          );
        })}
      </div>

      <div className="min-h-[18px] mb-3">
        <AnimatePresence mode="wait">
          {activeOpt && (
            <motion.p
              key={activeOpt.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-[12.5px] text-ink/60 font-medium text-center leading-snug px-2"
            >
              {activeOpt.texto}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && <NextButton onClick={onConfirm} className="w-full" />}
      </AnimatePresence>
    </div>
  );
}

// ── Visual (icon grid 2×N) ────────────────────────────────────────────────────

function VisualOptions({
  opciones, selected, onSelect,
}: {
  opciones: Question['opciones'];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 lg:gap-3">
      {opciones.map(op => {
        const active = selected === op.id;
        const Icon = iconForEmoji(op.emoji);
        return (
          <motion.button
            key={op.id}
            onClick={() => onSelect(op.id)}
            aria-pressed={active}
            whileTap={{ scale: 0.97 }}
            className={`relative flex flex-col items-start gap-2 lg:gap-3 p-3 lg:p-4 min-h-[88px] lg:min-h-[112px] rounded-[16px] lg:rounded-[20px] border transition-[border-color,background-color,box-shadow] duration-200 text-left
              ${active ? OPTION_ACTIVE : OPTION_IDLE}`}
          >
            <span
              className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-colors
                ${active ? 'bg-white/15 text-white' : 'bg-sky-soft text-sky-deep'}`}
            >
              <Icon size={16} strokeWidth={1.9} className="lg:hidden" />
              <Icon size={20} strokeWidth={1.9} className="hidden lg:block" />
            </span>
            <span className={`font-display text-[12.5px] lg:text-[14.5px] font-semibold leading-[1.25] ${active ? 'text-white' : 'text-ink/75'}`}>
              {op.texto}
            </span>
            {active && (
              <motion.span
                className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              >
                <Check size={11} strokeWidth={3} className="text-slate-950" />
              </motion.span>
            )}
          </motion.button>
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
    <div className="space-y-2.5 lg:space-y-3">
      {opciones.map(op => {
        const active = selected === op.id;
        const Icon = iconForEmoji(op.emoji);
        return (
          <motion.button
            key={op.id}
            onClick={() => onSelect(op.id)}
            aria-pressed={active}
            whileTap={{ scale: 0.99 }}
            className={`w-full flex items-center gap-3.5 lg:gap-4 px-4 lg:px-5 py-3.5 lg:py-4 rounded-[16px] lg:rounded-[18px] border transition-[border-color,background-color,box-shadow] duration-200 text-left
              ${active ? OPTION_ACTIVE : OPTION_IDLE}`}
          >
            <span
              className={`shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center transition-colors
                ${active ? 'bg-white/15 text-white' : 'bg-sky-soft text-sky-deep'}`}
            >
              <Icon size={20} strokeWidth={1.9} className="lg:hidden" />
              <Icon size={23} strokeWidth={1.9} className="hidden lg:block" />
            </span>
            <span className={`font-display font-semibold text-[14.5px] lg:text-[16px] leading-snug ${active ? 'text-white' : 'text-ink/90'}`}>
              {op.texto}
            </span>
          </motion.button>
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
      <div className="flex flex-col gap-1.5 lg:gap-2 mb-3">
        {opciones.map(op => {
          const active = selected.includes(op.id);
          const disabled = !active && count >= maxSelect;
          return (
            <button
              key={op.id}
              onClick={() => onToggle(op.id)}
              disabled={disabled}
              aria-pressed={active}
              className={`w-full flex items-center gap-2.5 px-3.5 lg:px-4 py-2 lg:py-3 rounded-[13px] lg:rounded-[15px] font-display text-[13.5px] lg:text-[15px] font-semibold transition-all duration-200 text-left border ${
                active ? OPTION_ACTIVE : disabled ? OPTION_DISABLED : OPTION_IDLE
              }`}
            >
              <span
                className={`shrink-0 w-[18px] h-[18px] rounded-md border flex items-center justify-center transition-colors
                  ${active ? 'bg-brand-lime border-brand-lime' : disabled ? 'border-ink/15' : 'border-line-strong'}`}
              >
                {active && <Check size={11} strokeWidth={3} className="text-slate-950" />}
              </span>
              <span className="leading-[1.3]">{op.texto}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 min-h-[44px]">
        <span className="text-[12px] text-ink/45 font-semibold font-display whitespace-nowrap tabular-nums shrink-0">
          {count} / {maxSelect}
        </span>
        <AnimatePresence>
          {ready
            ? <NextButton onClick={onConfirm} className="flex-1" />
            : <span className="text-[12px] text-ink/35 font-medium font-display">Elegí {maxSelect - count} más</span>}
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
    <div className="flex flex-col gap-2 lg:gap-2.5">
      {opciones.map(op => {
        const active = selected === op.id;
        return (
          <motion.button
            key={op.id}
            onClick={() => onSelect(op.id)}
            aria-pressed={active}
            whileTap={{ scale: 0.99 }}
            className={`w-full text-left px-3.5 lg:px-5 py-3 lg:py-4 rounded-[14px] lg:rounded-[16px] border font-display text-[14px] lg:text-[15.5px] font-medium transition-[border-color,background-color,box-shadow] duration-200 flex items-start gap-2.5 lg:gap-3.5
              ${active ? OPTION_ACTIVE : OPTION_IDLE}`}
          >
            <span
              className={`shrink-0 w-[26px] h-[26px] lg:w-8 lg:h-8 rounded-full flex items-center justify-center font-display text-[11.5px] lg:text-[13px] font-bold transition-colors
                ${active ? 'bg-brand-lime text-slate-950' : 'bg-sky-soft text-sky-deep'}`}
            >
              {op.id.toUpperCase()}
            </span>
            <span className="leading-[1.35] pt-0.5">{op.texto}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
