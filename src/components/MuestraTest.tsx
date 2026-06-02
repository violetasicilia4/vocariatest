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

export default function MuestraTest({ onGetStartedClick }: MuestraTestProps) {
  const [seleccionada, setSeleccionada] = useState<string | null>(null);

  return (
    <section aria-labelledby="muestra-heading" className="py-12 sm:py-20 bg-white border-t border-slate-100">
      <div className="max-w-xl mx-auto px-6">

        {/* Label superior */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4"
        >
          Probá una pregunta real
        </motion.h2>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-slate-50/60 rounded-[20px] border border-slate-100 p-6 sm:p-8"
          style={{ boxShadow: '0 2px 16px rgba(30,50,80,0.06)' }}
        >
          {/* Pregunta */}
          <p className="font-display font-semibold text-[15px] sm:text-base text-slate-800 leading-snug mb-6">
            Imaginá tu primer día en algo nuevo.
            <br />
            <span className="font-black text-slate-900">¿Qué desafío te entusiasmaría más?</span>
          </p>

          {/* Opciones */}
          <div className="flex flex-col gap-2.5">
            {opciones.map((op) => {
              const activa = seleccionada === op.id;
              return (
                <button
                  key={op.id}
                  onClick={() => setSeleccionada(op.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border font-display text-sm font-medium transition-all duration-150 flex items-start gap-3 ${
                    activa
                      ? 'bg-[#07111F] text-white border-[#07111F]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <span
                    className="font-mono text-[11px] font-bold shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={activa
                      ? { background: '#ccff00', color: '#0d1b2e' }
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

          {/* Microcopy + CTA post-selección */}
          <AnimatePresence>
            {seleccionada && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-6"
              >
                <p className="text-center text-[11px] text-slate-400 font-medium mb-4">
                  Tu respuesta ya empieza a mostrar cómo pensás.
                </p>
                <button
                  onClick={onGetStartedClick}
                  className="w-full py-3.5 bg-[#07111F] text-white font-display text-[14px] font-black tracking-wide rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_10px_28px_rgba(5,8,22,0.18)]"
                >
                  Ver mi resultado completo →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
