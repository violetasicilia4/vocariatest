import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ChevronLeft } from 'lucide-react';
import type { Question } from '../data/questions';
import { iconForEmoji } from '../ui/icons';
import { CTA_PRIMARY, OPTION_IDLE, OPTION_ACTIVE, OPTION_DISABLED, EASE } from '../ui/theme';

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: string) => void;
  currentAnswer?: string;
  onBack?: () => void;
  canGoBack?: boolean;
}

// ── Motion: "offset & delay" (UX in Motion) ───────────────────────────────────
// Las opciones entran en cascada en lugar de aparecer todas de golpe. El leve
// retraso entre una y otra crea continuidad y sensación de avance — la mirada
// sigue el movimiento hacia abajo y el flujo se siente vivo, no estático.
const LIST_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.34, ease: EASE } },
};

export default function QuestionCard({ question, onAnswer, currentAnswer, onBack, canGoBack }: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(currentAnswer ?? null);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);

  const isMulti = question.tipo === 'multiselect';
  const max = question.maxSelect ?? 3;

  useEffect(() => {
    setSelected(currentAnswer ?? null);
    if (question.tipo === 'multiselect' && currentAnswer) {
      setMultiSelected(currentAnswer.split(',').filter(Boolean));
    } else {
      setMultiSelected([]);
    }
  }, [question.id, currentAnswer]);

  const handleMultiToggle = (id: string) => {
    setMultiSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length < max) return [...prev, id];
      return prev;
    });
  };

  // Mismo gesto para TODAS las preguntas: elegís y confirmás con "Siguiente".
  // Ningún tipo avanza solo, así el ritmo es consistente y predecible.
  const canAdvance = isMulti ? multiSelected.length === max : selected != null;
  const handleConfirm = () => {
    if (!canAdvance) return;
    onAnswer(isMulti ? multiSelected.join(',') : (selected as string));
  };

  return (
    // Flujo vertical (la lectura va de arriba hacia abajo): el enunciado arriba,
    // centrado y de tamaño contenido, y las respuestas justo debajo en grilla
    // para ocupar el ancho en desktop sin romper la continuidad de lectura.
    // Es el patrón que mejor lee en quizzes de escritorio (Typeform / 16personalities).
    <div className="w-full flex flex-col flex-1 min-h-0">
      {/* Bloque enunciado + opciones, anclado hacia arriba con un margen
          superior proporcional al alto (no centrado): así la pregunta arranca
          cerca de la barra de avance y no queda flotando en el medio con mucho
          aire arriba. El botón sigue anclado abajo en posición estable. */}
      <div className="flex-1 min-h-0 flex flex-col justify-start pt-[clamp(0.5rem,6vh,4rem)] pb-4">
        {/* Banda de enunciado de alto fijo: el texto se ancla abajo (justify-end),
            así preguntas de 2 o 3 líneas terminan a la MISMA altura y las opciones
            siempre arrancan en el mismo Y, sin saltos al cambiar de pregunta. */}
        <div className="shrink-0 min-h-[68px] sm:min-h-[80px] lg:min-h-[92px] xl:min-h-[104px] flex flex-col justify-end mb-5 sm:mb-6 lg:mb-8 text-center max-w-[820px] mx-auto">
          <h2 className="font-display font-bold text-[22px] sm:text-[26px] lg:text-[34px] xl:text-[38px] text-ink leading-[1.14] tracking-tight text-balance">
            {question.enunciado}
          </h2>
          {question.subtext && (
            <p className="mt-2.5 lg:mt-3 text-[12.5px] lg:text-[14.5px] text-ink/55 font-medium leading-relaxed">
              {question.subtext}
            </p>
          )}
        </div>

        <div className="w-full shrink-0">
          {question.tipo === 'scale' && (
            <ScaleOptions opciones={question.opciones} selected={selected} onSelect={setSelected} />
          )}

          {question.tipo === 'visual' && (
            <VisualOptions opciones={question.opciones} selected={selected} onSelect={setSelected} />
          )}

          {question.tipo === 'pairs' && (
            <PairsOptions opciones={question.opciones} selected={selected} onSelect={setSelected} />
          )}

          {question.tipo === 'multiselect' && (
            <MultiSelectOptions
              opciones={question.opciones}
              selected={multiSelected}
              maxSelect={max}
              onToggle={handleMultiToggle}
            />
          )}

          {question.tipo === 'situacional' && (
            <ChoiceOptions opciones={question.opciones} selected={selected} onSelect={setSelected} />
          )}
        </div>
      </div>

      {/* Navegación unificada en una fila: "Anterior" a la izquierda, "Siguiente"
          siempre a la derecha (posición estable, anclada abajo). "Siguiente" se
          activa recién cuando hay una elección válida. */}
      <div className="pt-5 lg:pt-6 w-full flex items-center justify-between gap-3 shrink-0">
        <div className="shrink-0">
          {canGoBack && (
            <button
              type="button"
              onClick={onBack}
              className="-ml-1.5 px-1.5 py-1 rounded-lg text-ink/40 hover:text-ink text-[13px] font-medium font-display transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={15} strokeWidth={2.4} />
              Anterior
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 flex-1 sm:flex-none justify-end">
          {isMulti && (
            <span className="text-[12px] text-ink/45 font-semibold font-display whitespace-nowrap tabular-nums shrink-0">
              {multiSelected.length} / {max}
            </span>
          )}
          <NextButton onClick={handleConfirm} disabled={!canAdvance} className="flex-1 sm:flex-none sm:min-w-[240px] sm:px-10" />
        </div>
      </div>
    </div>
  );
}

// ── CTA "Siguiente" reutilizable ──────────────────────────────────────────────

function NextButton({
  onClick, disabled = false, className = '',
}: { onClick: () => void; disabled?: boolean; className?: string }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE, delay: 0.04 }}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`flex items-center justify-center gap-2 py-3.5 text-[15px] lg:text-[16px] ${CTA_PRIMARY} ${
        disabled ? 'opacity-40 pointer-events-none' : ''
      } ${className}`}
    >
      Siguiente
      <ArrowRight size={17} strokeWidth={2.5} />
    </motion.button>
  );
}

