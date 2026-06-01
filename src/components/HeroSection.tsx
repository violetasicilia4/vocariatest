import { motion } from 'motion/react';
import {
  Play,
  ArrowUpRight,
  Plus,
  Award,
  Star,
  TrendingUp,
  BarChart2,
  ShieldCheck,
  Cpu,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Brain,
  Search,
  BookOpen,
  Heart,
  Check,
  Shield,
  Briefcase,
  Wifi,
  Wallet
} from 'lucide-react';
import { HeroVersion } from '../types';
import { IMAGES } from '../data';

interface HeroSectionProps {
  version: HeroVersion;
  setVersion: (v: HeroVersion) => void;
  onGetStartedClick: () => void;
}

export default function HeroSection({ version, setVersion, onGetStartedClick }: HeroSectionProps) {
  // Let's create beautiful motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const floatVariants = {
    animate1: {
      y: [0, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    },
    animate2: {
      y: [0, -12, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
    },
    animate3: {
      y: [0, -8, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }
    }
  };

  if (version === 'V1') {
    return (
      <section
        id="home"
        className="relative pt-16 pb-14 lg:pt-24 lg:pb-16 overflow-hidden rounded-b-[56px] md:rounded-b-[80px] flex flex-col justify-start lg:justify-center text-slate-900 bg-sky-50"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(111,159,202,0.97) 0%, rgba(159,210,241,0.93) 52%, rgba(221,247,255,0.90) 100%), url(${IMAGES.heroClouds})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Decorative background visual ambient gradients */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-sky/20 blur-[130px] rounded-full pointer-events-none animate-pulse duration-[8s]" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-lime/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 lg:px-16 w-full relative z-10">
          
          {/* ========================================================================= */}
          {/* 📱 MOBILE LAYOUT (lg:hidden) - Optimized for gorgeous single-screen above-the-fold display on iPhones/iOS */}
          {/* ========================================================================= */}
          <div className="lg:hidden flex flex-col items-center text-center w-full max-w-[340px] mx-auto pt-2 pb-2">

            {/* 3. Label: Orientación vocacional */}
            <div className="mb-4">
              <span
                className="font-display text-[8px] font-bold tracking-widest px-3 py-1 rounded-full uppercase backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.92)' }}
              >
                Orientación Vocacional
              </span>
            </div>

            {/* 4. El Título */}
            <h1
              className="font-display text-[26px] tracking-tight leading-[1.1] mb-4 w-full"
              style={{ textShadow: '0 2px 20px rgba(10,30,60,0.35), 0 1px 4px rgba(10,30,60,0.25)' }}
            >
              <span className="font-black block text-white">
                Descubrí qué carreras<br />
                encajan con tu <span className="underline decoration-[#D8F95C] decoration-[4px] underline-offset-[5px]">perfil real.</span>
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-[12.5px] w-full mb-5 leading-relaxed font-medium"
              style={{ color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 12px rgba(10,30,60,0.30)' }}
            >
              Respondé un test breve y recibí<br />
              un perfil con carreras y caminos que encajan con vos.
            </p>


            {/* 5. El Botón */}
            <div className="w-full mb-2">
              <button
                onClick={onGetStartedClick}
                className="w-full py-3.5 bg-[#07111F] text-white font-display text-[15px] font-black tracking-wide rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center shadow-[0_14px_32px_rgba(5,8,22,0.22)]"
              >
                Empezar mi test vocacional
              </button>
            </div>
            <p className="text-[9.5px] font-medium mb-4 text-center tracking-wide" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Preview gratis · Pago único si querés el mapa completo · Sin suscripción
            </p>

            {/* 6. Mockup enriquecido */}
            <div className="w-full relative pt-4">

              {/* Label "Preview de resultado" */}
              <div className="flex justify-center mb-2">
                <span className="text-[9px] font-medium tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.82)' }}>
                  Preview de resultado
                </span>
              </div>

              {/* Badge 92% Match */}
              <div className="absolute top-4 right-0 z-20 select-none flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-[#CCFF00] text-[#0a0a0a] flex flex-col items-center justify-center shadow-md border-2 border-white">
                  <span className="font-mono text-[11px] font-black leading-none">92%</span>
                  <span className="text-[6px] font-sans font-black tracking-wider uppercase leading-none mt-0.5">Match</span>
                </div>
                <span className="text-[7.5px] text-slate-400 font-medium mt-1 text-center leading-tight" style={{ maxWidth: '80px' }}>Alineación con intereses y motivadores</span>
              </div>

              <div className="w-full bg-white rounded-[22px] border border-slate-100 text-left relative" style={{ padding: '18px 18px 16px', boxShadow: '0 8px 32px rgba(30,60,100,0.10), 0 1.5px 4px rgba(30,60,100,0.06)' }}>

                {/* Perfil sugerido */}
                <div className="mb-3">
                  <span className="text-slate-400 font-sans text-[8px] font-semibold tracking-widest uppercase">Perfil sugerido</span>
                  <h4 className="text-[17px] font-extrabold text-slate-900 tracking-tight leading-tight mt-0.5">
                    Exploradora Estratégica
                  </h4>
                </div>

                {/* Por qué encaja */}
                <div className="border-l-[2px] border-slate-200 bg-slate-50/80 px-3 py-2 rounded-r-lg mb-3">
                  <div className="text-slate-400 font-sans text-[7.5px] font-semibold tracking-wider uppercase mb-0.5">Por qué encaja con vos</div>
                  <p className="text-[10px] text-slate-700 font-semibold leading-snug">Pensás en sistemas, pero sentís en personas.</p>
                </div>

                {/* Carreras */}
                <div className="mb-3">
                  <span className="text-slate-400 font-sans text-[7.5px] font-semibold tracking-widest uppercase block mb-1.5">Carreras con mayor afinidad</span>
                  <div className="space-y-2">
                    {[
                      { label: 'Diseño UX/UI', unis: 'UADE · UP', pct: 94 },
                      { label: 'Comunicación Estratégica', unis: 'UBA · Austral', pct: 89 },
                      { label: 'Gestión de Producto', unis: 'UTDT · UdeSA', pct: 86 },
                    ].map(c => (
                      <div key={c.label} className="flex flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-slate-800 text-[10px] leading-tight">{c.label}</span>
                            <span className="text-slate-400 text-[8.5px] font-medium leading-tight mt-0.5">{c.unis}</span>
                          </div>
                          <span className="text-slate-500 font-mono text-[9.5px] font-semibold shrink-0 mt-0.5">{c.pct}%</span>
                        </div>
                        <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden">
                          <div className="bg-slate-300 h-full rounded-full" style={{ width: `${c.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* También podrías explorar */}
                <div className="flex items-baseline gap-2 pt-2.5 border-t border-slate-100">
                  <span className="text-slate-400 font-sans text-[7.5px] font-semibold uppercase tracking-widest shrink-0">También explorar</span>
                  <span className="text-slate-500 text-[9px]">Data · Producto · Comunicación</span>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 💻 DESKTOP LAYOUT — dos columnas anchas, composición horizontal */}
          {/* ========================================================================= */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-12 xl:gap-16 items-center">

            {/* Columna izquierda: texto anclado */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left"
            >
              {/* Badge */}
              <motion.div variants={itemVariants} className="mb-6">
                <span
                  className="font-display text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-full uppercase flex items-center gap-2 backdrop-blur-sm"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.92)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
                  ORIENTACIÓN VOCACIONAL
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-3xl xl:text-4xl text-white font-black tracking-tight leading-[1.1] mb-5 max-w-md"
                style={{ textShadow: '0 2px 20px rgba(10,30,60,0.35), 0 1px 4px rgba(10,30,60,0.25)' }}
              >
                Descubrí qué carreras encajan con tu{' '}
                <span className="underline decoration-[#D8F95C] decoration-[4px] underline-offset-[5px]">perfil real.</span>
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                variants={itemVariants}
                className="text-base leading-relaxed max-w-md mb-8 font-medium"
                style={{ color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 12px rgba(10,30,60,0.30)' }}
              >
                Respondé un test breve y recibí un perfil con carreras, áreas y caminos que encajan con vos.
              </motion.p>


              {/* CTA */}
              <motion.div variants={itemVariants}>
                <button
                  onClick={onGetStartedClick}
                  className="px-9 py-4 bg-[#07111F] text-white font-display text-[15px] font-black tracking-wide rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 select-none whitespace-nowrap shadow-[0_14px_32px_rgba(5,8,22,0.22)]"
                >
                  Empezar mi test vocacional
                </button>
                <p className="text-[10px] font-medium mt-2.5 tracking-wide" style={{ color: 'rgba(255,255,255,0.50)' }}>
                  Preview gratis · Pago único si querés el mapa completo · Sin suscripción
                </p>
              </motion.div>
            </motion.div>

            {/* Columna derecha: mockup */}
            <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative pt-6">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-sky-200/30 blur-3xl rounded-full pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                className="w-full max-w-[300px] relative hover:scale-[1.02] transition-transform duration-500 group"
              >
                {/* Badge 92% + contexto */}
                <div className="absolute top-0 right-8 -translate-y-1/3 z-20 select-none flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#CCFF00] text-[#0a0a0a] flex flex-col items-center justify-center shadow-lg border-2 border-white">
                    <span className="font-mono text-[13px] font-black leading-none">92%</span>
                    <span className="text-[7px] font-sans font-black tracking-wider uppercase leading-none mt-0.5">Match</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium mt-1.5 text-center leading-tight whitespace-nowrap">24 situaciones</span>
                </div>

                <div className="w-full bg-white rounded-[20px] border border-slate-100 text-left relative" style={{ padding: '14px 16px 12px', boxShadow: '0 8px 32px rgba(30,60,100,0.10)' }}>

                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-sans text-[10px] font-bold tracking-widest uppercase">Perfil sugerido</span>
                      <span className="inline-flex items-center gap-1 bg-[#f0fdf4] border border-emerald-500/15 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 w-fit">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full shrink-0 animate-pulse" />
                        Alta salida laboral
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 mb-2" />

                  {/* Nombre */}
                  <div className="mb-2">
                    <h4 className="text-[17px] font-extrabold text-slate-900 tracking-tight leading-tight">
                      Exploradora Estratégica
                    </h4>
                    <p className="text-[12px] text-slate-500 mt-0.5 font-medium leading-snug">
                      Combina pensamiento empático con alta capacidad directiva.
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {['Diseño UX', 'Gestión Digital'].map((tag) => (
                      <span key={tag} className="bg-slate-50 text-slate-600 font-sans text-[10px] px-2 py-0.5 rounded-full border border-slate-200 leading-none">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Por qué encaja */}
                  <div className="border-l-2 border-slate-200 bg-slate-50 px-2 py-1.5 rounded-r-md mb-2">
                    <div className="text-slate-400 font-sans text-[9px] font-bold tracking-wider uppercase mb-0.5">Por qué encaja</div>
                    <p className="text-[12px] text-slate-700 font-semibold leading-tight">
                      Pensás en sistemas, pero sentís en personas.
                    </p>
                  </div>

                {/* Carreras */}
                <div className="mb-2">
                  <span className="text-slate-400 font-sans text-[9.5px] font-bold tracking-widest uppercase block mb-1.5">Carreras con mayor afinidad</span>
                  <div className="space-y-1.5">
                    {[
                      { label: 'Diseño UX/UI', unis: 'UADE · UP', pct: 94 },
                      { label: 'Administración de Empresas', unis: 'UBA · UTDT', pct: 89 },
                    ].map(c => (
                      <div key={c.label} className="flex flex-col gap-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-slate-700 text-[12px] leading-tight">{c.label}</span>
                            <span className="text-slate-400 text-[10px] font-medium leading-tight mt-0.5">{c.unis}</span>
                          </div>
                          <span className="text-slate-500 font-mono text-[11px] shrink-0 mt-0.5">{c.pct}%</span>
                        </div>
                        <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden">
                          <div className="bg-slate-300 h-full rounded-full" style={{ width: `${c.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salario */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Wallet className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="text-slate-400 font-sans text-[9.5px] font-bold uppercase tracking-widest">Contexto laboral</span>
                  </div>
                  <span className="font-mono font-normal text-slate-500 text-[12px]">$1.8M – 2.5M /mes</span>
                </div>

                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>
    );
  }

  if (version === 'V2') {
    return (
      <section
        id="home"
        className="relative min-h-[100dvh] lg:min-h-[900px] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-slate-50 text-slate-900 rounded-b-[40px] md:rounded-b-[60px]"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 pt-4 lg:pt-8">
          
          {/* Left Column Text details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col text-left"
          >
            {/* Trusted indicators */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex -space-x-2.5">
                <img
                  src={IMAGES.avatar1}
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-slate-50 object-cover"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={IMAGES.avatar2}
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-slate-50 object-cover"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={IMAGES.avatar3}
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-slate-50 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-semibold text-slate-600">
                Trusted over <strong className="text-slate-900 font-bold">5,000+</strong> clients
              </span>
            </motion.div>

            {/* Version Badge */}
            <motion.div variants={itemVariants} className="self-start mb-4">
              <span className="bg-brand-sky/10 text-brand-sky font-display text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                Ailine Template Variant V2
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-brand-dark tracking-tight leading-[1.1] mb-6"
            >
              Empowering businesses through strategy and AI
            </motion.h1>

            {/* Short paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed"
            >
              We are a consulting and AI innovation firm dedicated to helping organizations think smarter, move faster, and grow stronger.
            </motion.p>

            {/* Call to arms */}
            <motion.div variants={itemVariants}>
              <button
                onClick={onGetStartedClick}
                className="px-8 py-3.5 bg-brand-dark text-white font-display text-xs font-bold tracking-widest rounded-full hover:bg-brand-sky transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-lg self-start"
              >
                GET STARTED
                <span className="w-6 h-6 rounded-full bg-brand-lime text-slate-950 flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column Layout cards */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* Primary Portrait image card */}
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-6 rounded-3xl overflow-hidden shadow-xl aspect-square lg:aspect-auto min-h-[300px] hover:scale-[1.01] transition-transform duration-300 relative border border-slate-100"
            >
              <img
                src={IMAGES.youngMan}
                alt="Representative photo of a consultant look"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Grid of sub-cards on the right */}
            <div className="md:col-span-6 flex flex-col gap-5">
              
              {/* Card stack with Black & White visuals */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-md flex-grow flex flex-col justify-between"
              >
                <div className="flex gap-2 mb-4">
                  <div className="bg-brand-dark text-white text-[9px] font-bold p-3 rounded-2xl max-w-[85%] border border-slate-700">
                    <span className="text-brand-lime font-bold">Expertise</span> combines Strategy, Data & AI
                  </div>
                  <div className="bg-slate-100 text-slate-900 text-[9px] font-bold p-3 rounded-2xl flex-grow text-center flex flex-col justify-center">
                    <span className="text-[8px] text-slate-400 font-mono">Growth</span>
                    <span className="text-xl font-extrabold text-[#258ef9]">+49%</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wide">Business growth rate</span>
                  <span className="w-3.5 h-3.5 bg-brand-sky rounded-full animate-pulse" />
                </div>
              </motion.div>

              {/* Color high impact green card */}
              <motion.div
                variants={itemVariants}
                className="bg-[#d5ff3f] rounded-3xl p-5 shadow-lg flex-grow flex flex-col justify-between text-slate-900 border border-[#c1ea2a]"
              >
                <div>
                  <span className="text-[9px] font-bold text-slate-600 font-mono tracking-wider uppercase">Commitment to measurable</span>
                  <h3 className="text-4xl font-display font-extrabold text-slate-950 mt-1 mb-2">100%</h3>
                </div>
                <p className="text-[11px] font-semibold text-slate-700 leading-snug">
                  Collaborating with leading AI and cloud technology providers.
                </p>
              </motion.div>
            </div>

            {/* Broad bottom banner row matching Image 2 tag cloud with background grass */}
            <motion.div
              variants={itemVariants}
              className="cols-span-1 md:col-span-12 rounded-3xl overflow-hidden relative shadow-md h-40 flex items-center bg-cover bg-center border border-slate-100"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(23, 27, 35, 0.9) 30%, rgba(23, 27, 35, 0.5) 100%), url(${IMAGES.beachGrass})`,
              }}
            >
              <div className="p-6 relative z-10 w-full">
                <span className="text-[9px] font-bold text-brand-lime font-mono tracking-wider uppercase block mb-3">AI & Consult Tag Density</span>
                <div className="flex flex-wrap gap-2 max-w-xl">
                  {['Professional', 'Strategic', 'AI-Focused', 'Startup Feel', 'Smarter', 'Grow Faster', 'Build Smart', 'Simple'].map((t, idx) => (
                    <span
                      key={t}
                      className={`text-[9px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md transition-colors hover:bg-white hover:text-slate-950 cursor-default ${
                        idx === 0
                          ? 'bg-brand-lime text-slate-950'
                          : idx === 1
                          ? 'bg-brand-sky text-white'
                          : 'bg-white/10 text-white border border-white/15'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Version V3
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] lg:min-h-[900px] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-slate-50 text-slate-900 rounded-b-[40px] md:rounded-b-[60px]"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch relative z-10 pt-4 lg:pt-8">
        
        {/* Left Column Content sidebar layout */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl flex flex-col justify-between text-left"
        >
          <div>
            {/* Round Icon */}
            <div className="w-12 h-12 bg-brand-lime rounded-2xl flex items-center justify-center mb-8 relative border border-[#c5ee2c] shadow-sm">
              <Cpu className="w-5 h-5 text-slate-950" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-sky rounded-full animate-ping" />
            </div>

            {/* Variant Identifier */}
            <span className="bg-slate-100 text-slate-600 font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase block mb-3 w-fit">
              Ailine Variant V3
            </span>

            {/* Headline title page */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight leading-[1.1] mb-6">
              AI strategy
            </h1>

            {/* Paragraph context detailed */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              We help organizations understand where AI creates the most impact and how to adopt it effectively.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              Through strategic analysis, opportunity mapping, and technology guidance, we design a step-by-step plan that aligns intelligence with your business goals — ensuring clarity, feasibility, and long-term value.
            </p>
          </div>

          <div>
            <button
              onClick={onGetStartedClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-dark hover:bg-brand-sky text-white font-display text-xs font-bold tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              GET STARTED
              <span className="w-6 h-6 rounded-full bg-brand-lime text-slate-950 flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </motion.div>

        {/* Right Column Beach grass scenic cover with floating performance statistics widget */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 rounded-3xl overflow-hidden relative shadow-2xl min-h-[400px] flex items-center justify-center border border-slate-100"
          style={{
            backgroundImage: `url(${IMAGES.beachGrass})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle overlay shading cover style */}
          <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />

          {/* Floating interactive Widget card right in the center of image */}
          <motion.div
            variants={floatVariants}
            animate="animate1"
            className="w-full max-w-[340px] bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/60 text-slate-900 m-6 relative z-10"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-extrabold text-slate-400 font-mono tracking-wider uppercase">PERFORMANCE</span>
              <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-bold">+2.5%</span>
            </div>
            
            <h3 className="text-4xl font-display font-extrabold mb-1">49%</h3>
            <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase block mb-6">Business Growth</span>

            {/* Tag Cloud integrated inside widget */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
              <span className="bg-brand-sky/10 text-brand-sky text-[8px] font-bold px-2 py-1 rounded-full">Strategic</span>
              <span className="bg-slate-100 text-slate-800 text-[8px] font-bold px-2 py-1 rounded-full">AI-Focused</span>
              <span className="bg-slate-100 text-slate-800 text-[8px] font-bold px-2 py-1 rounded-full">Grow Faster</span>
              <span className="bg-slate-100 text-slate-800 text-[8px] font-bold px-2 py-1 rounded-full">Build Smart</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
