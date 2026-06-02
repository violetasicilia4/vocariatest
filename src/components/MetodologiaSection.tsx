import { motion } from 'motion/react';

const senales = [
  {
    titulo: 'Tu forma de procesar información',
    desc: 'Si preferís estructurar, crear, resolver o conectar ideas con personas.',
  },
  {
    titulo: 'Qué problemas te generan interés real',
    desc: 'Los escenarios donde naturalmente querés profundizar o explorar.',
  },
  {
    titulo: 'En qué entornos podrías crecer',
    desc: 'El ritmo, la autonomía y el tipo de trabajo que se alinea con vos.',
  },
  {
    titulo: 'Qué carreras encajan con tu perfil',
    desc: 'Más de 130 opciones reales cruzadas con universidades y salida laboral.',
  },
];

function NodeMark() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="4.5" fill="currentColor" className="text-brand-lime" />
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-brand-lime/40" />
    </svg>
  );
}

export default function MetodologiaSection() {
  return (
    <section
      aria-labelledby="metodologia-heading"
      className="py-12 sm:py-16"
      style={{ background: '#F0F5F9' }}
    >
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {/* ── HEADER ─────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                Metodología
              </p>
              <h2
                id="metodologia-heading"
                className="font-display font-black text-xl sm:text-2xl text-[#0e1118] tracking-tight leading-tight"
              >
                Qué analiza Vocaria.
              </h2>
            </div>
            <p className="text-[13px] text-slate-500 font-medium leading-relaxed sm:max-w-xs sm:text-right">
              No es un test de personalidad. No diagnostica ni etiqueta. Es un mapa inicial para ordenar una decisión importante.
            </p>
          </div>

          {/* ── 4 SEÑALES ──────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200/60 rounded-2xl overflow-hidden border border-slate-200/80">
            {senales.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white px-5 py-5 flex flex-col gap-2.5"
              >
                <NodeMark />
                <p className="font-display font-bold text-[13px] text-slate-800 leading-snug">
                  {s.titulo}
                </p>
                <p className="text-[12px] text-slate-400 font-medium leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── DISCLAIMER ─────────────────────────────── */}
          <p className="text-[11px] text-slate-400 font-medium mt-4 text-center sm:text-left">
            Vocaria no reemplaza un proceso de orientación vocacional profesional.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
