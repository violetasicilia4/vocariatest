import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const testimonios = [
  {
    texto: 'Venía cambiando de idea todo el tiempo. Me ayudó a poner un poco de orden entre tantas opciones.',
    nombre: 'Martina',
    edad: '18',
  },
  {
    texto: 'Sentía que tenía demasiada información y cada vez estaba más confundido. El informe me ayudó a bajar todo a tierra.',
    nombre: 'Tomás',
    edad: '17',
  },
  {
    texto: 'Ya había arrancado una carrera y venía con dudas hace meses. Me sirvió para entender que no estaba dudando porque sí.',
    nombre: 'Nicolás',
    edad: '20',
  },
  {
    texto: 'Lo hice pensando que me iba a decir qué estudiar. Al final me ayudó más a entenderme a mí que a elegir una carrera puntual.',
    nombre: 'Sofía',
    edad: '19',
  },
];

function getInitials(nombre: string): string {
  return nombre.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function TestimonioCard({ t }: { t: typeof testimonios[0] }) {
  return (
    <div
      className="bg-white rounded-2xl p-5 flex flex-col h-full"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.20)' }}
    >
      <span
        className="font-display font-black text-[#0e1118] select-none block mb-3"
        style={{ fontSize: '42px', lineHeight: '0.85' }}
        aria-hidden="true"
      >
        {'"'}
      </span>
      <p className="font-display text-[14px] font-medium text-slate-800 leading-relaxed flex-1 mb-5">
        {t.texto}
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div
          className="w-8 h-8 rounded-full bg-[#0e1118] flex items-center justify-center shrink-0"
          style={{ boxShadow: '0 0 0 2px rgba(213,255,63,0.18)' }}
        >
          <span className="font-display font-black text-[10px] text-brand-lime tracking-wide">
            {getInitials(t.nombre)}
          </span>
        </div>
        <p className="font-display font-bold text-[13px] text-slate-900 leading-tight">
          {t.nombre}, {t.edad} años
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* Paso exacto por card usando el DOM para evitar cálculos aproximados */
  const getStep = () => {
    const card = scrollRef.current?.querySelector('[data-card]') as HTMLElement | null;
    return card ? card.offsetWidth + 20 : 0; // ancho + gap-5 (20px)
  };

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector('[data-card]') as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 20;
    const idx = Math.round(scrollRef.current.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(idx, testimonios.length - 1)));
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const step = getStep();
    if (!scrollRef.current || !step) return;
    scrollRef.current.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const goTo = (i: number) => {
    const step = getStep();
    if (!scrollRef.current || !step) return;
    scrollRef.current.scrollTo({ left: i * step, behavior: 'smooth' });
    setActiveIndex(i);
  };

  return (
    <section className="py-10 sm:py-14" style={{ background: '#07111F' }}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Encabezado + flechas desktop */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
            Lo que encontraron otros.
          </h2>

        </motion.div>

        {/* Desktop: grilla 4 columnas sin scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {testimonios.map((t, i) => <TestimonioCard key={i} t={t} />)}
        </motion.div>

        {/* Mobile: carrusel con scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="sm:hidden"
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {testimonios.map((t, i) => (
              <div key={i} data-card className="snap-start shrink-0 w-[calc(100%-56px)]">
                <TestimonioCard t={t} />
              </div>
            ))}
            <div className="shrink-0 w-14" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Dots mobile */}
        <div className="flex items-center justify-center gap-2 mt-5 sm:hidden">
          {testimonios.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Testimonio ${i + 1}`}
              className={`rounded-full transition-[width,background-color] duration-200 ${
                activeIndex === i
                  ? 'w-5 h-2 bg-brand-lime'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
