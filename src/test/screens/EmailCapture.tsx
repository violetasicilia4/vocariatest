import { useState } from 'react';
import { motion } from 'motion/react';
import LogoIcon from '../../components/ui/LogoIcon';

interface EmailCaptureProps {
  onStart: (nombre: string, email: string) => void;
}

export default function EmailCapture({ onStart }: EmailCaptureProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) { setError('Escribí tu nombre para continuar.'); return; }
    if (!email.includes('@') || !email.includes('.')) { setError('Ingresá un email válido.'); return; }
    setError('');
    onStart(nombre.trim(), email.trim().toLowerCase());
  };

  return (
    <div className="min-h-screen bg-[#07111F] flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <LogoIcon size={26} />
          <span className="font-display font-bold text-[15px] text-white tracking-tight">Vocaria</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-[30px] sm:text-[36px] text-white leading-tight tracking-tight mb-3">
          Antes de empezar,
          <br />
          <span className="text-brand-lime">¿cómo te llamás?</span>
        </h1>
        <p className="text-white/45 text-sm font-medium leading-relaxed mb-8">
          Guardamos tu progreso y te enviamos el resultado al mail. Sin spam, prometido.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-white/50 text-[12px] font-semibold mb-1.5 tracking-wide uppercase">
              Tu nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Ej: Martina"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/8 border border-white/12 text-white placeholder:text-white/25 font-display text-sm focus:outline-none focus:border-brand-lime/60 focus:bg-white/10 transition-all"
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white/50 text-[12px] font-semibold mb-1.5 tracking-wide uppercase">
              Tu email
            </label>
            <input
              id="email"
              type="email"
              placeholder="tucorreo@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/8 border border-white/12 text-white placeholder:text-white/25 font-display text-sm focus:outline-none focus:border-brand-lime/60 focus:bg-white/10 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-400 text-[13px] font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-brand-lime text-slate-950 font-display font-black text-[15px] tracking-wide hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_8px_32px_rgba(213,255,63,0.25)] mt-2"
          >
            Empezar el test →
          </button>
        </form>

        {/* Trust */}
        <div className="flex items-center gap-4 mt-6">
          {['~12 min', 'Sin respuestas correctas', 'Resultado gratis'].map(t => (
            <span key={t} className="text-[11px] text-white/30 font-medium">{t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
