import { motion } from 'motion/react';

interface CierreCTAProps {
  onGetStartedClick: () => void;
}

export default function CierreCTA({ onGetStartedClick }: CierreCTAProps) {
  return (
    <section className="py-14 sm:py-20" style={{ background: '#ffffff' }}>
      {/* Card flotante — mismo estilo que referencia */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] max-w-6xl mx-auto rounded-[24px] sm:rounded-[32px] relative overflow-hidden px-6 sm:px-16 py-12 sm:py-24 text-center"
        style={{ background: '#07111F' }}
      >

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.1] mb-3">
            Unas preguntas.
          </h2>

          <p className="font-display text-xl sm:text-2xl font-normal tracking-tight" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Después, algo se ordena.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <button
            onClick={onGetStartedClick}
            className="w-full sm:w-auto sm:px-14 py-4 bg-brand-lime text-slate-950 font-display text-base font-black tracking-wide rounded-full hover:bg-white hover:text-slate-950 hover:scale-[1.02] active:scale-[0.97] transition-[background-color,color,transform,box-shadow] duration-200 shadow-[0_14px_40px_rgba(213,255,63,0.20)]"
          >
            Empezar mi test vocacional
          </button>

          <p
            className="text-[11px] font-medium tracking-wide mt-4"
            style={{ color: 'rgba(255,255,255,0.30)' }}
          >
            Carreras · Universidades · Fortalezas · Próximos pasos
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
