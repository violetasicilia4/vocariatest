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
      {/* Dynamic Header */}
      <Header
        currentVersion={currentVersion}
        setVersion={setCurrentVersion}
        onContactClick={handleOpenContactGeneric}
      />

      {/* Dynamic Animated Hero Section (Toggleable V1, V2, V3) */}
      <HeroSection
        version={currentVersion}
        setVersion={setCurrentVersion}
        onGetStartedClick={handleOpenContactGeneric}
      />

      {/* Logo Banner showing corporate partners */}
      <LogoBanner />

      {/* Sección narrativa */}
      <NarrativaSection onGetStartedClick={handleOpenContactGeneric} />

      {/* 1. Muestra del test */}
      <MuestraTest onGetStartedClick={handleOpenContactGeneric} />

      {/* 2. Cómo funciona */}
      <ComoFunciona />

      {/* 3. Cierre + CTA */}
      <CierreCTA onGetStartedClick={handleOpenContactGeneric} />

      {/* 4. FAQ */}
      <FAQSection />

      {/* Footer */}
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

