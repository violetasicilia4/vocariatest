import { useRef, useState, useCallback } from 'react';
import { Fingerprint, Compass, MapPin, Footprints } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

// Sección honesta de valor: en lugar de testimonios (el producto es pre-lanzamiento
// y no puede tener usuarios reales todavía), mostramos qué entrega el test. Cumple
// la misma función de "convencer antes del CTA" sin caer en prueba social falsa.
const entregables: { icon: LucideIcon; titulo: string; texto: string; etiqueta?: string }[] = [
  {
    icon: Fingerprint,
    titulo: 'Tu arquetipo vocacional',
    texto: 'Cómo pensás, decidís y resolvés, descrito en un perfil claro. No una etiqueta: tu forma de razonar.',
  },
  {
    icon: Compass,
    titulo: 'Carreras que encajan',
    texto: 'Cruzamos tu forma de pensar con +130 carreras reales y te mostramos las de mayor afinidad, con el porqué.',
  },
  {
    icon: MapPin,
    titulo: 'Universidades y salida laboral',
    texto: 'Dónde se estudia cada carrera en Argentina, su duración real y qué panorama laboral y salarial tiene.',
  },
  {
    icon: Footprints,
    titulo: 'Un punto de partida',
    texto: 'Salís con algo concreto para investigar y decidir, no con más preguntas de las que entraste.',
  },
];

function EntregableCard({ e }: { e: typeof entregables[0] }) {
  const Icon = e.icon;
  return (
    <div
      className="bg-white rounded-2xl p-5 flex flex-col h-full"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.20)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: '#07111F' }}
        >
          <Icon size={18} strokeWidth={2} style={{ color: '#d5ff3f' }} />
        </span>
        {e.etiqueta && (
          <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
            {e.etiqueta}
          </span>
        )}
      </div>
      <h3 className="font-display font-extrabold text-[15px] text-slate-900 leading-tight mb-1.5">
        {e.titulo}
      </h3>
      <p className="font-display text-[13px] font-medium text-slate-500 leading-relaxed flex-1">
        {e.texto}
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    setActiveIndex(Math.max(0, Math.min(idx, entregables.length - 1)));
  }, []);

  const goTo = (i: number) => {
    const step = getStep();
    if (!scrollRef.current || !step) return;
    scrollRef.current.scrollTo({ left: i * step, behavior: 'smooth' });
    setActiveIndex(i);
  };

  return (
    <section className="py-10 sm:py-14" style={{ background: '#07111F' }}>
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
            Lo que vas a obtener.
          </h2>
        </motion.div>

        {/* Desktop: grilla 4 columnas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {entregables.map((e, i) => <EntregableCard key={i} e={e} />)}
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
            {entregables.map((e, i) => (
              <div key={i} data-card className="snap-start shrink-0 w-[calc(100%-56px)]">
                <EntregableCard e={e} />
              </div>
            ))}
            <div className="shrink-0 w-14" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Dots mobile */}
        <div className="flex items-center justify-center gap-2 mt-5 sm:hidden">
          {entregables.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ver ${entregables[i].titulo}`}
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