// ── Scale (1-5) ───────────────────────────────────────────────────────────────

function ScaleOptions({
  opciones, selected, onSelect,
}: {
  opciones: Question['opciones'];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const anchors = [opciones[0]?.texto, opciones[opciones.length - 1]?.texto];
  const activeOpt = opciones.find(o => o.id === selected);

  // En desktop la escala se ensancha y los números crecen para no quedar
  // diminutos en el medio de la pantalla; las leyendas de los extremos tienen
  // más aire y dejan de comprimirse. En mobile mantiene el tamaño compacto.
  return (
    <div className="max-w-[440px] sm:max-w-[520px] lg:max-w-[680px] mx-auto">
      <div className="flex justify-between items-end mb-2.5 lg:mb-3.5 px-0.5 gap-5 lg:gap-8">
        <span className="text-[11.5px] lg:text-[12.5px] text-ink/45 font-medium max-w-[48%] leading-snug">{anchors[0]}</span>
        <span className="text-[11.5px] lg:text-[12.5px] text-ink/45 font-medium max-w-[48%] text-right leading-snug">{anchors[1]}</span>
      </div>
      <motion.div
        variants={LIST_VARIANTS}
        initial="hidden"
        animate="visible"
        className="flex gap-2.5 sm:gap-3 lg:gap-4 justify-between mb-3 lg:mb-5"
      >
        {opciones.map(op => {
          const active = selected === op.id;
          return (
            <motion.button
              key={op.id}
              type="button"
              variants={ITEM_VARIANTS}
              onClick={() => onSelect(op.id)}
              whileTap={{ scale: 0.95 }}
              aria-pressed={active}
              aria-label={op.texto}
              className={`flex-1 max-w-[72px] lg:max-w-[112px] min-h-[56px] aspect-square rounded-2xl lg:rounded-[20px] font-display font-bold text-[17px] lg:text-[26px] transition-all duration-200 flex items-center justify-center border
                ${active
                  ? 'bg-ink text-white border-ink scale-[1.04] shadow-[0_10px_26px_rgba(7,17,31,0.22)]'
                  : 'bg-paper-raised text-ink/55 border-line-strong hover:border-sky/45 hover:text-ink/80'
                }`}
            >
              {op.id}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="min-h-[18px] lg:min-h-[22px]">
        <AnimatePresence mode="wait">
          {activeOpt && (
            <motion.p
              key={activeOpt.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-[12.5px] lg:text-[15px] text-ink/60 font-medium text-center leading-snug px-2"
            >
              {activeOpt.texto}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
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
    <motion.div
      variants={LIST_VARIANTS}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 lg:gap-3.5 w-full"
    >
      {opciones.map(op => {
        const active = selected === op.id;
        const Icon = iconForEmoji(op.emoji);
        return (
          <motion.button
            key={op.id}
            type="button"
            variants={ITEM_VARIANTS}
            onClick={() => onSelect(op.id)}
            aria-pressed={active}
            whileTap={{ scale: 0.97 }}
            className={`relative flex flex-col items-start gap-2 lg:gap-2.5 p-3 lg:p-4 min-h-[84px] lg:min-h-[100px] xl:min-h-[108px] rounded-2xl border transition-[border-color,background-color,box-shadow,transform] duration-200 text-left
              ${active ? OPTION_ACTIVE + ' scale-[1.02]' : OPTION_IDLE}`}
          >
            <span
              className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-colors
                ${active ? 'bg-white/15 text-white' : 'bg-sky-soft text-sky-deep'}`}
            >
              <Icon size={16} strokeWidth={1.9} className="lg:hidden" />
              <Icon size={20} strokeWidth={1.9} className="hidden lg:block" />
            </span>
            <span className={`font-display text-[12.5px] lg:text-[14.5px] xl:text-[15px] font-semibold leading-[1.25] ${active ? 'text-white' : ''}`}>
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
    </motion.div>
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
    <motion.div
      variants={LIST_VARIANTS}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:gap-3.5 xl:gap-4 w-full"
    >
      {opciones.map(op => {
        const active = selected === op.id;
        const Icon = iconForEmoji(op.emoji);
        return (
          <motion.button
            key={op.id}
            type="button"
            variants={ITEM_VARIANTS}
            onClick={() => onSelect(op.id)}
            aria-pressed={active}
            whileTap={{ scale: 0.99 }}
            className={`w-full flex items-center gap-3.5 lg:gap-4 px-4 lg:px-5 py-3.5 lg:py-5 rounded-2xl border transition-[border-color,background-color,box-shadow,transform] duration-200 text-left
              ${active ? OPTION_ACTIVE + ' scale-[1.01]' : OPTION_IDLE}`}
          >
            <span
              className={`shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center transition-colors
                ${active ? 'bg-white/15 text-white' : 'bg-sky-soft text-sky-deep'}`}
            >
              <Icon size={20} strokeWidth={1.9} className="lg:hidden" />
              <Icon size={23} strokeWidth={1.9} className="hidden lg:block" />
            </span>
            <span className={`font-display font-semibold text-[14.5px] lg:text-[16px] leading-snug ${active ? 'text-white' : ''}`}>
              {op.texto}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

// ── Multi-select (pick N) ─────────────────────────────────────────────────────

function MultiSelectOptions({
  opciones, selected, maxSelect, onToggle,
}: {
  opciones: Question['opciones'];
  selected: string[];
  maxSelect: number;
  onToggle: (id: string) => void;
}) {
  const count = selected.length;

  return (
    <motion.div
      variants={LIST_VARIANTS}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-2.5 xl:gap-3 w-full"
    >
      {opciones.map(op => {
        const active = selected.includes(op.id);
        const disabled = !active && count >= maxSelect;
        return (
          <motion.button
            key={op.id}
            type="button"
            variants={ITEM_VARIANTS}
            onClick={() => onToggle(op.id)}
            disabled={disabled}
            whileTap={disabled ? undefined : { scale: 0.99 }}
            aria-pressed={active}
            className={`w-full flex items-center gap-2.5 px-3.5 lg:px-4 py-2.5 lg:py-3 rounded-2xl font-display text-[13.5px] lg:text-[15px] font-semibold transition-all duration-200 text-left border ${
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
          </motion.button>
        );
      })}
    </motion.div>
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
    <motion.div
      variants={LIST_VARIANTS}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:gap-3.5 xl:gap-4 w-full"
    >
      {opciones.map(op => {
        const active = selected === op.id;
        return (
          <motion.button
            key={op.id}
            type="button"
            variants={ITEM_VARIANTS}
            onClick={() => onSelect(op.id)}
            aria-pressed={active}
            whileTap={{ scale: 0.99 }}
            className={`w-full h-full min-h-[60px] lg:min-h-[80px] text-left px-3.5 lg:px-5 xl:px-6 py-3 lg:py-4 xl:py-[18px] rounded-2xl border font-display text-[14px] lg:text-[15.5px] xl:text-[16px] font-medium transition-[border-color,background-color,box-shadow,transform] duration-200 flex items-start gap-2.5 lg:gap-3.5
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
    </motion.div>
  );
}
