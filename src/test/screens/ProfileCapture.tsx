import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import LogoIcon from '../../components/ui/LogoIcon';
import { type UserProfile, PROVINCIAS } from '../data/profile';

interface ProfileCaptureProps {
  onStart: (profile: UserProfile) => void;
}

const EDADES = [
  { id: '14-16', label: '14–16 años' },
  { id: '17-18', label: '17–18 años' },
  { id: '19-21', label: '19–21 años' },
  { id: '22-25', label: '22–25 años' },
  { id: '26+',   label: '26 o más' },
];

const MOVILIDAD_OPTS = [
  { id: 'si',      emoji: '✈️', titulo: 'Sí, me mudaría', sub: 'Si encuentro la carrera ideal, sin problema.' },
  { id: 'no',      emoji: '🏠', titulo: 'Prefiero quedarme', sub: 'Necesito estudiar cerca de donde vivo.' },
  { id: 'virtual', emoji: '💻', titulo: 'Online / híbrido', sub: 'Busco opciones virtuales o semipresenciales.' },
];

type Step = 'nameEmail' | 'ageProvincia' | 'movilidad' | 'destinos';

export default function ProfileCapture({ onStart }: ProfileCaptureProps) {
  const [step, setStep] = useState<Step>('nameEmail');
  const [direction, setDirection] = useState(1);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [provinciaId, setProvinciaId] = useState('');
  const [movilidad, setMovilidad] = useState<UserProfile['movilidad'] | ''>('');
  const [provinciasDestino, setProvinciasDestino] = useState<string[]>([]);
  const [error, setError] = useState('');

  const go = (next: Step) => {
    setDirection(1);
    setError('');
    setStep(next);
  };

  const goBack = (prev: Step) => {
    setDirection(-1);
    setError('');
    setStep(prev);
  };

  const handleNameEmailNext = () => {
    if (!nombre.trim()) { setError('Escribí tu nombre para continuar.'); return; }
    if (!email.includes('@') || !email.includes('.')) { setError('Ingresá un email válido.'); return; }
    go('ageProvincia');
  };

  const handleAgeProvinciaNext = () => {
    if (!edad) { setError('Seleccioná tu rango de edad.'); return; }
    if (!provinciaId) { setError('Seleccioná la provincia donde vivís.'); return; }
    go('movilidad');
  };

  const handleMovilidadSelect = (id: UserProfile['movilidad']) => {
    setMovilidad(id);
    if (id === 'si') {
      setDirection(1);
      setStep('destinos');
    } else {
      onStart({
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        edad,
        provinciaId,
        movilidad: id,
        provinciasDestino: [],
      });
    }
  };

  const toggleDestino = (id: string) => {
    setProvinciasDestino(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleDestinosConfirm = () => {
    if (provinciasDestino.length === 0) { setError('Seleccioná al menos una provincia.'); return; }
    onStart({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      edad,
      provinciaId,
      movilidad: 'si',
      provinciasDestino,
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

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-8">
          {(['nameEmail', 'ageProvincia', 'movilidad'] as Step[]).map((s, i) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all duration-300 ${
                step === s || (step === 'destinos' && s === 'movilidad')
                  ? 'bg-brand-lime flex-1'
                  : ['nameEmail', 'ageProvincia', 'movilidad'].indexOf(step) > i || step === 'destinos'
                  ? 'bg-brand-lime/40 flex-1'
                  : 'bg-white/10 flex-1'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 0: Name + Email */}
          {step === 'nameEmail' && (
            <motion.div
              key="nameEmail"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display font-black text-[30px] sm:text-[36px] text-white leading-tight tracking-tight mb-3">
                Antes de empezar,
                <br />
                <span className="text-brand-lime">¿cómo te llamás?</span>
              </h1>
              <p className="text-white/45 text-sm font-medium leading-relaxed mb-8">
                Guardamos tu progreso y te enviamos el resultado al mail. Sin spam.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/50 text-[12px] font-semibold mb-1.5 tracking-wide uppercase">Tu nombre</label>
                  <input
                    type="text"
                    placeholder="Ej: Martina"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleNameEmailNext()}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/8 border border-white/12 text-white placeholder:text-white/25 font-display text-sm focus:outline-none focus:border-brand-lime/60 focus:bg-white/10 transition-all"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-[12px] font-semibold mb-1.5 tracking-wide uppercase">Tu email</label>
                  <input
                    type="email"
                    placeholder="tucorreo@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleNameEmailNext()}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/8 border border-white/12 text-white placeholder:text-white/25 font-display text-sm focus:outline-none focus:border-brand-lime/60 focus:bg-white/10 transition-all"
                  />
                </div>
                {error && <p className="text-red-400 text-[13px] font-medium">{error}</p>}
                <button
                  onClick={handleNameEmailNext}
                  className="w-full py-4 rounded-2xl bg-brand-lime text-slate-950 font-display font-black text-[15px] tracking-wide hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_8px_32px_rgba(213,255,63,0.25)] mt-2"
                >
                  Siguiente →
                </button>
              </div>
              <div className="flex items-center gap-4 mt-6">
                {['~12 min', 'Sin respuestas correctas', 'Resultado gratis'].map(t => (
                  <span key={t} className="text-[11px] text-white/30 font-medium">{t}</span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Age + Province */}
          {step === 'ageProvincia' && (
            <motion.div
              key="ageProvincia"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display font-black text-[28px] sm:text-[32px] text-white leading-tight tracking-tight mb-6">
                Contanos un poco<br />
                <span className="text-brand-lime">sobre vos, {nombre.split(' ')[0]}</span>
              </h1>

              {/* Age */}
              <div className="mb-6">
                <p className="text-white/50 text-[12px] font-semibold mb-3 tracking-wide uppercase">¿Cuántos años tenés?</p>
                <div className="flex flex-wrap gap-2">
                  {EDADES.map(e => (
                    <button
                      key={e.id}
                      onClick={() => setEdad(e.id)}
                      className={`px-4 py-2.5 rounded-xl font-display text-[13px] font-semibold transition-all border ${
                        edad === e.id
                          ? 'bg-brand-lime text-slate-950 border-brand-lime'
                          : 'bg-white/6 text-white/60 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Province */}
              <div className="mb-6">
                <p className="text-white/50 text-[12px] font-semibold mb-3 tracking-wide uppercase">¿En qué provincia vivís?</p>
                <div className="relative">
                  <select
                    value={provinciaId}
                    onChange={e => setProvinciaId(e.target.value)}
                    className="w-full px-4 py-3.5 pr-10 rounded-2xl bg-white/8 border border-white/12 text-white font-display text-sm focus:outline-none focus:border-brand-lime/60 appearance-none cursor-pointer"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" style={{ background: '#07111F' }}>Seleccioná tu provincia…</option>
                    {PROVINCIAS.map(p => (
                      <option key={p.id} value={p.id} style={{ background: '#07111F' }}>{p.label}</option>
                    ))}
                  </select>
                  <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 rotate-90 pointer-events-none" />
                </div>
              </div>

              {error && <p className="text-red-400 text-[13px] font-medium mb-3">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => goBack('nameEmail')}
                  className="px-5 py-4 rounded-2xl bg-white/6 text-white/40 font-display font-bold text-[14px] hover:bg-white/10 transition-all"
                >
                  ←
                </button>
                <button
                  onClick={handleAgeProvinciaNext}
                  className="flex-1 py-4 rounded-2xl bg-brand-lime text-slate-950 font-display font-black text-[15px] tracking-wide hover:brightness-105 active:scale-[0.98] transition-all"
                >
                  Siguiente →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Mobility */}
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
              <h1 className="font-display font-black text-[28px] sm:text-[32px] text-white leading-tight tracking-tight mb-2">
                ¿Estarías dispuesto/a a
                <span className="text-brand-lime"> mudarte para estudiar?</span>
              </h1>
              <p className="text-white/40 text-sm font-medium mb-7">
                Lo usamos para recomendarte universidades accesibles.
              </p>

              <div className="space-y-3 mb-6">
                {MOVILIDAD_OPTS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleMovilidadSelect(opt.id as UserProfile['movilidad'])}
                    className={`w-full text-left px-5 py-4 rounded-2xl border transition-all flex items-center gap-4 ${
                      movilidad === opt.id
                        ? 'border-brand-lime/60 bg-brand-lime/10'
                        : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <div>
                      <p className="font-display font-bold text-[14px] text-white">{opt.titulo}</p>
                      <p className="text-[12px] text-white/40 font-medium mt-0.5">{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => goBack('ageProvincia')}
                className="text-white/30 hover:text-white/60 text-[13px] font-medium font-display transition-colors flex items-center gap-1.5"
              >
                ← Anterior
              </button>
            </motion.div>
          )}

          {/* Step 3: Destinos (if si) */}
          {step === 'destinos' && (
            <motion.div
              key="destinos"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display font-black text-[26px] sm:text-[30px] text-white leading-tight tracking-tight mb-2">
                ¿A qué provincias<span className="text-brand-lime"> irías?</span>
              </h1>
              <p className="text-white/40 text-sm font-medium mb-6">
                Seleccioná todas las que aplicuen. Incluimos tu provincia de origen.
              </p>

              <div className="flex flex-wrap gap-2 mb-6 max-h-64 overflow-y-auto pr-1">
                {PROVINCIAS.filter(p => p.id !== provinciaId).map(p => {
                  const active = provinciasDestino.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleDestino(p.id)}
                      className={`px-3.5 py-2 rounded-xl font-display text-[12px] font-semibold transition-all border ${
                        active
                          ? 'bg-brand-lime text-slate-950 border-brand-lime'
                          : 'bg-white/6 text-white/55 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>

              {error && <p className="text-red-400 text-[13px] font-medium mb-3">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => goBack('movilidad')}
                  className="px-5 py-4 rounded-2xl bg-white/6 text-white/40 font-display font-bold text-[14px] hover:bg-white/10 transition-all"
                >
                  ←
                </button>
                <button
                  onClick={handleDestinosConfirm}
                  disabled={provinciasDestino.length === 0}
                  className="flex-1 py-4 rounded-2xl bg-brand-lime text-slate-950 font-display font-black text-[15px] tracking-wide hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Empezar el test →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
