import { motion } from 'motion/react';

interface IdentificacionSectionProps {
  onGetStartedClick: () => void;
}

const momentos = [
  'Terminás el secundario con cinco carreras posibles.',
  'Empezaste algo y algo no cierra.',
  'Tenés una dirección, pero ninguna carrera concreta.',
];

export default function IdentificacionSection({ onGetStartedClick }: IdentificacionSectionProps) {
  return (
    <section className="py-14 sm:py-20" style={{ background: '#0e1118' }}>
      <div className="max-w-5xl mx-auto px-6">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[11px] font-bold tracking-widest uppercase mb-8 sm:mb-10"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          ¿Estás en alguno de estos momentos?
        </motion.p>

        <div className="flex flex-col divide-y divide-white/10">
          {momentos.map((texto, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="font-display font-bold text-[20px] sm:text-[26px] text-white tracking-tight leading-snug py-5 sm:py-6"
            >
              {texto}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="mt-10 sm:mt-12"
        >
          <button
            onClick={onGetStartedClick}
            className="w-full sm:w-auto sm:px-10 py-4 bg-brand-lime text-slate-950 font-display font-black text-[14px] tracking-wide rounded-full hover:bg-white hover:scale-[1.02] active:scale-[0.97] transition-[background-color,transform] duration-200"
          >
            Empezar mi test
          </button>
        </motion.div>

      </div>
    </section>
  );
}
