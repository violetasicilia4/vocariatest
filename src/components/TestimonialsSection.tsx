import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const testimonios = [
  {
    texto: 'No me dijo qué estudiar. Me ayudó a entender por qué me atraían opciones tan distintas.',
    nombre: 'Valentina M.',
    edad: '18',
    carrera: 'Comunicación Estratégica · UCES',
  },
  {
    texto: 'Pensé que estaba eligiendo entre tres carreras. Resultaron tener algo en común.',
    nombre: 'Nicolás R.',
    edad: '24',
    carrera: 'Administración de Empresas · UBA',
  },
  {
    texto: 'No salí con una respuesta definitiva. Salí con menos ruido.',
    nombre: 'Lucía T.',
    edad: '21',
    carrera: 'Ciencia de Datos · ITBA',
  },
  {
    texto: 'Lo más útil fue entender por qué estaba trabado, no descubrir adónde ir.',
    nombre: 'Martín E.',
    edad: '22',
    carrera: 'Diseño UX/UI · UADE',
  },
];

function getInitials(nombre: string): string {
  return nombre.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
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

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollByCard(-1)}
              disabled={activeIndex === 0}
              aria-label="Anterior"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 disabled:opacity-20 active:scale-[0.95] transition-[color,border-color,transform] duration-150"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              disabled={activeIndex === testimonios.length - 1}
              aria-label="Siguiente"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 disabled:opacity-20 active:scale-[0.95] transition-[color,border-color,transform] duration-150"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Carrusel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {testimonios.map((t, i) => (
              <div
                key={i}
                data-card
                className="snap-start shrink-0 w-[calc(100%-56px)] sm:w-[calc(100%-140px)] bg-white rounded-2xl p-5 sm:p-6 flex flex-col"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.20)' }}
              >
                {/* Comilla — oscura para máximo contraste sobre blanco */}
                <span
                  className="font-display font-black text-[#0e1118] select-none block mb-3"
                  style={{ fontSize: '42px', lineHeight: '0.85' }}
                  aria-hidden="true"
                >
                  {'“'}
                </span>

                {/* Cita */}
                <p className="font-display text-[15px] sm:text-[16px] font-medium text-slate-800 leading-relaxed flex-1 mb-5">
                  {t.texto}
                </p>

                {/* Atribución */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div
                    className="w-8 h-8 rounded-full bg-[#0e1118] flex items-center justify-center shrink-0"
                    style={{ boxShadow: '0 0 0 2px rgba(213,255,63,0.18)' }}
                  >
                    <span className="font-display font-black text-[10px] text-brand-lime tracking-wide">
                      {getInitials(t.nombre)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-[13px] text-slate-900 leading-tight">
                      {t.nombre}, {t.edad} años
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-tight truncate">
                      {t.carrera}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Trailing spacer — permite que el último card haga snap correctamente */}
            <div className="shrink-0 w-14 sm:w-[140px]" aria-hidden="true" />
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
