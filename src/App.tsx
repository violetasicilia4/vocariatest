import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LogoBanner from './components/LogoBanner';
import Footer from './components/Footer';
import NarrativaSection from './components/NarrativaSection';
import MuestraTest from './components/MuestraTest';
import ComoFunciona from './components/ComoFunciona';
import CierreCTA from './components/CierreCTA';
import FAQSection from './components/FAQSection';
import TestimonialsSection from './components/TestimonialsSection';
import { flushQueue } from './services/leads';

// Code-splitting: el flujo del test arrastra el motor + la DB de carreras
// (~varios cientos de KB). Se carga sólo cuando el usuario abre el test,
// no en el critical path de la landing.
const TestFlow = lazy(() => import('./test/TestFlow'));
const PaymentReturn = lazy(() => import('./test/screens/PaymentReturn'));

export default function App() {
  const [testOpen, setTestOpen] = useState(false);
  // Retorno de Mercado Pago: la URL trae ?mp=return tras el checkout.
  const [paymentReturn, setPaymentReturn] = useState(
    () => new URLSearchParams(window.location.search).get('mp') === 'return',
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    // Reintenta enviar leads/resultados que quedaron encolados sin red.
    void flushQueue();
  }, []);

  const openTest = () => setTestOpen(true);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden selection:bg-brand-lime selection:text-slate-950 font-sans antialiased text-[#0f172a]">

      <Header onContactClick={openTest} />

      <main id="main-content">

        {/* Hero — propuesta de valor + CTA */}
        <HeroSection onGetStartedClick={openTest} />

        {/* Respaldo institucional — ancla credibilidad temprana */}
        <LogoBanner />

        {/* Identificación emocional — el usuario se reconoce */}
        <NarrativaSection onGetStartedClick={openTest} />

        {/* Demo interactiva — la sección más poderosa */}
        <MuestraTest onGetStartedClick={openTest} />

        {/* Valor concreto — qué entrega el test (sin prueba social falsa pre-lanzamiento) */}
        <TestimonialsSection />

        {/* Metodología — contexto para quien necesita entender el "cómo" */}
        <ComoFunciona />

        {/* Preguntas frecuentes — resolver las últimas fricciones */}
        <FAQSection />

        {/* CTA de cierre */}
        <CierreCTA onGetStartedClick={openTest} />

      </main>

      <Footer />

      {testOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[100] bg-paper flex items-center justify-center">
              <div className="w-7 h-7 border-2 border-brand-sky/30 border-t-brand-sky rounded-full animate-spin" />
            </div>
          }
        >
          <TestFlow onExit={() => setTestOpen(false)} />
        </Suspense>
      )}

      {paymentReturn && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[120] bg-paper flex items-center justify-center">
              <div className="w-7 h-7 border-2 border-brand-sky/30 border-t-brand-sky rounded-full animate-spin" />
            </div>
          }
        >
          <PaymentReturn onClose={() => setPaymentReturn(false)} />
        </Suspense>
      )}
    </div>
  );
}
