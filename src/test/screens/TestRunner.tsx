import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUESTIONS, type Question } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import LogoIcon from '../../components/ui/LogoIcon';
import type { ScoringResult } from '../engine/scorer';
import { calcularResultado } from '../engine/scorer';
import { selectAdaptiveQuestions } from '../engine/adaptive';
import type { UserProfile } from '../data/profile';

interface TestRunnerProps {
  nombre: string;
  profile: UserProfile;
  onComplete: (answers: Record<string, string>, result: ScoringResult) => void;
}

export default function TestRunner({ nombre, profile, onComplete }: TestRunnerProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  // Preguntas de desempate elegidas según el ranking interino tras el núcleo.
  // null = todavía no se decidió; [] = ganador claro, no hace falta.
  const [adaptiveQuestions, setAdaptiveQuestions] = useState<Question[] | null>(null);

  const questions: Question[] = adaptiveQuestions ? [...QUESTIONS, ...adaptiveQuestions] : QUESTIONS;
  const currentQuestion = questions[currentIndex];
  const total = questions.length;

  const HOOKS: Record<number, string> = {
    6: 'Tu perfil empieza a tomar forma.',
    12: 'Último tramo. Afinamos las recomendaciones.',
    [QUESTIONS.length]: 'Tu perfil está entre pocos caminos. Estas preguntas definen cuál.',
  };

  const handleAnswer = useCallback((value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < total - 1) {
      setDirection(1);
      setCurrentIndex(i => i + 1);
      return;
    }

    // Fin del núcleo: si el resultado quedó peleado, abrir fase adaptativa
    // (solo una vez; el set elegido no cambia aunque el usuario vuelva atrás).
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
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-[#07111F] flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
        <div className="flex items-center gap-2">
          <LogoIcon size={22} />
          <span className="font-display font-bold text-[13px] text-white/60 tracking-tight">Vocaria</span>
        </div>
        <span className="text-[12px] text-white/30 font-medium font-display">
          {nombre && `Hola, ${nombre.split(' ')[0]}`}
        </span>
      </div>

      <div className="px-5 pt-5">
        <ProgressBar current={currentIndex + 1} total={total} />
      </div>

      <div className="flex-1 flex flex-col justify-center px-5 py-8 max-w-xl mx-auto w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion?.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentQuestion && (
              <>
                {HOOKS[currentIndex] && (
                  <p className="text-[11px] text-brand-lime/70 font-semibold tracking-widest uppercase mb-4">
                    {HOOKS[currentIndex]}
                  </p>
                )}
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  currentAnswer={answers[currentQuestion.id]}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentIndex > 0 && (
        <div className="px-5 pb-6 flex justify-start">
          <button
            onClick={handleBack}
            className="text-white/30 hover:text-white/60 text-[13px] font-medium font-display transition-colors flex items-center gap-1.5"
          >
            ← Anterior
          </button>
        </div>
      )}
    </div>
  );
}
