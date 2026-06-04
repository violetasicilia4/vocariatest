import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUESTIONS, type Question } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import BlockIntro from '../components/BlockIntro';
import MilestoneCelebration from '../components/MilestoneCelebration';
import LogoIcon from '../../components/ui/LogoIcon';
import type { ScoringResult } from '../engine/scorer';
import { calcularResultado } from '../engine/scorer';

interface TestRunnerProps {
  nombre: string;
  onComplete: (answers: Record<string, string>, result: ScoringResult) => void;
}

type Bloque = 'contexto' | 'actividad' | 'entorno' | 'autoconocimiento' | 'adaptativa';

const BLOQUES_CONFIG: Record<Bloque, { titulo: string; descripcion: string; emoji: string; numero: number }> = {
  contexto: {
    numero: 1,
    emoji: '📍',
    titulo: 'Tu contexto',
    descripcion: 'Tres preguntas rápidas para filtrar opciones cercanas a vos.',
  },
  actividad: {
    numero: 2,
    emoji: '⚡',
    titulo: 'Qué tipo de trabajo te activa',
    descripcion: 'Situaciones concretas para entender qué tipo de actividad te genera más energía.',
  },
  entorno: {
    numero: 3,
    emoji: '🏗️',
    titulo: 'Cómo querés trabajar',
    descripcion: 'En qué condiciones das lo mejor de vos — más allá de qué hacés.',
  },
  autoconocimiento: {
    numero: 4,
    emoji: '🧭',
    titulo: 'Lo que ya sabés de vos',
    descripcion: 'Preguntas sobre tu proceso de decisión y qué te genera ansiedad al elegir.',
  },
  adaptativa: {
    numero: 4,
    emoji: '🎯',
    titulo: 'Afinando tu perfil',
    descripcion: 'Tu perfil muestra dos dimensiones muy cercanas — estas preguntas las distinguen.',
  },
};

function getVisibleQuestions(needsAdaptive: boolean): Question[] {
  const base = QUESTIONS.filter(q => q.bloque !== 'adaptativa');
  if (!needsAdaptive) return base;
  return [...base, ...QUESTIONS.filter(q => q.bloque === 'adaptativa').slice(0, 2)];
}

const TOTAL_BLOQUES = 4;

type UIState = 'intro' | 'question';

export default function TestRunner({ nombre, onComplete }: TestRunnerProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [uiState, setUiState] = useState<UIState>('intro');
  const [shownBloques, setShownBloques] = useState<Set<string>>(new Set());
  const [milestone, setMilestone] = useState<25 | 50 | 75 | null>(null);
  const shownMilestones = useRef(new Set<number>());
  const needsAdaptive = false;

  const questions = getVisibleQuestions(needsAdaptive);
  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const pct = Math.round(((currentIndex + 1) / total) * 100);

  const currentBloque = currentQuestion?.bloque as Bloque;
  const bloqueConfig = BLOQUES_CONFIG[currentBloque];

  // Mostrar intro de bloque si es la primera pregunta del bloque
  const shouldShowIntro = uiState === 'intro' &&
    currentBloque &&
    !shownBloques.has(currentBloque);

  const handleContinueIntro = () => {
    setShownBloques(prev => new Set([...prev, currentBloque]));
    setUiState('question');
  };

  const checkMilestone = useCallback((idx: number, total: number) => {
    const pct = Math.round((idx / total) * 100);
    for (const m of [25, 50, 75] as const) {
      if (pct >= m && !shownMilestones.current.has(m)) {
        shownMilestones.current.add(m);
        setMilestone(m);
        return;
      }
    }
  }, []);

  const handleAnswer = useCallback((optionId: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);

    const nextIndex = currentIndex + 1;

    if (nextIndex >= questions.length) {
      const result = calcularResultado(newAnswers);
      onComplete(newAnswers, result);
      return;
    }

    // Check milestone
    checkMilestone(nextIndex, questions.length);

    const nextQuestion = questions[nextIndex];
    const nextBloque = nextQuestion?.bloque as Bloque;
    const isNewBloque = nextBloque !== currentBloque;

    setDirection(1);
    setCurrentIndex(nextIndex);

    if (isNewBloque && !shownBloques.has(nextBloque)) {
      setUiState('intro');
    }
  }, [answers, currentQuestion, currentIndex, questions, currentBloque, shownBloques, checkMilestone, onComplete]);

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(i => i - 1);
      setUiState('question');
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  const firstName = nombre.split(' ')[0];

  // Count questions in current bloque for intro
  const bloqueQuestionCount = questions.filter(q => q.bloque === currentBloque).length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <LogoIcon size={22} />
          <span className="font-display font-bold text-[13px] text-slate-400 tracking-tight">Vocaria</span>
        </div>
        {firstName && (
          <span className="text-[12px] text-slate-400 font-medium font-display">
            {firstName}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="px-5 pt-4 pb-2">
        <ProgressBar current={currentIndex + 1} total={total} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-5 py-6 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait" custom={direction}>
          {shouldShowIntro ? (
            <motion.div key={`intro-${currentBloque}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <BlockIntro
                numero={bloqueConfig.numero}
                totalBloques={TOTAL_BLOQUES}
                titulo={bloqueConfig.titulo}
                descripcion={bloqueConfig.descripcion}
                emoji={bloqueConfig.emoji}
                questionCount={bloqueQuestionCount}
                onContinue={handleContinueIntro}
              />
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion?.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  currentAnswer={answers[currentQuestion.id]}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Back */}
      {currentIndex > 0 && uiState === 'question' && (
        <div className="px-5 pb-6">
          <button
            onClick={handleBack}
            className="text-slate-400 hover:text-slate-600 text-[13px] font-medium font-display transition-colors flex items-center gap-1"
          >
            ← Anterior
          </button>
        </div>
      )}

      {/* Milestone overlay */}
      <MilestoneCelebration
        show={milestone !== null}
        milestone={milestone ?? 25}
        onDone={() => setMilestone(null)}
      />
    </div>
  );
}
