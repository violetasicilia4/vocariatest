import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import ProfileCapture from './screens/ProfileCapture';
import TestRunner from './screens/TestRunner';
import ProcessingScreen from './screens/ProcessingScreen';
import ResultPreview from './screens/ResultPreview';
import CheckoutScreen from './screens/CheckoutScreen';
import type { ScoringResult } from './engine/scorer';
import type { UserProfile, PlanId } from './data/profile';
import { saveTestResult } from '../services/leads';
import { track } from '../services/analytics';

type Step = 'profile' | 'test' | 'processing' | 'result' | 'checkout';

interface TestFlowProps {
  onExit: () => void;
}

export default function TestFlow({ onExit }: TestFlowProps) {
  const [step, setStep] = useState<Step>('profile');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('universitario');

  const handleStart = useCallback((p: UserProfile) => {
    track('profile_completed');
    track('test_started');
    setProfile(p);
    setStep('test');
  }, []);

  const handleTestComplete = useCallback((ans: Record<string, string>, res: ScoringResult) => {
    track('test_completed', { archetype: res.primario.nombre });
    setAnswers(ans);
    setResult(res);
    setStep('processing');
  }, []);

  // Persiste el resultado completo cuando termina el test (para análisis de
  // demanda y para poder reconstruir el informe). Best-effort: si falla, se encola.
  useEffect(() => {
    if (!result || !profile) return;
    void saveTestResult({
      email: profile.email,
      nombre: profile.nombre,
      arquetipo_primario: result.primario.nombre,
      arquetipo_secundario: result.secundario?.nombre ?? null,
      confianza: result.confianza,
      preferences: result.preferences as unknown as Record<string, number>,
      answers,
    });
    // Sólo cuando aparece el resultado, no en cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, profile]);

  const handleProcessingDone = useCallback(() => {
    track('result_preview_seen');
    setStep('result');
  }, []);

  const handleGetFullReport = useCallback((plan: PlanId) => {
    setSelectedPlan(plan);
    setStep('checkout');
  }, []);

  const handleBackToResult = useCallback(() => {
    setStep('result');
  }, []);

  // Mientras el overlay del test está montado, bloqueamos el scroll de la
  // landing que queda detrás. Así el rubber-band (rebote del overscroll) ya no
  // la deja asomar por arriba/abajo al scrollear el resultado.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Las pantallas profile/test/processing manejan su propio alto (h-[100dvh]
  // con scroll interno propio), así que el contenedor NO debe scrollear: si lo
  // hace, aparece una barra fantasma que no mueve nada. Solo result y checkout
  // son páginas largas que sí necesitan scroll de página.
  const scrolls = step === 'result' || step === 'checkout';

  return (
    <div className={`fixed inset-0 z-[100] bg-paper overscroll-none ${scrolls ? 'overflow-y-auto' : 'overflow-hidden'}`}>
      {step === 'profile' && (
        <button
          onClick={onExit}
          className="fixed top-4 right-4 z-[110] w-9 h-9 rounded-full flex items-center justify-center text-ink/40 hover:text-ink hover:bg-line/60 transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      )}

      <AnimatePresence mode="wait">
        {step === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProfileCapture onStart={handleStart} />
          </motion.div>
        )}

        {step === 'test' && profile && (
          <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <TestRunner nombre={profile.nombre} profile={profile} onComplete={handleTestComplete} />
          </motion.div>
        )}

        {step === 'processing' && profile && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProcessingScreen nombre={profile.nombre} onDone={handleProcessingDone} />
          </motion.div>
        )}

        {step === 'result' && result && profile && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ResultPreview
              nombre={profile.nombre}
              result={result}
              answers={answers}
              onGetFullReport={handleGetFullReport}
            />
          </motion.div>
        )}

        {step === 'checkout' && result && profile && (
          <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <CheckoutScreen
              nombre={profile.nombre}
              email={profile.email}
              result={result}
              plan={selectedPlan}
              onBack={handleBackToResult}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
