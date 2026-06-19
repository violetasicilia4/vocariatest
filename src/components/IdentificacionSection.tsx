import { motion } from 'motion/react';

interface IdentificacionSectionProps {
  onGetStartedClick: () => void;
}

const bullets = [
  'Tenés varias carreras posibles y no sabés cuál elegir.',
  'Empezaste algo y no termina de cerrar.',
  'Tenés una dirección, pero ninguna carrera concreta.',
];

export default function IdentificacionSection({ onGetStartedClick }: IdentificacionSectionProps) {
  return (
    <section style={{ background: '#07111F' }}>
      <div className="max-w-5xl mx-auto px-6 py-10 sm:py-14">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-16"
        >
          {/* Izquierda: eyebrow + título */}
          <div className="shrink-0">
            <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
              ¿Te pasa alguna de estas?
            </p>
            <h2 className="font-display font-black text-[22px] sm:text-[26px] text-white tracking-tight leading-[1.1]">
              Este test<br />es para vos.
            </h2>
          </div>

          {/* Derecha: bullets + CTA */}
          <div className="flex flex-col gap-4 flex-1">
            <ul className="flex flex-col gap-2.5">
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-brand-lime/15 flex items-center justify-center">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l2 2 4-4" stroke="#d5ff3f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-[13px] sm:text-[14px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    {b}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.22 }}
              onClick={onGetStartedClick}
              className="w-full sm:w-fit sm:px-8 py-3 bg-brand-lime text-slate-950 font-display font-black text-[13px] tracking-wide rounded-full hover:bg-white hover:scale-[1.02] active:scale-[0.97] transition-[background-color,transform] duration-200 mt-1"
            >
              Empezar mi test
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
