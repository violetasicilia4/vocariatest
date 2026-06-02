import { motion } from 'motion/react';
import { IMAGES } from '../data';

interface HeroSectionProps {
  onGetStartedClick: () => void;
}

export default function HeroSection({ onGetStartedClick }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

  return (
    <section
      id="home"
      className="relative pt-16 pb-14 lg:pt-28 lg:pb-24 overflow-hidden rounded-b-[56px] md:rounded-b-[80px] flex flex-col justify-start lg:justify-center text-slate-900 bg-sky-50"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(111,159,202,0.97) 0%, rgba(159,210,241,0.93) 52%, rgba(221,247,255,0.90) 100%), url(${IMAGES.heroClouds})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradientes ambientales de fondo */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-sky/20 blur-[130px] rounded-full pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-lime/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-16 w-full relative z-10">

        {/* ==========================================
            MOBILE (lg:hidden)
        ========================================== */}
        <div className="lg:hidden flex flex-col items-center text-center w-full max-w-[340px] mx-auto pt-2 pb-2">

          <div className="mb-4">
            <span
              className="font-display text-[8px] font-bold tracking-widest px-3 py-1 rounded-full uppercase backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.92)' }}
            >
              Orientación Vocacional
            </span>
          </div>

          <h1
            className="font-display text-[26px] tracking-tight leading-[1.1] mb-4 w-full"
            style={{ textShadow: '0 2px 20px rgba(10,30,60,0.35), 0 1px 4px rgba(10,30,60,0.25)' }}
          >
            <span className="font-black block text-white">
              Descubrí qué carreras<br />
              encajan con tu{' '}
              <span className="underline decoration-[#D8F95C] decoration-[4px] underline-offset-[5px]">perfil real.</span>
            </span>
          </h1>

          <p
            className="text-[12.5px] w-full mb-5 leading-relaxed font-medium"
            style={{ color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 12px rgba(10,30,60,0.30)' }}
          >
            Respondé un test breve y recibí<br />
            un perfil con carreras y caminos que encajan con vos.
          </p>

          <div className="w-full mb-2">
            <button
              onClick={onGetStartedClick}
              className="w-full py-3.5 bg-[#07111F] text-white font-display text-[15px] font-black tracking-wide rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center shadow-[0_14px_32px_rgba(5,8,22,0.22)]"
            >
              Empezar mi test vocacional
            </button>
          </div>

          {/* Preview de resultado — mobile */}
          <div className="w-full pt-4">
            <div className="flex justify-center mb-2">
              <span className="text-[9px] font-medium tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.82)' }}>
                Preview de resultado
              </span>
            </div>

            <div className="w-full bg-white rounded-[22px] border border-slate-100 text-left relative overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(30,60,100,0.10)' }}>

              {/* Header mobile */}
              <div className="px-4 pt-4 pb-3 border-b border-slate-100">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <span className="text-slate-400 font-sans text-[7.5px] font-bold tracking-widest uppercase">Tu diagnóstico vocacional</span>
                  <span className="bg-[#D8F95C] text-[#07111F] text-[10px] font-black px-2.5 py-0.5 rounded-md tracking-wide shrink-0">92% MATCH</span>
                </div>
                <span className="text-slate-400 font-sans text-[7px] font-semibold tracking-widest uppercase">Perfil de enfoque</span>
                <h4 className="text-[15px] font-extrabold text-slate-900 tracking-tight leading-tight mt-0.5 mb-1">
                  Exploradora Estratégica
                </h4>
                <p className="text-[9px] text-slate-500 font-medium leading-snug mb-2">Combina pensamiento empático con alta capacidad directiva.</p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {['Diseño', 'Gestión Digital', 'Administración'].map(tag => (
                    <span key={tag} className="text-[8px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-4 py-3 border-b border-slate-100">
                <span className="text-slate-400 font-sans text-[7.5px] font-bold tracking-widest uppercase block mb-2">Match de recorridos</span>
                <div className="space-y-2">
                  {[
                    { n: '1', label: 'Diseño UX/UI',              unis: 'UADE · UP',      pct: 94 },
                    { n: '2', label: 'Comunicación Estratégica',   unis: 'UBA · Austral',  pct: 89 },
                    { n: '3', label: 'Gestión de Producto',        unis: 'UTDT · UdeSA',   pct: 86 },
                  ].map(c => (
                    <div key={c.label} className="flex flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-1.5 min-w-0">
                          <span className="text-slate-300 text-[8px] font-bold shrink-0 mt-0.5">{c.n}.</span>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-slate-800 text-[10px] leading-tight">{c.label}</span>
                            <span className="text-slate-400 text-[8px] font-medium leading-tight mt-0.5">{c.unis}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-brand-sky shrink-0 mt-0.5">{c.pct}% Afinidad</span>
                      </div>
                      <div className="w-full h-[2.5px] bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-slate-300 h-full rounded-full" style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-4 py-3">
                <span className="text-slate-400 font-sans text-[7.5px] font-bold tracking-widest uppercase block mb-1.5">Contexto laboral</span>
                <p className="text-[10px] text-slate-700 font-medium mb-1.5">
                  Entrada: <strong>~ARS 1.8M</strong> &nbsp;/&nbsp; Senior: <strong>~ARS 2.5M / mes</strong>
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1 text-emerald-600 text-[9px] font-semibold">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />Alta demanda
                  </span>
                  <span className="text-slate-500 text-[9px] font-medium">Teletrabajo ✓</span>
                </div>
                <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-500 text-[8px] font-medium px-2.5 py-1 rounded-full">
                  ⊙ Metodología Integrada
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* ==========================================
            DESKTOP (hidden lg:grid)
        ========================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* Columna izquierda: texto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className="font-display text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-full uppercase flex items-center gap-2 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.92)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
                ORIENTACIÓN VOCACIONAL
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl xl:text-6xl text-white font-black tracking-tight leading-[1.05] mb-5 max-w-xl"
              style={{ textShadow: '0 2px 20px rgba(10,30,60,0.35), 0 1px 4px rgba(10,30,60,0.25)' }}
            >
              Descubrí qué carreras encajan con tu{' '}
              <span className="underline decoration-[#D8F95C] decoration-[4px] underline-offset-[5px]">perfil real.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base leading-relaxed max-w-md mb-8 font-medium"
              style={{ color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 12px rgba(10,30,60,0.30)' }}
            >
              Respondé un test breve y recibí un perfil con carreras, áreas y caminos que encajan con vos.
            </motion.p>

            <motion.div variants={itemVariants}>
              <button
                onClick={onGetStartedClick}
                className="px-9 py-4 bg-[#07111F] text-white font-display text-[15px] font-black tracking-wide rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 select-none whitespace-nowrap shadow-[0_14px_32px_rgba(5,8,22,0.22)]"
              >
                Empezar mi test vocacional
              </button>
            </motion.div>
          </motion.div>

          {/* Columna derecha: mockup de resultado */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative pt-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-sky-200/30 blur-3xl rounded-full pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
              className="w-full max-w-[370px] relative hover:scale-[1.02] transition-transform duration-500"
            >
              <div className="w-full bg-white rounded-[20px] border border-slate-100 text-left relative overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(30,60,100,0.12)' }}>

                {/* Header: label + title + desc + tags */}
                <div className="px-4 pt-4 pb-3 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-slate-400 font-sans text-[8px] font-bold tracking-widest uppercase">Perfil de enfoque</span>
                    <span className="bg-[#D8F95C] text-[#07111F] text-[10px] font-black px-2.5 py-0.5 rounded-md tracking-wide shrink-0">92% MATCH</span>
                  </div>
                  <h4 className="text-[16px] font-extrabold text-slate-900 tracking-tight leading-tight mb-1">Exploradora Estratégica</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-snug mb-2.5">
                    Combina pensamiento empático con alta capacidad directiva.
                  </p>
                  {/* Tags de área */}
                  <div className="flex flex-wrap gap-1.5">
                    {['Diseño', 'Gestión Digital', 'Administración'].map(tag => (
                      <span key={tag} className="text-[9px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Carreras con barras */}
                <div className="px-4 py-3 border-b border-slate-100">
                  <span className="text-slate-400 font-sans text-[9px] font-bold tracking-widest uppercase block mb-1.5">Carreras con mayor afinidad</span>
                  <div className="space-y-1.5">
                    {[
                      { label: 'Diseño UX/UI',               unis: 'UADE · UP',    pct: 94 },
                      { label: 'Administración de Empresas',  unis: 'UBA · UTDT',   pct: 89 },
                    ].map(c => (
                      <div key={c.label} className="flex flex-col gap-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-slate-700 text-[11px] leading-tight">{c.label}</span>
                            <span className="text-slate-400 text-[9px] font-medium leading-tight mt-0.5">{c.unis}</span>
                          </div>
                          <span className="text-slate-500 font-mono text-[11px] shrink-0 mt-0.5">{c.pct}%</span>
                        </div>
                        <div className="w-full h-[2.5px] bg-slate-100 rounded-full overflow-hidden">
                          <div className="bg-slate-300 h-full rounded-full" style={{ width: `${c.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contexto laboral */}
                <div className="px-4 py-3">
                  <span className="text-slate-400 font-sans text-[9px] font-bold tracking-widest uppercase block mb-1.5">Contexto laboral</span>
                  <p className="text-[11px] text-slate-700 font-medium mb-1.5">
                    Entrada: <strong>~ARS 1.8M</strong> &nbsp;/&nbsp; Senior: <strong>~ARS 2.5M / mes</strong>
                  </p>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-[9.5px] font-semibold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />Alta demanda
                    </span>
                    <span className="text-slate-500 text-[9.5px] font-medium">Teletrabajo ✓</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-500 text-[9px] font-medium px-2.5 py-1 rounded-full">
                    ⊙ Metodología Integrada
                  </span>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
