import { motion } from 'motion/react';
import MapGlyph from './ui/MapGlyph';

interface CierreCTAProps {
  onGetStartedClick: () => void;
}

export default function CierreCTA({ onGetStartedClick }: CierreCTAProps) {
  return (
    <section
      className="py-14 sm:py-24 relative overflow-hidden"
      style={{ background: '#07111F' }}
    >
      {/* Dot-grid texture — constellation effect on dark bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Lima accent line — top edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#d5ff3f' }} />

      {/* Brand MapGlyph — top right, brand signature */}
      <div className="absolute top-6 right-8 opacity-[0.06] text-white pointer-events-none select-none hidden lg:block">
        <MapGlyph className="w-[260px]" />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(159,210,241,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <p
            className="font-mono font-medium uppercase mb-4 inline-flex items-center gap-2"
            style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(213,255,63,0.75)' }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: '#d5ff3f' }}
            />
            Empezá hoy
          </p>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.1] mb-2">
            7 minutos.
          </h2>

          <p className="font-display text-xl sm:text-2xl font-normal tracking-tight" style={{ color: 'rgba(255,255,255,0.5)' }}>
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
            className="w-full sm:w-auto sm:px-12 py-4 bg-brand-lime text-slate-950 font-display text-base font-black tracking-wide rounded-full hover:bg-white hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_14px_40px_rgba(213,255,63,0.20)]"
          >
            Empezar mi test vocacional
          </button>

          {/* Recordatorio de qué recibe — ancla la decisión */}
          <p
            className="text-[11px] font-medium tracking-wide mt-4"
            style={{ color: 'rgba(255,255,255,0.30)' }}
          >
            Carreras · Universidades · Fortalezas · Próximos pasos
          </p>
        </motion.div>

      </div>
    </section>
  );
}
