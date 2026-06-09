import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import LogoIcon from '../../components/ui/LogoIcon';
import { type UserProfile, PROVINCIAS } from '../data/profile';

interface ProfileCaptureProps {
  onStart: (profile: UserProfile) => void;
}

const AGES = Array.from({ length: 37 }, (_, i) => String(i + 14));

const MOVILIDAD_OPTS: { id: UserProfile['movilidad']; emoji: string; titulo: string; sub: string }[] = [
  { id: 'si',   emoji: '✈️', titulo: 'Sí, me mudaría', sub: 'Si encuentro la carrera ideal, sin problema.' },
  { id: 'no',   emoji: '🏠', titulo: 'Prefiero quedarme', sub: 'Necesito estudiar cerca de donde vivo.' },
  { id: 'nose', emoji: '🤔', titulo: 'Todavía no lo sé', sub: 'No quiero comprometerte con eso ahora.' },
];

type Step = 'datos' | 'movilidad';

export default function ProfileCapture({ onStart }: ProfileCaptureProps) {
  const [step, setStep] = useState<Step>('datos');
  const [direction, setDirection] = useState(1);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [provinciaId, setProvinciaId] = useState('');
  const [error, setError] = useState('');

  const handleDatosNext = () => {
    if (!nombre.trim()) { setError('Escribí tu nombre para continuar.'); return; }
    if (!email.includes('@') || !email.includes('.')) { setError('Ingresá un email válido.'); return; }
    if (!edad) { setError('Seleccioná tu edad.'); return; }
    if (!provinciaId) { setError('Seleccioná la provincia donde vivís.'); return; }
    setError('');
    setDirection(1);
    setStep('movilidad');
  };

  const handleMovilidadSelect = (id: UserProfile['movilidad']) => {
    onStart({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      edad,
      provinciaId,
      movilidad: id,
    });
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-[#07111F] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2.5 mb-10">
          <LogoIcon size={26} />
          <span className="font-display font-bold text-[15px] text-white tracking-tight">Vocaria</span>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          <div className={`h-1 rounded-full flex-1 transition-all duration-300 ${step === 'datos' ? 'bg-brand-lime' : 'bg-brand-lime/40'}`} />
          <div className={`h-1 rounded-full flex-1 transition-all duration-300 ${step === 'movilidad' ? 'bg-brand-lime' : 'bg-white/10'}`} />
        </div>

        <AnimatePresence mode="wait" custom={direction}>

          {/* Step 1: Datos personales (todo en una pantalla) */}
          {step === 'datos' && (
            <motion.div
              key="datos"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display font-black text-[28px] sm:text-[34px] text-white leading-tight tracking-tight mb-2">
                Antes de empezar,
                <br />
                <span className="text-brand-lime">contanos sobre vos</span>
              </h1>
              <p className="text-white/40 text-sm font-medium leading-relaxed mb-7">
                Sin spam. Tu resultado llegará a tu mail.
              </p>

              <div className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block text-white/50 text-[11px] font-semibold mb-1.5 tracking-widest uppercase">Nombre</label>
                  <input
                    type="text"
                    placeholder="Ej: Martina"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/8 border border-white/12 text-white placeholder:text-white/25 font-display text-sm focus:outline-none focus:border-brand-lime/60 focus:bg-white/10 transition-all"
                    autoFocus
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/50 text-[11px] font-semibold mb-1.5 tracking-widest uppercase">Email</label>
                  <input
                    type="email"
                    placeholder="tucorreo@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/8 border border-white/12 text-white placeholder:text-white/25 font-display text-sm focus:outline-none focus:border-brand-lime/60 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Edad + Provincia en fila */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/50 text-[11px] font-semibold mb-1.5 tracking-widest uppercase">Edad</label>
                    <div className="relative">
                      <select
                        value={edad}
                        onChange={e => setEdad(e.target.value)}
                        className="w-full px-4 py-3.5 pr-8 rounded-2xl bg-white/8 border border-white/12 text-white font-display text-sm focus:outline-none focus:border-brand-lime/60 appearance-none cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" style={{ background: '#07111F' }}>--</option>
                        {AGES.map(a => (
                          <option key={a} value={a} style={{ background: '#07111F' }}>{a} años</option>
                        ))}
                      </select>
                      <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-[11px] font-semibold mb-1.5 tracking-widest uppercase">Provincia</label>
                    <div className="relative">
                      <select
                        value={provinciaId}
                        onChange={e => setProvinciaId(e.target.value)}
                        className="w-full px-4 py-3.5 pr-8 rounded-2xl bg-white/8 border border-white/12 text-white font-display text-sm focus:outline-none focus:border-brand-lime/60 appearance-none cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" style={{ background: '#07111F' }}>--</option>
                        {PROVINCIAS.map(p => (
                          <option key={p.id} value={p.id} style={{ background: '#07111F' }}>{p.label}</option>
                        ))}
                      </select>
                      <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {error && <p className="text-red-400 text-[13px] font-medium">{error}</p>}

                <button
                  onClick={handleDatosNext}
                  className="w-full py-4 rounded-2xl bg-brand-lime text-slate-950 font-display font-black text-[15px] tracking-wide hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_8px_32px_rgba(213,255,63,0.25)] mt-1"
                >
                  Continuar →
                </button>
              </div>

              <div className="flex items-center gap-4 mt-6">
                {['~12 min', 'Sin respuestas correctas', 'Resultado gratis'].map(t => (
                  <span key={t} className="text-[11px] text-white/25 font-medium">{t}</span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Movilidad */}
          {step === 'movilidad' && (
            <motion.div
              key="movilidad"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display font-black text-[26px] sm:text-[30px] text-white leading-tight tracking-tight mb-2">
                ¿Estarías dispuesto/a a
                <span className="text-brand-lime"> mudarte para estudiar?</span>
              </h1>
              <p className="text-white/40 text-sm font-medium mb-7">
                Lo usamos para recomendarte universidades accesibles para vos.
              </p>

              <div className="space-y-3 mb-6">
                {MOVILIDAD_OPTS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleMovilidadSelect(opt.id)}
                    className="w-full text-left px-5 py-4 rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8 transition-all flex items-center gap-4 active:scale-[0.99]"
                  >
                    <span className="text-2xl shrink-0">{opt.emoji}</span>
                    <div>
                      <p className="font-display font-bold text-[14px] text-white">{opt.titulo}</p>
                      <p className="text-[12px] text-white/40 font-medium mt-0.5">{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => { setDirection(-1); setStep('datos'); }}
                className="text-white/30 hover:text-white/60 text-[13px] font-medium font-display transition-colors"
              >
                ← Anterior
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
