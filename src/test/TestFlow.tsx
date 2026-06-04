import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import EmailCapture from './screens/EmailCapture';
import TestRunner from './screens/TestRunner';
import ProcessingScreen from './screens/ProcessingScreen';
import ResultPreview from './screens/ResultPreview';
import CheckoutScreen from './screens/CheckoutScreen';
import type { ScoringResult } from './engine/scorer';

type Step = 'email' | 'test' | 'processing' | 'result' | 'checkout';

interface TestFlowProps {
  onExit: () => void;
}

export default function TestFlow({ onExit }: TestFlowProps) {
  const [step, setStep] = useState<Step>('email');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ScoringResult | null>(null);

  const handleStart = useCallback((n: string, e: string) => {
    setNombre(n);
    setEmail(e);
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

  const handleGetFullReport = useCallback(() => {
    setStep('checkout');
  }, []);

  const handleBackToResult = useCallback(() => {
    setStep('result');
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#07111F] overflow-y-auto">
      {/* Close button — only on email step */}
      {step === 'email' && (
        <button
          onClick={onExit}
          className="fixed top-4 right-4 z-[110] text-white/30 hover:text-white/60 text-[13px] font-medium font-display transition-colors"
          aria-label="Cerrar test"
        >
          ✕
        </button>
      )}

      <AnimatePresence mode="wait">
        {step === 'email' && (
          <motion.div key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <EmailCapture onStart={handleStart} />
          </motion.div>
        )}

        {step === 'test' && (
          <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <TestRunner nombre={nombre} onComplete={handleTestComplete} />
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProcessingScreen nombre={nombre} onDone={handleProcessingDone} />
          </motion.div>
        )}

        {step === 'result' && result && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ResultPreview
              nombre={nombre}
              result={result}
              answers={answers}
              onGetFullReport={handleGetFullReport}
            />
          </motion.div>
        )}

        {step === 'checkout' && result && (
          <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <CheckoutScreen
              nombre={nombre}
              email={email}
              result={result}
              onBack={handleBackToResult}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
