import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import ProfileCapture from './screens/ProfileCapture';
import TestRunner from './screens/TestRunner';
import ProcessingScreen from './screens/ProcessingScreen';
import ResultPreview from './screens/ResultPreview';
import CheckoutScreen from './screens/CheckoutScreen';
import type { ScoringResult } from './engine/scorer';
import type { UserProfile, PlanId } from './data/profile';

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
    setProfile(p);
    setStep('test');
  }, []);

  const handleTestComplete = useCallback((ans: Record<string, string>, res: ScoringResult) => {
    setAnswers(ans);
    setResult(res);
    setStep('processing');
  }, []);

  const handleProcessingDone = useCallback(() => {
    setStep('result');
  }, []);

  const handleGetFullReport = useCallback((plan: PlanId) => {
    setSelectedPlan(plan);
    setStep('checkout');
  }, []);

  const handleBackToResult = useCallback(() => {
    setStep('result');
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#07111F] overflow-y-auto">
      {step === 'profile' && (
        <button
          onClick={onExit}
          className="fixed top-4 right-4 z-[110] text-white/30 hover:text-white/60 text-[13px] font-medium font-display transition-colors"
          aria-label="Cerrar"
        >
          ✕
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
