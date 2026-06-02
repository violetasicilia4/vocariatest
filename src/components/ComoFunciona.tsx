import { motion } from 'motion/react';

const pasos = [
  {
    n: '01',
    titulo: 'Contextos reales',
    texto: 'Respondés cómo actuarías, no qué carrera "te suena linda".',
  },
  {
    n: '02',
    titulo: 'Patrón vocacional',
    texto: 'Detectamos cómo pensás, decidís y resolvés problemas.',
  },
  {
    n: '03',
    titulo: 'Carreras con sentido',
    texto: 'Cruzamos tu perfil con carreras reales, universidades y salida laboral.',
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-heading" className="py-10 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── HEADLINE ─────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          id="como-funciona-heading"
          className="font-display text-2xl sm:text-4xl tracking-tight leading-[1.15] mb-10 sm:mb-14 max-w-lg"
        >
          <span className="font-normal block text-slate-400 mb-0.5">
            No te preguntamos qué te gusta.
          </span>
          <span className="font-black block text-[#0e1118]">
            Te ponemos en{' '}
            <span className="underline decoration-brand-lime decoration-[3px] underline-offset-[4px]">situaciones.</span>
          </span>
        </motion.h2>

        {/* ── PASOS ─────────────────────────────────────── */}
        <div className="relative">

          {/* Path connector — dotted line through the step numbers (desktop) */}
          <div
            className="absolute hidden sm:block h-px top-[54px] z-0"
            style={{
              left: '16.67%',
              right: '16.67%',
              background: 'repeating-linear-gradient(90deg, #e2e8f0 0, #e2e8f0 5px, transparent 5px, transparent 14px)',
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 relative z-10">
            {pasos.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`pt-6 pb-8 ${
                  i > 0
                    ? 'border-t sm:border-t-0 sm:border-l border-slate-100 mt-0 sm:pl-10'
                    : ''
                } ${i < 2 ? 'sm:pr-10' : ''}`}
              >
                {/* Number — floats above the connector line */}
                <span className="font-mono font-black text-[56px] sm:text-[64px] leading-none text-brand-lime block mb-5 bg-white pr-2 w-fit">
                  {p.n}
                </span>
                <h3 className="font-display font-extrabold text-[17px] sm:text-[18px] text-slate-900 mb-2 leading-tight">
                  {p.titulo}
                </h3>
                <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {p.texto}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
