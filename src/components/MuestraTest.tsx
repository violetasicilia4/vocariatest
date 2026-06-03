import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MuestraTestProps {
  onGetStartedClick: () => void;
}

const opciones = [
  { id: 'A', texto: 'Ordenar un problema difícil hasta encontrarle lógica.' },
  { id: 'B', texto: 'Ayudar a un equipo a funcionar mejor.' },
  { id: 'C', texto: 'Crear una experiencia que la gente quiera usar.' },
  { id: 'D', texto: 'Entender por qué algo no está funcionando.' },
];

const feedbacks: Record<string, { titulo: string; cuerpo: string }> = {
  A: {
    titulo: 'Orientación analítica y estratégica',
    cuerpo: 'Esta respuesta es frecuente en perfiles que priorizan la resolución de problemas complejos, el análisis de sistemas y el pensamiento estructurado.',
  },
  B: {
    titulo: 'Orientación al liderazgo y la colaboración',
    cuerpo: 'Esta respuesta aparece habitualmente en perfiles orientados a la gestión de equipos, el trabajo interdisciplinario y el desarrollo de personas.',
  },
  C: {
    titulo: 'Orientación creativa y al usuario',
    cuerpo: 'Esta respuesta es característica de perfiles con sensibilidad hacia el diseño, la comunicación y la construcción de experiencias.',
  },
  D: {
    titulo: 'Orientación investigativa y diagnóstica',
    cuerpo: 'Esta respuesta aparece en perfiles con pensamiento crítico, capacidad de diagnóstico y orientación a la mejora continua.',
  },
};

function InteractiveCard({ onGetStartedClick }: { onGetStartedClick: () => void }) {
  const [seleccionada, setSeleccionada] = useState<string | null>(null);

  return (
    <div
      className="bg-white rounded-[20px] border border-white/80 p-6 sm:p-8"
      style={{ boxShadow: '0 4px 28px rgba(20,60,100,0.10)' }}
    >
      <p className="font-display font-semibold text-[15px] sm:text-base text-slate-800 leading-snug mb-6">
        Imaginá tu primer día en algo nuevo.
        <br />
        <span className="font-black text-slate-900">¿Qué desafío te entusiasmaría más?</span>
      </p>

      <div className="flex flex-col gap-2.5">
        {opciones.map((op) => {
          const activa = seleccionada === op.id;
          return (
            <button
              key={op.id}
              onClick={() => setSeleccionada(op.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border font-display text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 flex items-start gap-3 active:scale-[0.99] ${
                activa
                  ? 'bg-[#07111F] text-white border-[#07111F]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <span
                className="font-mono text-[11px] font-bold shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={activa
                  ? { background: '#d5ff3f', color: '#0d1b2e' }
                  : { color: '#94a3b8' }
                }
              >
                {op.id}
              </span>
              {op.texto}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {seleccionada && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 space-y-4"
          >
            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4">
              <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-slate-500">
                {feedbacks[seleccionada].titulo}
              </p>
              <p className="text-[12.5px] text-slate-600 font-medium leading-relaxed">
                {feedbacks[seleccionada].cuerpo}
              </p>
            </div>

            <button
              onClick={onGetStartedClick}
              className="w-full py-3.5 bg-[#07111F] text-white font-display text-[14px] font-black tracking-wide rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.97] transition-[background-color,color,transform,box-shadow] duration-200 shadow-[0_10px_28px_rgba(5,8,22,0.18)]"
            >
              Seguir con mi test →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MuestraTest({ onGetStartedClick }: MuestraTestProps) {
  return (
    <section id="preview" aria-labelledby="muestra-heading" className="py-10 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── MOBILE ───────────────────────────────────── */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >
            <h2
              id="muestra-heading"
              className="font-display font-black text-2xl text-[#0e1118] tracking-tight leading-tight mb-2"
            >
              Probá una pregunta real.
            </h2>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Sin respuestas correctas. Tu patrón emerge de las situaciones.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <InteractiveCard onGetStartedClick={onGetStartedClick} />
          </motion.div>
        </div>

        {/* ── DESKTOP: 2-col ───────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-14 xl:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-5"
          >
            <h2
              id="muestra-heading"
              className="font-display font-black text-[40px] text-[#0e1118] tracking-tight leading-[1.1] mb-5"
            >
              Probá una pregunta real.
            </h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Sin respuestas correctas. Tu patrón emerge de las situaciones.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-7"
          >
            <InteractiveCard onGetStartedClick={onGetStartedClick} />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
