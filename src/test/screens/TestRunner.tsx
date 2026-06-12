import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { QUESTIONS, type Question } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import ProgressInsight from '../components/ProgressInsight';
import ProfilePanel from '../components/ProfilePanel';
import QuestionCard from '../components/QuestionCard';
import ChapterTransition from '../components/ChapterTransition';
import LogoIcon from '../../components/ui/LogoIcon';
import { getChapterPosition, TOTAL_CHAPTERS, type Chapter } from '../data/chapters';
import { getCurrentInsight } from '../data/insights';
import { readProfile } from '../engine/profileSignals';
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

  // Transición de capítulo: se muestra una sola vez por capítulo.
  const [shownChapters, setShownChapters] = useState<Set<string>>(() => new Set(['pensar']));
  const [chapterOverlay, setChapterOverlay] = useState<Chapter | null>(null);

  const questions: Question[] = adaptiveQuestions ? [...QUESTIONS, ...adaptiveQuestions] : QUESTIONS;
  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const position = getChapterPosition(currentIndex, CORE_LENGTH);
  const isAdaptive = currentIndex >= CORE_LENGTH;

  // Avance global (0–100) para el header, alineado con el relleno de la barra.
  const chapterFraction = position.countInChapter > 0
    ? Math.min(1, (position.indexInChapter - 1) / position.countInChapter + 1 / position.countInChapter)
    : 0.5;
  const overallPct = ((position.chapter.numero - 1) + chapterFraction) / TOTAL_CHAPTERS * 100;

  // Mensaje inteligente vigente (hook por % o copy adaptativo rotativo).
  const insight = getCurrentInsight(overallPct, isAdaptive, currentIndex - CORE_LENGTH);

  // Lectura en vivo del perfil (read-only sobre el vector, sin spoilear).
  const snapshot = readProfile(answers, overallPct / 100);

  // Al entrar a un capítulo nuevo (no el primero), mostrar el respiro de transición.
  useEffect(() => {
    if (position.isFirstOfChapter && currentIndex > 0 && !shownChapters.has(position.chapter.id)) {
      setChapterOverlay(position.chapter);
      setShownChapters(prev => new Set(prev).add(position.chapter.id));
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
    enter: (dir: number) => ({ x: dir > 0 ? 28 : -28, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -28 : 28, opacity: 0 }),
  };

  const firstName = nombre ? nombre.split(' ')[0] : '';

  return (
    <div className="min-h-screen bg-paper lg:flex">

      {/* ── Riel izquierdo (desktop): identidad + progreso + perfil en vivo ── */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[360px] lg:shrink-0 lg:h-screen lg:sticky lg:top-0 border-r border-line bg-paper-raised/50 px-8 py-9">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2 text-ink">
            <LogoIcon size={22} />
            <span className="font-display font-bold text-[14px] tracking-tight">Vocaria</span>
          </div>
          {firstName && (
            <span className="text-[12px] text-ink/40 font-medium font-display">{firstName}</span>
          )}
        </div>

        <ProgressBar position={position} overallPct={overallPct} />
        <ProgressInsight insight={insight} />

        <div className="mt-9 pt-8 border-t border-line">
          <ProfilePanel snapshot={snapshot} />
        </div>

        <div className="mt-auto pt-8 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-sky animate-pulse" />
          <span className="text-[11px] text-ink/35 font-medium">Análisis en curso</span>
        </div>
      </aside>

      {/* ── Columna principal ── */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Header persistente (solo mobile/tablet) */}
        <header className="lg:hidden sticky top-0 z-10 bg-paper/85 backdrop-blur-xl border-b border-line/70">
          <div className="max-w-xl mx-auto w-full px-5 pt-3.5 pb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-ink">
                <LogoIcon size={20} />
                <span className="font-display font-bold text-[13px] tracking-tight">Vocaria</span>
              </div>
              {firstName && (
                <span className="text-[12px] text-ink/40 font-medium font-display">{firstName}</span>
              )}
            </div>
            <ProgressBar position={position} overallPct={overallPct} />
            <ProgressInsight insight={insight} />
          </div>
        </header>

        {/* Pregunta */}
        <div className="flex-1 flex flex-col justify-center px-5 lg:px-14 py-9 lg:py-12 w-full">
          <div className="max-w-xl mx-auto w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentQuestion?.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: EASE }}
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
        </div>

        {/* Volver */}
        {currentIndex > 0 && (
          <div className="px-5 lg:px-14 pb-7 flex justify-start w-full">
            <div className="max-w-xl mx-auto w-full">
              <button
                onClick={handleBack}
                className="text-ink/40 hover:text-ink text-[13px] font-medium font-display transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={15} strokeWidth={2.4} />
                Anterior
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Respiro de transición entre capítulos */}
      <AnimatePresence>
        {chapterOverlay && (
          <ChapterTransition
            chapter={chapterOverlay}
            onContinue={() => setChapterOverlay(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
