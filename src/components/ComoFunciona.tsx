import { motion } from 'motion/react';

const pasos = [
  {
    n: '01',
    titulo: 'Contextos reales',
    texto: 'Respondés cómo actuarías, no qué carrera "te suena linda".',
    beneficio: '',
  },
  {
    n: '02',
    titulo: 'Patrón vocacional',
    texto: 'Detectamos cómo pensás, decidís y resolvés problemas.',
    beneficio: '',
  },
  {
    n: '03',
    titulo: 'Carreras con sentido',
    texto: 'Cruzamos tu perfil con carreras reales, universidades y salida laboral.',
    beneficio: '',
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-heading" className="py-14 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          id="como-funciona-heading"
          className="font-display text-2xl sm:text-4xl tracking-tight leading-[1.15] mb-10 sm:mb-14"
        >
          <span className="font-normal block text-slate-500 mb-0.5">
            No te preguntamos qué te gusta.
          </span>
          <span className="font-black block text-[#0e1118]">
            Te ponemos en{' '}
            <span className="underline decoration-brand-lime decoration-[3px] underline-offset-[4px]">situaciones.</span>
          </span>
        </motion.h2>

        {/* Ítems — stack en mobile, fila en desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {pasos.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="font-mono font-bold text-[12px] text-brand-lime block mb-2">
                {p.n}
              </span>
              <h3 className="font-display font-extrabold text-[16px] sm:text-[17px] text-slate-900 mb-2 leading-tight">
                {p.titulo}
              </h3>
              <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed font-medium">
                {p.texto}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
