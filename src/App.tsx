import { lazy, Suspense, useEffect, useState } from 'react';
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

const TestFlow = lazy(() => import('./test/TestFlow'));

export default function App() {
  const [testOpen, setTestOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
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

        {/* Prueba social — casos reales de otros usuarios */}
        <TestimonialsSection />

        {/* Metodología — contexto para quien necesita entender el "cómo" */}
        <ComoFunciona />

        {/* Preguntas frecuentes — resolver las últimas fricciones */}
        <FAQSection />

        {/* CTA de cierre */}
        <CierreCTA onGetStartedClick={openTest} />

      </main>

      <Footer onContactClick={openTest} />

      {testOpen && (
        <Suspense fallback={null}>
          <TestFlow onExit={() => setTestOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
