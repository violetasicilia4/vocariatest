import { motion } from 'motion/react';

function NodeMark() {
  return (
    <svg viewBox="0 0 16 16" className="w-3 h-3 shrink-0 mt-0.5" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="4.5" fill="currentColor" className="text-brand-lime" />
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-brand-lime/40" />
    </svg>
  );
}

const bullets = [
  'Cómo pensás y tomás decisiones.',
  'Qué problemas te generan interés real.',
  'Qué contextos podrían encajar con vos.',
];

export default function MetodologiaSection() {
  return (
    <section
      aria-labelledby="metodologia-heading"
      className="py-10 sm:py-14"
      style={{ background: '#F0F5F9' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-start sm:gap-16 gap-6"
        >
          <div className="sm:max-w-xs">
            <h2
              id="metodologia-heading"
              className="font-display font-semibold text-[18px] sm:text-xl text-[#07111F] leading-snug"
            >
              Vocaria no decide por vos. Organiza señales para ayudarte a comparar caminos posibles.
            </h2>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-0.5">
              Qué analiza
            </p>
            {bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <NodeMark />
                <p className="text-sm font-medium text-slate-600 leading-snug">{b}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
