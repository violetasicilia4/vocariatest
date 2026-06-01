import { motion } from 'motion/react';

interface CierreCTAProps {
  onGetStartedClick: () => void;
}

export default function CierreCTA({ onGetStartedClick }: CierreCTAProps) {
  return (
    <section
      className="py-14 sm:py-24 relative overflow-hidden"
      style={{ background: '#07111F' }}
    >
      {/* Línea de acento lima en el borde superior */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#ccff00' }} />

      {/* Glow sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(159,210,241,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          {/* Label "Empezá hoy" */}
          <p className="font-medium uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(204,255,0,0.7)' }}>
            Empezá hoy
          </p>

          {/* Headline principal */}
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.1] mb-2">
            7 minutos.
          </h2>

          {/* Subtítulo secundario */}
          <p className="font-display text-xl sm:text-2xl font-normal tracking-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Un resultado que tiene lógica detrás.
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
            className="w-full sm:w-auto sm:px-12 py-4 bg-[#07111F] text-white font-display text-base font-black tracking-wide rounded-full hover:bg-brand-lime hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_14px_40px_rgba(5,8,22,0.30)] border border-white/10"
          >
            Empezar mi test vocacional
          </button>
        </motion.div>

      </div>
    </section>
  );
}
