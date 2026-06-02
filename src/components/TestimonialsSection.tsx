import { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';

const testimonios = [
  {
    etiqueta: 'ENCONTRÓ: DISEÑO UX / UI',
    frase:
      '"Pensaba que para diseñar interfaces tenía que saber programar. El test me ordenó las ideas y me mostró que lo mío era puramente visual y de usabilidad."',
    nombre: 'Sofía, 20',
    dato: 'Diseño Multimedial · UADE',
    iniciales: 'SD',
    dotColor: 'bg-brand-sky',
  },
  {
    etiqueta: 'REORIENTÓ: ADMINISTRACIÓN',
    frase:
      '"Estaba frustrado en abogacía memorizando leyes sin sentido práctico. Acá descubrí que mi verdadero fuerte era la gestión y optimización de proyectos."',
    nombre: 'Mateo, 23',
    dato: 'Cambio de Abogacía a Lic. en Administración · UBA',
    iniciales: 'MZ',
    dotColor: 'bg-slate-500',
  },
  {
    etiqueta: 'ENCONTRÓ: BUSINESS & TECH',
    frase:
      '"Me apasionaba la tecnología pero no me veía codeando todo el día. El test me guio exactamente hacia negocios digitales, donde conecto ambos mundos."',
    nombre: 'Camila, 19',
    dato: 'Lic. en Negocios de Tecnología · San Andrés',
    iniciales: 'CT',
    dotColor: 'bg-emerald-500',
  },
];

function Card({ t }: { t: typeof testimonios[number] }) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between h-full"
      style={{ boxShadow: '0 1px 8px rgba(30,50,80,0.05)' }}
    >
      <div>
        <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-slate-400 mb-5">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.dotColor}`} />
          {t.etiqueta}
        </span>
        <p className="font-display font-medium text-[15px] text-slate-800 leading-relaxed">
          {t.frase}
        </p>
      </div>
      <div className="border-t border-slate-100 pt-5 mt-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <span className="font-display font-bold text-[11px] tracking-wide text-slate-600">
            {t.iniciales}
          </span>
        </div>
        <div>
          <span className="font-display font-bold text-[13px] text-slate-800 block leading-snug">
            {t.nombre}
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
    <section className="py-20 sm:py-28" style={{ background: '#F8F5F1' }}>
      <div className="max-w-5xl mx-auto">

        {/* ── ENCABEZADO ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12 sm:mb-16 px-6"
        >
          <span className="inline-flex items-center gap-1.5 bg-brand-lime text-slate-950 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 shrink-0" />
            Historias Vocaria
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#0e1118] tracking-tight leading-[1.1] mb-4">
            Testigos de su propio mapa
          </h2>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Casos reales de jóvenes que cambiaron la incertidumbre<br className="hidden sm:block" />
            {' '}por un enfoque vocacional claro y con futuro.
          </p>
        </motion.div>

        {/* ── DESKTOP: grid 3 columnas ─────────────────── */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 px-6">
          {testimonios.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Card t={t} />
            </motion.div>
          ))}
        </div>

        {/* ── MOBILE: carrusel deslizable ──────────────── */}
        <div className="md:hidden">
          {/* Track deslizable */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-6"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {testimonios.map((t, i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-[calc(100%-3rem)]"
              >
                <Card t={t} />
              </div>
            ))}
            {/* Spacer final para que el último card snappee bien */}
            <div className="shrink-0 w-3" aria-hidden="true" />
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonios.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ver testimonio ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  activeIndex === i
                    ? 'w-5 h-2 bg-brand-lime'
                    : 'w-2 h-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
