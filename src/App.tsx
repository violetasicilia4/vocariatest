import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LogoBanner from './components/LogoBanner';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import NarrativaSection from './components/NarrativaSection';
import MuestraTest from './components/MuestraTest';
import ComoFunciona from './components/ComoFunciona';
import MetodologiaSection from './components/MetodologiaSection';
import CierreCTA from './components/CierreCTA';
import FAQSection from './components/FAQSection';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden selection:bg-brand-lime selection:text-slate-950 font-sans antialiased text-[#0f172a]">

      <Header onContactClick={() => setContactOpen(true)} />

      <main id="main-content">

        {/* Hero — problema + CTA */}
        <HeroSection onGetStartedClick={() => setContactOpen(true)} />

        {/* Confianza: universidades argentinas analizadas */}
        <LogoBanner />

        {/* El problema real — frases de identificación */}
        <NarrativaSection onGetStartedClick={() => setContactOpen(true)} />

        {/* Cómo funciona — metodología de situaciones */}
        <ComoFunciona />

        {/* Qué analiza — señales + disclaimer */}
        <MetodologiaSection />

        {/* Pregunta real del test — demo interactiva */}
        <MuestraTest onGetStartedClick={() => setContactOpen(true)} />

        {/* Preguntas frecuentes */}
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
