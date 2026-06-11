import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import LogoIcon from '../../components/ui/LogoIcon';
import { type UserProfile, PROVINCIAS } from '../data/profile';
import { INPUT, LABEL, CTA_PRIMARY, OPTION_IDLE } from '../ui/theme';

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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2.5 mb-10 text-[#07111F]">
          <LogoIcon size={26} />
          <span className="font-display font-bold text-[15px] text-slate-900 tracking-tight">Vocaria</span>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          <div className={`h-1 rounded-full flex-1 transition-all duration-300 ${step === 'datos' ? 'bg-brand-lime' : 'bg-brand-lime/40'}`} />
          <div className={`h-1 rounded-full flex-1 transition-all duration-300 ${step === 'movilidad' ? 'bg-brand-lime' : 'bg-slate-200'}`} />
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
              <h1 className="font-display font-black text-[28px] sm:text-[34px] text-slate-900 leading-tight tracking-tight mb-2">
                Antes de empezar,
                <br />
                contanos <span className="underline decoration-brand-lime decoration-[3px] underline-offset-[4px]">sobre vos</span>
              </h1>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-7">
                Sin spam. Tu resultado llegará a tu mail.
              </p>

              <div className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className={LABEL}>Nombre</label>
                  <input
                    type="text"
                    placeholder="Ej: Martina"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className={INPUT}
                    autoFocus
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={LABEL}>Email</label>
                  <input
                    type="email"
                    placeholder="tucorreo@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={INPUT}
                  />
                </div>

                {/* Edad + Provincia en fila */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL}>Edad</label>
                    <div className="relative">
                      <select
                        value={edad}
                        onChange={e => setEdad(e.target.value)}
                        className={`${INPUT} pr-8 appearance-none cursor-pointer`}
                      >
                        <option value="">--</option>
                        {AGES.map(a => (
                          <option key={a} value={a}>{a} años</option>
                        ))}
                      </select>
                      <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>Provincia</label>
                    <div className="relative">
                      <select
                        value={provinciaId}
                        onChange={e => setProvinciaId(e.target.value)}
                        className={`${INPUT} pr-8 appearance-none cursor-pointer`}
                      >
                        <option value="">--</option>
                        {PROVINCIAS.map(p => (
                          <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                      </select>
                      <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {error && <p className="text-red-500 text-[13px] font-medium">{error}</p>}

                <button
                  onClick={handleDatosNext}
                  className={`w-full py-4 text-[15px] mt-1 ${CTA_PRIMARY}`}
                >
                  Continuar →
                </button>
              </div>

              <div className="flex items-center gap-4 mt-6">
                {['~12 min', 'Sin respuestas correctas', 'Resultado gratis'].map(t => (
                  <span key={t} className="text-[11px] text-slate-400 font-medium">{t}</span>
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
              <h1 className="font-display font-black text-[26px] sm:text-[30px] text-slate-900 leading-tight tracking-tight mb-2">
                ¿Estarías dispuesto/a a
                <span className="underline decoration-brand-lime decoration-[3px] underline-offset-[4px]"> mudarte para estudiar?</span>
              </h1>
              <p className="text-slate-500 text-sm font-medium mb-7">
                Lo usamos para recomendarte universidades accesibles para vos.
              </p>

              <div className="space-y-3 mb-6">
                {MOVILIDAD_OPTS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleMovilidadSelect(opt.id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border transition-all flex items-center gap-4 active:scale-[0.99] ${OPTION_IDLE}`}
                  >
                    <span className="text-2xl shrink-0">{opt.emoji}</span>
                    <div>
                      <p className="font-display font-bold text-[14px] text-slate-900">{opt.titulo}</p>
                      <p className="text-[12px] text-slate-500 font-medium mt-0.5">{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => { setDirection(-1); setStep('datos'); }}
                className="text-slate-400 hover:text-slate-700 text-[13px] font-medium font-display transition-colors"
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
