import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    pregunta: '¿Para quién es Vocaria?',
    respuesta: 'Para cualquier persona que esté eligiendo carrera, dudando entre opciones, o evaluando un cambio. Funciona para quienes terminan el secundario, para quienes ya empezaron una carrera y no están seguros, y para quienes quieren validar una decisión.',
  },
  {
    pregunta: '¿Cuánto tiempo lleva?',
    respuesta: 'Entre 5 y 7 minutos. Las preguntas son situacionales y no tienen respuestas correctas.',
  },
  {
    pregunta: '¿El resultado me dice exactamente qué estudiar?',
    respuesta: 'No. Te muestra tu patrón y las carreras que más encajan con cómo pensás. La decisión sigue siendo tuya.',
  },
];

export default function FAQSection() {
  const [abierta, setAbierta] = useState<number | null>(null);

  const toggle = (i: number) => setAbierta(abierta === i ? null : i);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-10 sm:py-16" style={{ background: '#F8FAFC' }}>
      <div className="max-w-2xl mx-auto px-6">

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.pregunta,
                acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
              })),
            }),
          }}
        />

        <motion.h2
          id="faq-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-display font-black text-2xl sm:text-3xl text-[#0e1118] tracking-tight leading-tight mb-8"
        >
          Preguntas frecuentes.
        </motion.h2>

        <div className="divide-y divide-slate-200">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
              >
                <span className={`font-display font-semibold text-[15px] sm:text-base leading-snug transition-colors duration-150 ${abierta === i ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                  {faq.pregunta}
                </span>
                <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${abierta === i ? 'bg-[#07111F] border-[#07111F]' : 'border-slate-300 group-hover:border-slate-500'}`}>
                  <svg viewBox="0 0 10 10" className={`w-2.5 h-2.5 transition-transform duration-200 ${abierta === i ? 'rotate-45' : ''}`} fill="none">
                    <line x1="5" y1="1" x2="5" y2="9" stroke={abierta === i ? '#d5ff3f' : '#94a3b8'} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="1" y1="5" x2="9" y2="5" stroke={abierta === i ? '#d5ff3f' : '#94a3b8'} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {abierta === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed pb-5 font-medium">
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
