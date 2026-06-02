import { useState } from 'react';
import { HeroVersion } from './types';
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

export default function App() {
  const [currentVersion, setCurrentVersion] = useState<HeroVersion>('V1');
  const [contactOpen, setContactOpen] = useState(false);

  const handleOpenContactGeneric = () => {
    setContactOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden selection:bg-brand-lime selection:text-slate-950 font-sans antialiased text-[#0f172a]">

      {/* Landmark: header + nav */}
      <Header
        currentVersion={currentVersion}
        setVersion={setCurrentVersion}
        onContactClick={handleOpenContactGeneric}
      />

      {/* Landmark: main content */}
      <main id="main-content">

        {/* Hero — H1 + CTA principal + preview de resultado */}
        <HeroSection
          version={currentVersion}
          setVersion={setCurrentVersion}
          onGetStartedClick={handleOpenContactGeneric}
        />

        {/* Confianza: universidades argentinas analizadas */}
        <LogoBanner />

        {/* El problema real: frases de identificación + testimonios */}
        <NarrativaSection onGetStartedClick={handleOpenContactGeneric} />

        {/* Preview interactivo del test */}
        <MuestraTest onGetStartedClick={handleOpenContactGeneric} />

        {/* Cómo funciona Vocaria */}
        <ComoFunciona />

        {/* CTA de cierre */}
        <CierreCTA onGetStartedClick={handleOpenContactGeneric} />

        {/* Preguntas frecuentes */}
        <FAQSection />

      </main>

      {/* Landmark: footer */}
      <Footer
        onLayoutChange={setCurrentVersion}
        onContactClick={handleOpenContactGeneric}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        preselectedPlan=""
        preselectedPrice=""
      />
    </div>
  );
}
