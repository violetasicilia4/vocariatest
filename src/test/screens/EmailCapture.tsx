import { useState } from 'react';
import { motion } from 'motion/react';
import LogoIcon from '../../components/ui/LogoIcon';

interface EmailCaptureProps {
  onStart: (nombre: string, email: string) => void;
}

export default function EmailCapture({ onStart }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError('Ingresá un email válido para continuar.');
      return;
    }
    if (!nombre.trim()) {
      setError('Escribí tu nombre para personalizar el test.');
      return;
    }
    setError('');
    onStart(nombre.trim(), email.trim().toLowerCase());
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <LogoIcon size={26} />
          <span className="font-display font-bold text-[15px] text-slate-900 tracking-tight">Vocaria</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-[30px] sm:text-[36px] text-slate-900 leading-tight tracking-tight mb-2">
          Antes de empezar,
          <br />
          <span className="text-brand-sky">¿cuál es tu mail?</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
          Te enviamos tu resultado ahí. Y si no terminás el test, te guardamos el progreso.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email primero */}
          <div>
            <label className="block text-slate-500 text-[11px] font-bold mb-1.5 tracking-widest uppercase">
              Tu email
            </label>
            <input
              type="email"
              placeholder="tucorreo@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 font-display text-sm focus:outline-none focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/10 transition-all"
            />
          </div>

          {/* Nombre segundo */}
          <div>
            <label className="block text-slate-500 text-[11px] font-bold mb-1.5 tracking-widest uppercase">
              Tu nombre
            </label>
            <input
              type="text"
              placeholder="Ej: Martina"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 font-display text-sm focus:outline-none focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/10 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-500 text-[13px] font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#07111F] text-white font-display font-black text-[15px] tracking-wide hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm mt-2"
          >
            Empezar el test →
          </button>
        </form>

        {/* Trust */}
        <div className="flex items-center gap-5 mt-6 flex-wrap">
          {['~12 minutos', 'Sin respuestas correctas', 'Resultado personalizado'].map(t => (
            <span key={t} className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
