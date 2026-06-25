import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  // Medidor que se ve durante el test: es CONGRUENTE con el avance real. Arranca
  // bajo (≈5% en la primera pregunta) y sube de forma proporcional a las
  // preguntas respondidas, sin saltos ni retrocesos. Antes partía de un piso del
  // 33% y crecía con ease-out (rápido al inicio, lento después), lo que se sentía
  // "ya arriba" desde la primera pregunta. El valor real y exacto de confianza
  // del perfil se calcula y se muestra recién en el resultado final.
  const confidence = pct;
  // "Última pregunta" solo es cierto en la fase adaptativa cuando es su última
  // pregunta. Durante el núcleo NO lo sabemos: todavía pueden aparecer hasta 5
  // preguntas de validación, así que no prometemos que sea la última (evita el
  // cartel "última pregunta" cuando en realidad faltan las de desempate).
  const isLastQuestion = isAdaptive && currentIndex === total - 1;

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

  // Continuidad espacial: la pregunta entrante llega desde el lado del avance y
  // la saliente se va hacia el opuesto, con un leve desplazamiento + fundido.
  // La dirección refuerza "voy hacia adelante" (o "volví"), no un corte seco.
  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 44 : -44, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -44 : 44, opacity: 0 }),
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
        <div className="max-w-xl lg:max-w-[860px] xl:max-w-[980px] mx-auto w-full px-5 lg:px-12 pt-2.5 lg:pt-4 pb-2.5 lg:pb-3.5">
          <div className="flex items-center justify-between mb-2 lg:mb-2.5">
            <div className="flex items-center gap-1.5 text-ink">
              <LogoIcon size={16} />
              <span className="font-display font-bold text-[11.5px] lg:text-[13px] tracking-tight">Vocaria</span>
            </div>
            <div className="flex items-center gap-1.5 font-display text-[10.5px] lg:text-[12px]">
              <span className="text-ink/55 font-semibold tabular-nums">
                {isAdaptive
                  ? 'Últimas preguntas de refinamiento'
                  : `Pregunta ${currentIndex + 1} de ${CORE_LENGTH}`}
              </span>
              {firstName && !isAdaptive && (
                <span className="text-ink/30 font-medium hidden sm:inline">· {firstName}</span>
              )}
            </div>
          </div>
          <ProgressBar pct={pct} />
          {/* Carteles de avance — aparecen a lo largo del test, no solo al final. */}
          <ProgressInsight insight={insight} />
        </div>
      </header>

      {/* Cuerpo de la pregunta — centrado vertical y horizontalmente; clipea el
          eje X para que las transiciones no produzcan scroll lateral. */}
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col">
        <div className="mx-auto w-full max-w-[860px] xl:max-w-[980px] px-5 lg:px-12 pt-[clamp(0.125rem,1vh,0.75rem)] sm:pt-[clamp(0.5rem,2vh,2rem)] pb-2 sm:pb-3 lg:pb-6 flex-1 flex flex-col min-h-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion?.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: EASE }}
              className="flex-1 flex flex-col min-h-0"
            >
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  currentAnswer={answers[currentQuestion.id]}
                  onBack={handleBack}
                  canGoBack={currentIndex > 0}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Checkpoint premium — interrumpe el flujo en los hitos clave */}
      <AnimatePresence>
        {checkpoint && (
          <CheckpointModal
            checkpoint={checkpoint}
            onContinue={() => setCheckpoint(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
