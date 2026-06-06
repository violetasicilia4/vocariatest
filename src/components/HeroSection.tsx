import { motion } from 'motion/react';
import { IMAGES } from '../data';

interface HeroSectionProps {
  onGetStartedClick: () => void;
}

const trustItems = ['7 minutos', 'Resultado personalizado', 'Carreras + universidades'];

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

  const mobileVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="home"
      className="relative pt-20 pb-10 lg:pt-24 lg:pb-20 overflow-hidden rounded-b-[56px] md:rounded-b-[80px] flex flex-col justify-start lg:justify-center text-slate-900 bg-sky-50"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(111,159,202,0.97) 0%, rgba(159,210,241,0.93) 52%, rgba(221,247,255,0.90) 100%), url(${IMAGES.heroClouds})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradiente ambiental — solo sky, mantiene el mood del hero */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-sky/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-16 w-full relative z-10">

        {/* ==========================================
            MOBILE (lg:hidden) — jerarquía limpia
        ========================================== */}
        <motion.div
          variants={mobileVariants}
          initial="hidden"
          animate="visible"
          className="lg:hidden flex flex-col items-center text-center w-full max-w-[340px] mx-auto pt-2 pb-4"
        >

          {/* H1 */}
          <motion.h1 variants={mobileItemVariants}
            className="font-display text-[26px] tracking-tight leading-[1.1] mb-2.5 w-full"
            style={{ textShadow: '0 2px 20px rgba(10,30,60,0.35), 0 1px 4px rgba(10,30,60,0.25)' }}
          >
            <span className="font-black block text-white">
              Descubrí qué carreras<br />
              encajan con{' '}
              <span className="underline decoration-[#d5ff3f] decoration-[4px] underline-offset-[5px]">cómo pensás.</span>
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p variants={mobileItemVariants}
            className="text-[11.5px] w-full mb-3 leading-snug font-medium"
            style={{ color: 'rgba(255,255,255,0.75)', textShadow: '0 1px 12px rgba(10,30,60,0.30)' }}
          >
            Respondé un test basado en situaciones reales y recibí carreras, universidades y próximos pasos.
          </motion.p>

          {/* Preview de resultado — prueba social de apoyo, escala reducida */}
          <motion.div variants={mobileItemVariants} className="w-[78%] mx-auto mb-3 opacity-90">
            <div className="flex justify-center mb-1.5">
              <span className="text-[9px] font-medium tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.40)' }}>
                Así se ve tu resultado
              </span>
            </div>

            <div
              className="w-full bg-white rounded-[14px] border border-slate-100 text-left relative overflow-hidden"
              style={{ boxShadow: '0 6px 18px rgba(30,60,100,0.09)' }}
            >
              <div className="px-3 pt-2 pb-1.5 border-b border-slate-100">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <span className="text-slate-400 font-sans text-[8.5px] font-bold tracking-widest uppercase">Perfil de enfoque</span>
                  <span className="bg-brand-lime text-[#07111F] text-[8.5px] font-black px-1.5 py-0.5 rounded tracking-wide shrink-0">Alta afinidad</span>
                </div>
                <h4 className="text-[12.5px] font-extrabold text-slate-900 tracking-tight leading-tight mb-0.5">Exploradora Estratégica</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {['Diseño', 'Gestión Digital', 'Administración'].map(tag => (
                    <span key={tag} className="text-[8.5px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-3 py-1.5">
                <span className="text-slate-400 font-sans text-[8.5px] font-bold tracking-widest uppercase block mb-1">Carreras con mayor afinidad</span>
                <div className="space-y-1">
                  {[
                    { label: 'Diseño UX/UI',              unis: 'UADE · UP',  top: true  },
                    { label: 'Administración de Empresas', unis: 'UBA · UTDT', top: false },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-slate-700 text-[9.5px] leading-tight">{c.label}</span>
                        <span className="text-slate-400 text-[8.5px] font-medium leading-tight">{c.unis}</span>
                      </div>
                      <span className={`text-[8.5px] shrink-0 font-semibold ${c.top ? 'text-brand-lime bg-[#07111F] px-1.5 py-0.5 rounded' : 'text-slate-300'}`}>
                        {c.top ? '↑ Top' : '-'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA principal — debajo del mockup, a la altura del pulgar */}
          <motion.div variants={mobileItemVariants} className="w-full mb-2">
            <button
              onClick={onGetStartedClick}
              className="w-full py-4 bg-[#07111F] text-white font-display text-[16px] font-black tracking-wide rounded-full
                         hover:bg-brand-lime hover:text-slate-950
                         active:scale-[0.97] active:shadow-[0_4px_12px_rgba(5,8,22,0.12)]
                         transition-[background-color,color,transform,box-shadow]
                         duration-150 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
                         flex items-center justify-center
                         shadow-[0_8px_28px_rgba(5,8,22,0.30)]"
            >
              Empezar mi test vocacional
            </button>
          </motion.div>

          {/* Trust pills */}
          <motion.div variants={mobileItemVariants} className="flex items-center justify-center gap-3">
            <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>✓ Resultado personalizado</span>
            <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>·</span>
            <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>✓ Sin registro previo</span>
          </motion.div>

        </motion.div>

        {/* ==========================================
            DESKTOP (hidden lg:grid)
        ========================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">

          {/* Columna izquierda: texto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left"
          >
            {/* Badge orientación vocacional */}
            <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center gap-2 border border-white/25 bg-white/10 backdrop-blur-sm text-white/90 text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                Orientación vocacional
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-[40px] xl:text-[46px] text-white font-black tracking-tight leading-[1.05] mb-5"
              style={{ textShadow: '0 2px 20px rgba(10,30,60,0.35), 0 1px 4px rgba(10,30,60,0.25)' }}
            >
              Descubrí qué carreras<br />
              encajan con{' '}
              <span className="underline decoration-[#d5ff3f] decoration-[4px] underline-offset-[5px]">cómo pensás.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[15px] leading-relaxed max-w-md mb-8 font-medium"
              style={{ color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 12px rgba(10,30,60,0.30)' }}
            >
              Respondé un test basado en situaciones reales y recibí carreras, universidades y próximos pasos.
            </motion.p>

            {/* Botón + trust pills centrados juntos */}
            <motion.div variants={itemVariants} className="inline-flex flex-col items-center gap-2.5">
              <button
                onClick={onGetStartedClick}
                className="px-9 py-4 bg-[#07111F] text-white font-display text-[15px] font-black tracking-wide rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.97] transition-[background-color,color,transform,box-shadow] duration-200 select-none whitespace-nowrap shadow-[0_14px_32px_rgba(5,8,22,0.22)]"
              >
                Empezar mi test vocacional
              </button>

              {/* Trust pills — legibles bajo el botón */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>✓ Resultado personalizado</span>
                <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>·</span>
                <span className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>✓ Sin registro previo</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Columna derecha: mockup de resultado */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative pt-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-sky-200/30 blur-3xl rounded-full pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
              className="w-full max-w-[370px] relative"
            >
              {/* Etiqueta preview — deja claro que es un ejemplo */}
              <div className="flex justify-center mb-2.5">
                <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Ejemplo de resultado
                </span>
              </div>

              <div className="w-full bg-white rounded-[20px] border border-slate-100 text-left relative overflow-hidden pointer-events-none select-none" style={{ boxShadow: '0 12px 40px rgba(30,60,100,0.12)' }}>

                <div className="px-4 pt-4 pb-3 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-slate-400 font-sans text-[10px] font-bold tracking-widest uppercase">Perfil de enfoque</span>
                    <span className="bg-brand-lime text-[#07111F] text-[10px] font-black px-2.5 py-0.5 rounded-md tracking-wide shrink-0">Alta afinidad</span>
                  </div>
                  <h4 className="text-[16px] font-extrabold text-slate-900 tracking-tight leading-tight mb-1">Exploradora Estratégica</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-snug mb-2.5">
                    Combina pensamiento empático con alta capacidad directiva.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Diseño', 'Gestión Digital', 'Administración'].map(tag => (
                      <span key={tag} className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-4 py-3 border-b border-slate-100">
                  <span className="text-slate-400 font-sans text-[10px] font-bold tracking-widest uppercase block mb-1.5">Carreras con mayor afinidad</span>
                  <div className="space-y-1.5">
                    {[
                      { label: 'Diseño UX/UI',               unis: 'UADE · UP',   pct: 94, top: true  },
                      { label: 'Administración de Empresas',  unis: 'UBA · UTDT',  pct: 89, top: false },
                    ].map((c, barIdx) => (
                      <div key={c.label} className="flex flex-col gap-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-slate-700 text-[11px] leading-tight">{c.label}</span>
                            <span className="text-slate-400 text-[10px] font-medium leading-tight mt-0.5">{c.unis}</span>
                          </div>
                          <span className={`text-[10px] shrink-0 mt-0.5 font-semibold ${c.top ? 'text-brand-lime bg-[#07111F] px-1.5 py-0.5 rounded' : 'text-slate-300'}`}>
                            {c.top ? '↑ Top' : '—'}
                          </span>
                        </div>
                        <div className="w-full h-[2px] bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${c.top ? 'bg-brand-lime' : 'bg-slate-200'}`}
                            style={{ width: `${c.pct}%`, transformOrigin: 'left center' }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.75 + barIdx * 0.12 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-4 py-3">
                  <span className="text-slate-400 font-sans text-[10px] font-bold tracking-widest uppercase block mb-1.5">Contexto laboral</span>
                  <p className="text-[11px] text-slate-700 font-medium mb-1.5">
                    Entrada: <strong>~ARS 1.8M</strong> &nbsp;/&nbsp; Senior: <strong>~ARS 2.5M / mes</strong>
                  </p>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-flex items-center gap-1 text-slate-600 text-[10px] font-semibold">
                      Alta demanda ✓
                    </span>
                    <span className="text-slate-500 text-[10px] font-medium">Teletrabajo ✓</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-medium px-2.5 py-1 rounded-full">
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
