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

const desktopIndent = ['ml-0', 'ml-10', 'ml-5', 'ml-14'];

export default function NarrativaSection({ onGetStartedClick }: NarrativaSectionProps) {
  return (
    <section
      aria-labelledby="narrativa-heading"
      className="py-10 sm:py-16 bg-white relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* ── MOBILE: centered ──────────────────────────────── */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="font-display text-[22px] font-semibold text-slate-500 mb-1.5 leading-snug tracking-tight">
              No es que no tengas opciones.
            </p>
            <h2
              id="narrativa-heading"
              className="font-display font-black text-[36px] text-[#0e1118] tracking-tight leading-[1.05]"
            >
              Es que todavía no tenés un mapa.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col items-center gap-2.5 mb-8 w-full"
          >
            {frases.map((f, i) => (
              <span
                key={i}
                className={`text-center px-7 py-3 rounded-full font-display font-medium text-sm tracking-tight border cursor-default select-none ${
                  f.acento
                    ? 'bg-[#f2ffcc] border-brand-lime/40 text-slate-800'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                {f.texto}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button
              onClick={onGetStartedClick}
              className="px-8 py-3.5 bg-[#07111F] text-white font-display text-sm font-bold tracking-widest rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.97] transition-[background-color,color,transform,box-shadow] duration-200 shadow-[0_6px_20px_rgba(5,8,22,0.14)]"
            >
              ¿Alguna te suena? Empezá →
            </button>
          </motion.div>
        </div>

        {/* ── DESKTOP: asymmetric 2-col ─────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 xl:gap-20 items-start">

          {/* Left col: heading + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-5 pt-2"
          >
            <p className="font-display text-2xl font-semibold text-slate-500 mb-2 leading-snug tracking-tight">
              No es que no tengas opciones.
            </p>
            <h2
              id="narrativa-heading"
              className="font-display font-black text-[46px] text-[#0e1118] tracking-tight leading-[1.05] mb-10"
            >
              Es que todavía no tenés un mapa.
            </h2>

            <button
              onClick={onGetStartedClick}
              className="px-8 py-3.5 bg-[#07111F] text-white font-display text-sm font-bold tracking-widest rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.97] transition-[background-color,color,transform,box-shadow] duration-200 shadow-[0_6px_20px_rgba(5,8,22,0.14)]"
            >
              ¿Alguna te suena? Empezá →
            </button>
          </motion.div>

          {/* Right col: staggered pills */}
          <div className="col-span-7 flex flex-col gap-3 pt-10">
            {frases.map((f, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.09 }}
                className={`inline-flex px-7 py-3.5 rounded-full font-display font-medium text-sm tracking-tight border cursor-default select-none w-fit ${desktopIndent[i]} ${
                  f.acento
                    ? 'bg-[#f2ffcc] border-brand-lime/40 text-slate-800'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                {f.texto}
              </motion.span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
