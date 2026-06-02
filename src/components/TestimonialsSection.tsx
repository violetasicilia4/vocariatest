import { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';

const testimonios = [
  {
    etiqueta: 'DEMASIADAS OPCIONES',
    frase: 'Tenía anotadas psicología, marketing, periodismo, derecho y diseño. Cambiaba de idea cada quince días. El resultado no me agregó más opciones — me mostró que todas mis listas venían del mismo lugar. Eso fue lo que me ordenó.',
    nombre: 'Valentina M.',
    edad: '18',
    dato: 'Comunicación Estratégica · UCES',
    iniciales: 'VM',
  },
  {
    etiqueta: 'CAMBIÓ EN 2° AÑO',
    frase: 'Tenía dos años de Contador Público, buenas notas y la sensación de que algo no cerraba. No era que no entendía la materia. Era que la materia no me importaba. El informe fue directo: mi perfil pedía resultados que muevan personas, no registros. Hoy estoy en Administración. El contraste es brutal.',
    nombre: 'Nicolás R.',
    edad: '24',
    dato: 'Administración de Empresas · UBA',
    iniciales: 'NR',
  },
  {
    etiqueta: 'DESCUBRIÓ LO INESPERADO',
    frase: 'Siempre dije que era de ciencias. Me gustaba que tuvieran una sola respuesta. Pero el test mostró que lo que realmente me mueve es convencer a alguien con datos. Eso no es matemática. Es comunicación. Tardé una semana en procesar que no me conocía tan bien como creía.',
    nombre: 'Lucía T.',
    edad: '21',
    dato: 'Ciencia de Datos · ITBA',
    iniciales: 'LT',
  },
];

// Desktop stagger — breaks the monotony of equal-height columns
const desktopStagger = ['mt-0', 'mt-10', 'mt-4'];

function Card({ t }: { t: typeof testimonios[number] }) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 p-7 flex flex-col justify-between"
      style={{ boxShadow: '0 2px 16px rgba(30,50,80,0.06), 0 1px 3px rgba(30,50,80,0.04)' }}
    >
      <div>
        {/* Category label — all use brand-lime dot for visual consistency */}
        <div className="flex items-center gap-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
          <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">
            {t.etiqueta}
          </span>
        </div>

        {/* Decorative quote mark — brand-lime, large */}
        <div
          className="font-display font-black text-[56px] leading-none mb-1 select-none"
          style={{ color: 'rgba(213,255,63,0.28)' }}
          aria-hidden="true"
        >
          "
        </div>

        {/* Story — primary, story-first hierarchy */}
        <p className="font-display font-medium text-[15px] text-slate-700 leading-[1.75]">
          {t.frase}
        </p>
      </div>

      {/* Author — secondary, metadata */}
      <div className="border-t border-slate-100 pt-5 mt-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <span className="font-display font-bold text-[11px] tracking-wide text-slate-500">
            {t.iniciales}
          </span>
        </div>
        <div>
          <span className="font-display font-bold text-[13px] text-slate-800 block leading-snug">
            {t.nombre}, {t.edad}
          </span>
          <span className="text-[11px] text-slate-400 font-medium leading-snug block mt-0.5">
            {t.dato}
          </span>
        </div>
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

        {/* ── ENCABEZADO — left-aligned on desktop ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 sm:mb-14 px-6 text-center md:text-left"
        >
          <span className="inline-flex items-center gap-1.5 bg-brand-lime text-slate-950 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 shrink-0" />
            Historias Vocaria
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#0e1118] tracking-tight leading-[1.1] mb-4">
            Testigos de su propio mapa
          </h2>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-lg">
            Casos reales de jóvenes que cambiaron la incertidumbre
            {' '}por un enfoque vocacional claro y con futuro.
          </p>
        </motion.div>

        {/* ── DESKTOP: grid 3 col, staggered heights ───────── */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 px-6 items-start">
          {testimonios.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={desktopStagger[i]}
            >
              <Card t={t} />
            </motion.div>
          ))}
        </div>

        {/* ── MOBILE: carousel ─────────────────────────────── */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-6"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {testimonios.map((t, i) => (
              <div key={i} className="snap-center shrink-0 w-[calc(100%-3rem)]">
                <Card t={t} />
              </div>
            ))}
            <div className="shrink-0 w-3" aria-hidden="true" />
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonios.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ver testimonio ${i + 1}`}
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
