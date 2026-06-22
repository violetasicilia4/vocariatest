import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { QUESTIONS, type Question } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import ProgressInsight from '../components/ProgressInsight';
import QuestionCard from '../components/QuestionCard';
import CheckpointModal from '../components/Checkpoint';
import LogoIcon from '../../components/ui/LogoIcon';
import { CHECKPOINTS, type Checkpoint } from '../data/stages';
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
  const answeredCount = Object.keys(answers).length;
  // Posición dentro de la fase adaptativa (desempate), si estamos en ella.
  const adaptiveStep = currentIndex - CORE_LENGTH;          // 0-based
  const adaptiveTotal = adaptiveQuestions?.length ?? 0;

  // Avance global (0–100), coherente con preguntas respondidas/restantes.
  //
  // El núcleo (CORE_LENGTH, que responde todo el mundo) llena la barra 0→92 de
  // forma proporcional: la pregunta en curso cuenta como "en curso", así la
  // primera ya muestra avance. Se reserva el tramo 92→100 para la fase
  // adaptativa, de modo que la barra NUNCA llega al 100 mientras todavía pueden
  // aparecer preguntas de desempate.
  //
  // La fase adaptativa (desempate, sólo para perfiles peleados, 1–5 preguntas)
  // llena ese último tramo 92→100 y llega al 100 en la última. Como ese tramo
  // estaba reservado, la barra avanza sin saltos ni retrocesos al aparecer las
  // preguntas extra. Si no hay fase adaptativa, el núcleo cierra en 92 y la
  // pantalla de procesamiento completa el 100.
  const CORE_CEILING = 92;
  const pct = isAdaptive
    ? Math.min(
        100,
        Math.round(CORE_CEILING + ((adaptiveStep + 1) / Math.max(1, adaptiveTotal)) * (100 - CORE_CEILING)),
      )
    : Math.min(100, Math.round(((currentIndex + 1) / CORE_LENGTH) * CORE_CEILING));

  // Medidor de precisión que se ve durante el test.
  //
  // Es PURAMENTE función del avance: sube suave y de forma estrictamente
  // monótona, nunca baja ni oscila. Antes mezclaba la señal real en vivo, que es
  // volátil (a cada respuesta cambia qué arquetipo lidera) y hacía que el número
  // subiera y bajara en el medio del test. El valor real y exacto de confianza
  // se calcula y se muestra en el resultado final.
  const confidence = useMemo(() => {
    const p = Math.min(1, answeredCount / CORE_LENGTH);     // 0→1 según avance
    const eased = 1 - Math.pow(1 - p, 1.5);                 // ease-out suave
    return Math.round(33 + eased * 60);                     // 33 → 93, monótona
  }, [answeredCount]);
  const isLastQuestion = currentIndex === total - 1;

  // Microcopy de inteligencia: aparece a lo largo del test (no solo en la fase
  // adaptativa) como "cartel" de avance. En la última pregunta usa el cierre.
  const insight = getCurrentInsight(pct, isAdaptive, currentIndex - CORE_LENGTH, isLastQuestion);

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
    // Viewport fijo de alto completo. El progreso vive arriba (barra ancha,
    // ocupa la pantalla en desktop) y la pregunta queda centrada en el medio,
    // en flujo vertical: enunciado arriba y respuestas debajo (en grilla en
    // desktop), para que la lectura sea continua de arriba hacia abajo.
    // overflow-x-hidden evita el scroll lateral de las transiciones horizontales.
    <div className="h-[100dvh] flex flex-col bg-paper overflow-hidden">

      {/* Progreso arriba: identidad + barra narrativa + confianza + carteles de
          avance. Mismo bloque en mobile y desktop, solo escala el tamaño. */}
      <header className="shrink-0 sticky top-0 z-10 bg-paper/90 backdrop-blur-xl border-b border-line/70">
        <div className="max-w-xl lg:max-w-5xl mx-auto w-full px-5 lg:px-12 pt-2.5 lg:pt-4 pb-2.5 lg:pb-3.5">
          <div className="flex items-center justify-between mb-2 lg:mb-2.5">
            <div className="flex items-center gap-1.5 text-ink">
              <LogoIcon size={16} />
              <span className="font-display font-bold text-[11.5px] lg:text-[13px] tracking-tight">Vocaria</span>
            </div>
            <div className="flex items-center gap-1.5 font-display text-[10.5px] lg:text-[12px]">
              <span className="text-ink/55 font-semibold tabular-nums">
                {isAdaptive
                  ? `Afinando · ${adaptiveStep + 1} de ${adaptiveTotal}`
                  : `Pregunta ${currentIndex + 1} de ${CORE_LENGTH}`}
              </span>
              {firstName && (
                <span className="text-ink/30 font-medium hidden sm:inline">· {firstName}</span>
              )}
            </div>
          </div>
          <ProgressBar pct={pct} confidence={confidence} />
          {/* Carteles de avance — aparecen a lo largo del test, no solo al final. */}
          <ProgressInsight insight={insight} />
        </div>
      </header>

      {/* Cuerpo de la pregunta — centrado vertical y horizontalmente; clipea el
          eje X para que las transiciones no produzcan scroll lateral. */}
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col">
        <div className="m-auto w-full max-w-xl lg:max-w-5xl px-5 lg:px-12 py-4 sm:py-6 lg:py-10">
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

      {/* Volver — pinneado abajo, centrado, no compite con las opciones */}
      <div className="shrink-0 max-w-xl lg:max-w-5xl mx-auto w-full px-5 lg:px-12 pb-3 lg:pb-5 pt-0.5">
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
