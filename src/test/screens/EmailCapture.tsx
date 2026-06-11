import { useState } from 'react';
import { motion } from 'motion/react';
import LogoIcon from '../../components/ui/LogoIcon';
import { INPUT, LABEL, CTA_PRIMARY } from '../ui/theme';

interface EmailCaptureProps {
  onStart: (nombre: string, email: string) => void;
}

export default function EmailCapture({ onStart }: EmailCaptureProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!nombre.trim()) { setError('Escribí tu nombre para continuar.'); return; }
    if (!email.includes('@') || !email.includes('.')) { setError('Ingresá un email válido.'); return; }
    setError('');
    onStart(nombre.trim(), email.trim().toLowerCase());
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10 text-[#07111F]">
          <LogoIcon size={26} />
          <span className="font-display font-bold text-[15px] text-slate-900 tracking-tight">Vocaria</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-[30px] sm:text-[36px] text-slate-900 leading-tight tracking-tight mb-3">
          Antes de empezar,
          <br />
          ¿<span className="underline decoration-brand-lime decoration-[3px] underline-offset-[4px]">cómo te llamás?</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
          Guardamos tu progreso y te enviamos el resultado al mail. Sin spam, prometido.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={LABEL}>Tu nombre</label>
            <input
              type="text"
              placeholder="Ej: Martina"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className={INPUT}
              autoFocus
            />
          </div>
          <div>
            <label className={LABEL}>Tu email</label>
            <input
              type="email"
              placeholder="tucorreo@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={INPUT}
            />
          </div>

          {error && (
            <p className="text-red-500 text-[13px] font-medium">{error}</p>
          )}

          <button
            type="submit"
            className={`w-full py-4 text-[15px] mt-2 ${CTA_PRIMARY}`}
          >
            Empezar el test →
          </button>
        </form>

        {/* Trust */}
        <div className="flex items-center gap-4 mt-6">
          {['~12 min', 'Sin respuestas correctas', 'Resultado gratis'].map(t => (
            <span key={t} className="text-[11px] text-slate-400 font-medium">{t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
