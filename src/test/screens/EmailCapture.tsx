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
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-9 text-ink">
          <LogoIcon size={24} />
          <span className="font-display font-bold text-[15px] tracking-tight">Vocaria</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-[30px] sm:text-[36px] text-ink leading-[1.06] tracking-tight mb-3">
          Antes de empezar, ¿cómo te llamás?
        </h1>
        <p className="text-ink/55 text-[14px] font-medium leading-relaxed mb-8">
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
            <p className="text-red-500 text-[13px] font-semibold">{error}</p>
          )}

          <button
            type="submit"
            className={`w-full py-4 text-[15px] mt-2 ${CTA_PRIMARY}`}
          >
            Empezar el test
          </button>
        </form>

        {/* Trust */}
        <div className="flex items-center gap-3 mt-6 flex-wrap">
          {['Situaciones reales', 'Sin respuestas correctas', 'Resultado personalizado'].map(t => (
            <span key={t} className="text-[11px] text-ink/40 font-medium flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-brand-sky/60" />
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
