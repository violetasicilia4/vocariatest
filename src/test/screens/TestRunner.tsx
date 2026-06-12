import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { QUESTIONS, type Question } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import ProgressInsight from '../components/ProgressInsight';
import QuestionCard from '../components/QuestionCard';
import CheckpointModal from '../components/Checkpoint';
import LogoIcon from '../../components/ui/LogoIcon';
import { CHECKPOINTS, confidenceForPct, stageForPct, type Checkpoint } from '../data/stages';
import { getCurrentInsight } from '../data/insights';
import { EASE } from '../ui/theme';
import type { ScoringResult } from '../engine/scorer';
import { calcularResultado } from '../engine/scorer';
import { selectAdaptiveQuestions } from '../engine/adaptive';
import type { UserProfile } from '../data/profile';

interface TestRunnerProps {
  nombre: string;
  profile: UserProfile;
  onComplete: (answers: Record<string, string>, result: ScoringResult) => void;
}

const CORE_LENGTH = QUESTIONS.length;

export default function TestRunner({ nombre, profile, onComplete }: TestRunnerProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  // Preguntas de desempate elegidas según el ranking interino tras el núcleo.
  const [adaptiveQuestions, setAdaptiveQuestions] = useState<Question[] | null>(null);

  // Checkpoints ya mostrados (se disparan una sola vez al cruzar su umbral).
  const [shownCheckpoints, setShownCheckpoints] = useState<Set<number>>(() => new Set());
  const [checkpoint, setCheckpoint] = useState<Checkpoint | null>(null);

  const questions: Question[] = adaptiveQuestions ? [...QUESTIONS, ...adaptiveQuestions] : QUESTIONS;
  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const isAdaptive = currentIndex >= CORE_LENGTH;

  // Avance global (0–100): el núcleo cubre 0→92, la fase adaptativa 92→100.
  let pct: number;
  if (!isAdaptive) {
    pct = CORE_LENGTH > 1 ? (currentIndex / (CORE_LENGTH - 1)) * 92 : 0;
  } else {
    const aStep = currentIndex - CORE_LENGTH;
    const aTotal = adaptiveQuestions?.length ?? 1;
    pct = 92 + ((aStep + 1) / (aTotal + 1)) * 8;
  }
  pct = Math.min(100, Math.round(pct));
  const confidence = confidenceForPct(pct);

  // Microcopy de inteligencia: solo en la fase adaptativa (recorrido único).
  const insight = getCurrentInsight(pct, isAdaptive, currentIndex - CORE_LENGTH);

  // Checkpoints: al cruzar un umbral nuevo, interrumpir con el modal premium.
  useEffect(() => {
    const crossed = CHECKPOINTS.filter(c => pct >= c.at && !shownCheckpoints.has(c.at));
    if (crossed.length > 0) {
      setCheckpoint(crossed[crossed.length - 1]);
      setShownCheckpoints(prev => {
        const next = new Set(prev);
        crossed.forEach(c => next.add(c.at));
        return next;
      });
    }
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = useCallback((value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < total - 1) {
      setDirection(1);
      setCurrentIndex(i => i + 1);
      return;
    }

    // Fin del núcleo: si el resultado quedó peleado, abrir fase adaptativa.
    if (adaptiveQuestions === null) {
      const interim = calcularResultado(newAnswers, profile);
      const extra = selectAdaptiveQuestions(interim.ranking);
      setAdaptiveQuestions(extra);
      if (extra.length > 0) {
        setDirection(1);
        setCurrentIndex(i => i + 1);
        return;
      }
      onComplete(newAnswers, interim);
      return;
    }

    const result = calcularResultado(newAnswers, profile);
    onComplete(newAnswers, result);
  }, [answers, currentQuestion, currentIndex, total, adaptiveQuestions, profile, onComplete]);

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(i => i - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 26 : -26, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -26 : 26, opacity: 0 }),
  };

  const firstName = nombre ? nombre.split(' ')[0] : '';
  const { label: stageLabel } = stageForPct(pct);

  return (
    // Viewport fijo de alto completo. En desktop se parte en dos: un rail de
    // contexto a la izquierda (progreso como protagonista) y la zona de decisión
    // a la derecha. En mobile colapsa a una sola columna con el progreso arriba.
    // overflow-hidden + overflow-x-hidden en el cuerpo evitan el scroll lateral
    // que generaban las transiciones horizontales de las preguntas.
    <div className="h-[100dvh] flex flex-col lg:flex-row bg-paper overflow-hidden">

      {/* ───────── Rail de contexto (solo desktop) ─────────
          El progreso deja de ser una barrita: acá es el héroe de la columna. */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[380px] xl:w-[420px] shrink-0 border-r border-line/70 bg-gradient-to-b from-sky-soft/40 via-paper to-paper px-12 py-10">
        <div className="flex items-center gap-2 text-ink">
          <LogoIcon size={22} />
          <span className="font-display font-bold text-[15px] tracking-tight">Vocaria</span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-[290px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={stageLabel}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="text-[12px] font-bold uppercase tracking-[0.14em] text-sky-deep mb-4"
            >
              {stageLabel}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-display font-black text-[68px] leading-[0.9] text-ink tabular-nums tracking-[-0.03em]">
              {confidence}
            </span>
            <span className="font-display font-black text-[30px] text-ink/35">%</span>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/40 mb-7">
            Confianza del perfil
          </p>

          <div className="h-[7px] rounded-full bg-line overflow-hidden mb-1">
            <motion.div
              className="h-full rounded-full bg-brand-sky"
              style={{ boxShadow: '0 0 12px rgba(37,142,249,0.5)' }}
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>

          {isAdaptive && <ProgressInsight insight={insight} />}
        </div>

        <p className="text-[12px] text-ink/35 font-medium">
          {firstName ? `Test de ${firstName}` : 'Test vocacional'} · sin respuestas correctas
        </p>
      </aside>

      {/* ───────── Columna principal (mobile completa / desktop derecha) ───────── */}
      <div className="flex-1 min-h-0 flex flex-col">

        {/* Header compacto — solo mobile/tablet. En desktop el progreso vive en el rail. */}
        <header className="lg:hidden shrink-0 sticky top-0 z-10 bg-paper/90 backdrop-blur-xl border-b border-line/70">
          <div className="max-w-xl mx-auto w-full px-5 pt-2.5 pb-2.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-ink">
                <LogoIcon size={16} />
                <span className="font-display font-bold text-[11.5px] tracking-tight">Vocaria</span>
              </div>
              {firstName && (
                <span className="text-[10.5px] text-ink/35 font-medium font-display">{firstName}</span>
              )}
            </div>
            <ProgressBar pct={pct} confidence={confidence} />
            {isAdaptive && <ProgressInsight insight={insight} />}
          </div>
        </header>

        {/* Cuerpo de la pregunta — centrado vertical; clipea el eje X para que las
            transiciones no produzcan scroll lateral. */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col">
          <div className="m-auto w-full max-w-xl lg:max-w-2xl px-5 lg:px-14 py-4 sm:py-5 lg:py-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentQuestion?.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: EASE }}
              >
                {currentQuestion && (
                  <QuestionCard
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    currentAnswer={answers[currentQuestion.id]}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Volver — pinneado abajo de la columna, no compite con las opciones */}
        <div className="shrink-0 max-w-xl lg:max-w-2xl mx-auto w-full px-5 lg:px-14 pb-3 lg:pb-6 pt-0.5">
          {currentIndex > 0 ? (
            <button
              onClick={handleBack}
              className="-ml-1.5 px-1.5 py-1 rounded-lg text-ink/40 hover:text-ink text-[12.5px] font-medium font-display transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={14} strokeWidth={2.4} />
              Anterior
            </button>
          ) : (
            <div className="h-[16px]" />
          )}
        </div>
      </div>

      {/* Checkpoint premium — interrumpe el flujo en los hitos clave */}
      <AnimatePresence>
        {checkpoint && (
          <CheckpointModal
            checkpoint={checkpoint}
            confidence={confidence}
            onContinue={() => setCheckpoint(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
