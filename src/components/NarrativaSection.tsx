import { motion } from 'motion/react';

interface NarrativaSectionProps {
  onGetStartedClick: () => void;
}

const frases = [
  { texto: '"Tengo miedo de elegir mal"', acento: true },
  { texto: '"Ya empecé una carrera y no me cierra"', acento: true },
  { texto: '"Me gustan muchas cosas, pero nada del todo"', acento: false },
  { texto: '"Quiero algo que me guste y que tenga salida"', acento: false },
];

const testimonios = [
  {
    etiqueta: 'Encontró: Diseño UX',
    frase: '"Resultó que sí sabía. Solo no tenía las palabras."',
    nombre: 'Lucía, 19',
    dato: 'Diseño UX · UADE',
    iniciales: 'LM',
    color: 'bg-brand-sky',
  },
  {
    etiqueta: 'Reorientó: Administración',
    frase: '"Tenía perfil para gestión, no para litigio. Lo entendí acá."',
    nombre: 'Nicolás, 22',
    dato: 'Cambió de Abogacía · UBA',
    iniciales: 'NR',
    color: 'bg-slate-700',
  },
];

export default function NarrativaSection({ onGetStartedClick }: NarrativaSectionProps) {
  return (
    <section className="pt-10 pb-14 sm:pt-16 sm:pb-20 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-6">

        {/* Bloques 1 y 2 centrados */}
        <div className="max-w-xl mx-auto text-center">

          {/* BLOQUE 1 — TITULAR */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl sm:text-4xl tracking-tight leading-[1.15] mb-6 sm:mb-8"
          >
            <span className="font-normal block text-slate-400 mb-0.5 text-xl sm:text-3xl">
              No es que no tengas opciones.
            </span>
            <span className="font-black block text-[#0e1118]">
              Es que todavía no tenés{' '}
              <span className="underline decoration-brand-lime decoration-[3px] underline-offset-4">
                un mapa.
              </span>
            </span>
          </motion.h2>

          {/* BLOQUE 2 — FRASES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-2 mb-5 w-full"
          >
            {frases.map((f, i) => (
              <span
                key={i}
                className={`px-5 py-2 rounded-full font-display font-medium text-sm tracking-tight border cursor-default select-none w-fit ${
                  f.acento
                    ? 'bg-brand-lime/15 border-brand-lime/40 text-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                {f.texto}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-slate-400 text-xs sm:text-sm font-medium mb-5"
          >
            Vocaria muestra tu patrón y las carreras que encajan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mb-10 sm:mb-14"
          >
            <button
              onClick={onGetStartedClick}
              className="px-7 py-3 bg-[#07111F] text-white font-display text-xs font-bold tracking-widest rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-2 shadow-[0_6px_20px_rgba(5,8,22,0.16)]"
            >
              ¿Alguna te suena? Empezá →
            </button>
          </motion.div>

        </div>

        {/* BLOQUE 3 — TESTIMONIOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
          {testimonios.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white rounded-[18px] border border-slate-100 p-5 flex flex-col justify-between"
              style={{ boxShadow: '0 2px 16px rgba(30,50,80,0.07)' }}
            >
              {/* Etiqueta */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shrink-0" />
                  {t.etiqueta}
                </span>
              </div>

              {/* Frase — protagonista */}
              <p className="font-display font-semibold text-[15px] sm:text-base text-slate-800 leading-snug mb-4">
                {t.frase}
              </p>

              {/* Perfil */}
              <div className="border-t border-slate-100 pt-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-[10px] tracking-wide text-slate-600">{t.iniciales}</span>
                </div>
                <div>
                  <span className="font-display font-bold text-[12px] text-slate-800 block leading-none">
                    {t.nombre}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                    {t.dato}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
