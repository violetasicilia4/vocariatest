import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    pregunta: '¿Cuánto tiempo me lleva?',
    respuesta:
      'Entre 5 y 7 minutos. Las preguntas son situacionales y no tienen respuestas correctas.',
  },
  {
    pregunta: '¿Sirve si ya empecé una carrera y tengo dudas?',
    respuesta:
      'Sí. Muchos usuarios llegan habiendo empezado algo que no les cierra. El resultado te ayuda a entender si el problema es la carrera, la institución, o si necesitás más información para decidir.',
  },
  {
    pregunta: '¿Vocaria me dice exactamente qué estudiar?',
    respuesta:
      'No. Te muestra tu patrón de pensamiento y las carreras que más encajan con cómo sos. La decisión sigue siendo tuya.',
  },
  {
    pregunta: '¿Es mejor que ir a una orientación vocacional tradicional?',
    respuesta:
      'No reemplaza un proceso de orientación completo. Pero si todavía no estás seguro de si necesitás uno, Vocaria te da un mapa inicial. Muchos usuarios lo usan como primer paso antes de decidir si quieren ir más lejos.',
  },
];

export default function FAQSection() {
  const [abierta, setAbierta] = useState<number | null>(null);

  const toggle = (i: number) => setAbierta(abierta === i ? null : i);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-14 sm:py-24" style={{ background: '#F9F8F6' }}>
      <div className="max-w-2xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="faq-heading"
          className="font-display font-extrabold text-2xl sm:text-3xl text-[#0e1118] tracking-tight mb-8"
        >
          Preguntas frecuentes
        </motion.h2>

        {/* Structured data para FAQPage (Google rich results) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.pregunta,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.respuesta,
                },
              })),
            }),
          }}
        />

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
              >
                <span className={`font-display font-semibold text-[15px] sm:text-base leading-snug transition-colors duration-150 ${abierta === i ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  {faq.pregunta}
                </span>
                <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${abierta === i ? 'bg-[#07111F] border-[#07111F]' : 'border-slate-300 group-hover:border-slate-500'}`}>
                  <svg viewBox="0 0 10 10" className={`w-2.5 h-2.5 transition-transform duration-200 ${abierta === i ? 'rotate-45' : ''}`} fill="none">
                    <line x1="5" y1="1" x2="5" y2="9" stroke={abierta === i ? '#D8F95C' : '#94a3b8'} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="1" y1="5" x2="9" y2="5" stroke={abierta === i ? '#D8F95C' : '#94a3b8'} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {abierta === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed pb-5 max-w-lg font-medium">
                      {faq.respuesta}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
