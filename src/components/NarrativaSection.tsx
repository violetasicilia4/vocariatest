import { motion } from 'motion/react';

interface NarrativaSectionProps {
  onGetStartedClick: () => void;
}

const frases = [
  { texto: '"Tengo miedo de elegir mal"',                    acento: true  },
  { texto: '"Ya empecé una carrera y no me cierra"',         acento: true  },
  { texto: '"Me gustan muchas cosas, pero nada del todo"',   acento: false },
  { texto: '"Quiero algo que me guste y que tenga salida"',  acento: false },
];

export default function NarrativaSection({ onGetStartedClick }: NarrativaSectionProps) {
  return (
    <section
      aria-labelledby="narrativa-heading"
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-xl mx-auto px-6 flex flex-col items-center text-center">

        {/* ── TITULAR ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <p className="text-lg sm:text-xl font-normal text-slate-400 mb-2 leading-snug tracking-tight">
            No es que no tengas opciones.
          </p>
          <h2
            id="narrativa-heading"
            className="font-display font-black text-[38px] sm:text-[52px] text-[#0e1118] tracking-tight leading-[1.05]"
          >
            Es que todavía no tenés{' '}
            <span className="underline decoration-brand-lime decoration-[4px] sm:decoration-[5px] underline-offset-[5px] sm:underline-offset-[7px]">
              un mapa.
            </span>
          </h2>
        </motion.div>

        {/* ── PILLS ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col items-center gap-2.5 mb-6 w-full"
        >
          {frases.map((f, i) => (
            <span
              key={i}
              className={`text-center px-7 py-3 rounded-full font-display font-medium text-sm tracking-tight border cursor-default select-none ${
                f.acento
                  ? 'bg-[#f2ffcc] border-[#c8f03a]/60 text-slate-800'
                  : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              {f.texto}
            </span>
          ))}
        </motion.div>

        {/* ── MICROCOPY ───────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-slate-400 text-sm font-medium mb-8"
        >
          Vocaria muestra tu patrón y las carreras que encajan.
        </motion.p>

        {/* ── CTA ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <button
            onClick={onGetStartedClick}
            className="px-8 py-3.5 bg-[#07111F] text-white font-display text-sm font-bold tracking-widest rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_6px_20px_rgba(5,8,22,0.14)]"
          >
            ¿Alguna te suena? Empezá →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
