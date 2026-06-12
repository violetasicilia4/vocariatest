import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { QUESTIONS, type Question } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import ProgressInsight from '../components/ProgressInsight';
import QuestionCard from '../components/QuestionCard';
import CheckpointModal from '../components/Checkpoint';
import LogoIcon from '../../components/ui/LogoIcon';
import { CHECKPOINTS, confidenceForPct, type Checkpoint } from '../data/stages';
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

  return (
    // Viewport fijo: el progreso queda siempre pinneado arriba y solo el cuerpo
    // de la pregunta puede desplazarse — el avance nunca se pierde de vista.
    <div className="h-[100dvh] flex flex-col bg-paper">

      {/* Header pinneado: identidad + progreso narrativo + confianza */}
      <header className="shrink-0 sticky top-0 z-10 bg-paper/90 backdrop-blur-xl border-b border-line/70">
        <div className="max-w-xl mx-auto w-full px-5 lg:px-6 pt-3 lg:pt-4 pb-3 lg:pb-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-ink">
              <LogoIcon size={18} />
              <span className="font-display font-bold text-[12px] tracking-tight">Vocaria</span>
            </div>
            {firstName && (
              <span className="text-[11px] text-ink/35 font-medium font-display">{firstName}</span>
            )}
          </div>
          <ProgressBar pct={pct} confidence={confidence} />
          {isAdaptive && <ProgressInsight insight={insight} />}
        </div>
      </header>

      {/* Cuerpo de la pregunta — centrado si entra; alineado arriba (sin recorte)
          y con scroll interno solo si una pregunta larga no entrara. */}
      <main className="flex-1 min-h-0 overflow-y-auto flex flex-col">
        <div className="m-auto w-full max-w-xl px-5 lg:px-6 py-6">
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

      {/* Volver — pinneado abajo, no compite con las opciones */}
      <div className="shrink-0 max-w-xl mx-auto w-full px-5 lg:px-6 pb-4 pt-1">
        {currentIndex > 0 ? (
          <button
            onClick={handleBack}
            className="-ml-1.5 px-1.5 py-1.5 rounded-lg text-ink/40 hover:text-ink text-[13px] font-medium font-display transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={15} strokeWidth={2.4} />
            Anterior
          </button>
        ) : (
          <div className="h-[20px]" />
        )}
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
