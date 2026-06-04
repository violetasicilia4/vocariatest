import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LogoBanner from './components/LogoBanner';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import NarrativaSection from './components/NarrativaSection';
import MuestraTest from './components/MuestraTest';
import ComoFunciona from './components/ComoFunciona';
import CierreCTA from './components/CierreCTA';
import FAQSection from './components/FAQSection';
import TestimonialsSection from './components/TestimonialsSection';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden selection:bg-brand-lime selection:text-slate-950 font-sans antialiased text-[#0f172a]">

      <Header onContactClick={() => setContactOpen(true)} />

      <main id="main-content">

        {/* Hero — propuesta de valor + CTA */}
        <HeroSection onGetStartedClick={() => setContactOpen(true)} />

        {/* Respaldo institucional — ancla credibilidad temprana */}
        <LogoBanner />

        {/* Identificación emocional — el usuario se reconoce */}
        <NarrativaSection onGetStartedClick={() => setContactOpen(true)} />

        {/* Demo interactiva — la sección más poderosa */}
        <MuestraTest onGetStartedClick={() => setContactOpen(true)} />

        {/* Prueba social — casos reales de otros usuarios */}
        <TestimonialsSection />

        {/* Metodología — contexto para quien necesita entender el "cómo" */}
        <ComoFunciona />

        {/* Preguntas frecuentes — resolver las últimas fricciones */}
        <FAQSection />

        {/* CTA de cierre */}
        <CierreCTA onGetStartedClick={() => setContactOpen(true)} />

      </main>

      <Footer onContactClick={() => setContactOpen(true)} />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
