import { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';

// Casos de uso — formato before/after, sin frases publicitarias
const casos = [
  {
    etiqueta: 'DEMASIADAS OPCIONES',
    nombre: 'Valentina M.',
    edad: '18',
    antes: ['Psicología', 'Derecho', 'Marketing', 'Diseño'],
    despues: 'Comunicación Estratégica · UCES',
    descubrimiento: 'Las cuatro compartían el mismo patrón. No lo había visto.',
    iniciales: 'VM',
  },
  {
    etiqueta: 'CAMBIÓ EN 2° AÑO',
    nombre: 'Nicolás R.',
    edad: '24',
    antes: ['Contador Público (2° año)'],
    despues: 'Administración de Empresas · UBA',
    descubrimiento: 'El problema no era la carrera. Era que la exactitud nunca me importó.',
    iniciales: 'NR',
  },
  {
    etiqueta: 'DESCUBRIÓ LO INESPERADO',
    nombre: 'Lucía T.',
    edad: '21',
    antes: ['Ingeniería', 'Actuariado'],
    despues: 'Ciencia de Datos · ITBA',
    descubrimiento: 'Pensaba que era para exactas. Era para convencer con datos.',
    iniciales: 'LT',
  },
];

function CasoCard({ c }: { c: typeof casos[number] }) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-5 h-full"
      style={{ boxShadow: '0 2px 16px rgba(30,50,80,0.06), 0 1px 3px rgba(30,50,80,0.04)' }}
    >
      {/* Etiqueta + persona */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
          <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">
            {c.etiqueta}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-[10px] text-slate-500">{c.iniciales}</span>
          </div>
          <span className="font-display font-bold text-[13px] text-slate-800">
            {c.nombre}, {c.edad}
          </span>
        </div>
      </div>

      {/* Antes */}
      <div>
        <p className="text-[9px] font-bold tracking-widest uppercase text-slate-400 mb-2">
          Manejaba
        </p>
        <div className="flex flex-wrap gap-1.5">
          {c.antes.map((op) => (
            <span
              key={op}
              className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full"
            >
              {op}
            </span>
          ))}
        </div>
      </div>

      {/* Después */}
      <div>
        <p className="text-[9px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
          Eligió
        </p>
        <p className="font-display font-extrabold text-[14px] text-slate-900 leading-snug">
          {c.despues}
        </p>
      </div>

      {/* Insight — corto, auténtico */}
      <div className="border-t border-slate-100 pt-4">
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed italic">
          "{c.descubrimiento}"
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    setActiveIndex(Math.round(scrollLeft / offsetWidth));
  }, []);

  const goTo = (i: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: 'smooth' });
    setActiveIndex(i);
  };

  return (
    <section className="py-20 sm:py-28" style={{ background: '#EFF6FB' }}>
      <div className="max-w-5xl mx-auto">

        {/* ── ENCABEZADO ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 px-6 text-center md:text-left"
        >
          <span className="inline-flex items-center gap-1.5 bg-brand-lime text-slate-950 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 shrink-0" />
            Casos de uso
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#0e1118] tracking-tight leading-[1.1] mb-4">
            Qué encontraron otros.
          </h2>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-lg">
            Tres situaciones distintas, tres resultados distintos.
            Lo que tienen en común: una decisión más clara.
          </p>
        </motion.div>

        {/* ── DESKTOP: 3 columnas, altura uniforme ────── */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 px-6 items-stretch">
          {casos.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <CasoCard c={c} />
            </motion.div>
          ))}
        </div>

        {/* ── MOBILE: carrusel ─────────────────────────── */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-6"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {casos.map((c, i) => (
              <div key={i} className="snap-center shrink-0 w-[calc(100%-3rem)]">
                <CasoCard c={c} />
              </div>
            ))}
            <div className="shrink-0 w-3" aria-hidden="true" />
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {casos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ver caso ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  activeIndex === i ? 'w-5 h-2 bg-brand-lime' : 'w-2 h-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
