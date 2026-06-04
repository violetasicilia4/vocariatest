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
    titulo: 'Tu respuesta ya empieza a dibujar un patrón.',
    cuerpo: 'Hay carreras muy distintas que comparten esta misma orientación. El test cruza esto con tus otras respuestas para distinguirlas.',
  },
  B: {
    titulo: 'Esto es más específico de lo que parece.',
    cuerpo: 'Hay un grupo de carreras donde este perfil termina siendo muy fuerte. El test necesita más respuestas para definir cuál es el tuyo.',
  },
  C: {
    titulo: 'Interesante. Esta respuesta aparece en perfiles muy distintos entre sí.',
    cuerpo: 'Para saber cuál es el tuyo, el test cruza esto con cómo respondés el resto de las situaciones.',
  },
  D: {
    titulo: 'Pocos eligen esto. Y cuando lo hacen, el patrón suele sorprender.',
    cuerpo: 'El test define con más precisión hacia dónde apunta esa orientación.',
  },
};

function InteractiveCard({ onGetStartedClick }: { onGetStartedClick: () => void }) {
  const [seleccionada, setSeleccionada] = useState<string | null>(null);

  return (
    <div
      className="bg-white rounded-[20px] border-2 border-brand-lime p-6 sm:p-8"
      style={{ boxShadow: '0 4px 28px rgba(20,60,100,0.10), 0 0 0 4px rgba(213,255,63,0.12)' }}
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
            <div className="bg-[#07111F] rounded-2xl px-4 py-4">
              <p className="text-[13px] font-bold text-white leading-snug mb-1.5">
                {feedbacks[seleccionada].titulo}
              </p>
              <p className="text-[12.5px] font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {feedbacks[seleccionada].cuerpo}
              </p>
            </div>

            <button
              onClick={onGetStartedClick}
              className="w-full py-3.5 bg-brand-lime text-slate-950 font-display text-[14px] font-black tracking-wide rounded-full hover:bg-[#07111F] hover:text-white hover:scale-[1.02] active:scale-[0.97] transition-[background-color,color,transform,box-shadow] duration-200 shadow-[0_10px_28px_rgba(213,255,63,0.20)]"
            >
              Ver mi resultado completo →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MuestraTest({ onGetStartedClick }: MuestraTestProps) {
  return (
    <section id="preview" aria-labelledby="muestra-heading" className="py-10 sm:py-16" style={{ background: '#F8FAFC' }}>
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
