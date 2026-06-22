import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronLeft, ArrowRight, Plane, House, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import LogoIcon from '../../components/ui/LogoIcon';
import { type UserProfile, PROVINCIAS } from '../data/profile';
import { INPUT, LABEL, CTA_PRIMARY, OPTION_IDLE, EASE } from '../ui/theme';
import { captureLead } from '../../services/leads';

interface ProfileCaptureProps {
  onStart: (profile: UserProfile) => void;
}

// Edad mínima: 16. Vocaria es para personas que eligen carrera y, por base
// legal de consentimiento, no recolectamos datos de menores de 16.
const MIN_AGE = 16;
const AGES = Array.from({ length: 50 - MIN_AGE + 1 }, (_, i) => String(i + MIN_AGE));

const MOVILIDAD_OPTS: { id: UserProfile['movilidad']; icon: LucideIcon; titulo: string; sub: string }[] = [
  { id: 'si',   icon: Plane,      titulo: 'Sí, me mudaría',      sub: 'Si encuentro la carrera ideal, sin problema.' },
  { id: 'no',   icon: House,      titulo: 'Prefiero quedarme',   sub: 'Necesito estudiar cerca de donde vivo.' },
  { id: 'nose', icon: HelpCircle, titulo: 'Todavía no lo sé',    sub: 'No quiero comprometerme con eso ahora.' },
];

type Step = 'datos' | 'movilidad';

export default function ProfileCapture({ onStart }: ProfileCaptureProps) {
  const [step, setStep] = useState<Step>('datos');
  const [direction, setDirection] = useState(1);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [provinciaId, setProvinciaId] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  const handleDatosNext = () => {
    if (!nombre.trim()) { setError('Escribí tu nombre para continuar.'); return; }
    if (!email.includes('@') || !email.includes('.')) { setError('Ingresá un email válido.'); return; }
    if (!edad) { setError('Seleccioná tu edad.'); return; }
    if (Number(edad) < MIN_AGE) { setError(`Vocaria está disponible para personas de ${MIN_AGE} años o más.`); return; }
    if (!provinciaId) { setError('Seleccioná la provincia donde vivís.'); return; }
    if (!consent) { setError('Necesitamos tu confirmación de edad y consentimiento para continuar.'); return; }
    setError('');
    // Captura el lead apenas tenemos los datos (no esperamos a que termine el test).
    void captureLead({
      email: email.trim().toLowerCase(),
      nombre: nombre.trim(),
      source: 'test_start',
      edad,
      provincia_id: provinciaId,
      consent: true,
    });
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
    enter: (dir: number) => ({ x: dir > 0 ? 28 : -28, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -28 : 28, opacity: 0 }),
  };

  return (
    // Mobile: una sola columna. Desktop: split-screen — panel de marca a la
    // izquierda + formulario a la derecha (patrón de onboarding premium), para
    // que ocupe la pantalla en vez de quedar como un celular centrado.
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-2">

      {/* Panel de marca — solo desktop */}
      <aside className="hidden lg:flex flex-col justify-between bg-ink text-white p-12 xl:p-16 relative overflow-hidden">
        {/* Acentos sutiles de marca */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-sky/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-brand-lime/10 blur-3xl" />

        <div className="relative flex items-center gap-2.5">
          <LogoIcon size={26} />
          <span className="font-display font-bold text-[16px] tracking-tight">Vocaria</span>
        </div>

        <div className="relative max-w-md">
          <h2 className="font-display font-black text-[34px] xl:text-[40px] leading-[1.08] tracking-tight mb-5">
            La carrera correcta no se adivina. Se descubre.
          </h2>
          <p className="text-white/65 text-[15px] leading-relaxed font-medium">
            Un test basado en situaciones reales que detecta tu patrón de pensamiento
            y lo cruza con carreras universitarias argentinas.
          </p>
        </div>

        <div className="relative space-y-3">
          {[
            'Situaciones reales, no preguntas abstractas',
            'Sin respuestas correctas ni incorrectas',
            'Tu resultado, gratis y al instante',
          ].map(t => (
            <div key={t} className="flex items-center gap-3 text-white/75 text-[13.5px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
              {t}
            </div>
          ))}
        </div>
      </aside>

      {/* Formulario */}
      <div className="flex flex-col items-center justify-center px-5 py-12 lg:px-12 xl:px-20">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2.5 mb-9 text-ink lg:hidden">
          <LogoIcon size={24} />
          <span className="font-display font-bold text-[15px] tracking-tight">Vocaria</span>
        </div>

        {/* Progreso del onboarding */}
        <div className="flex gap-1.5 mb-9">
          <div className={`h-[5px] rounded-full flex-1 transition-all duration-400 ${step === 'datos' ? 'bg-brand-sky' : 'bg-brand-sky/40'}`} />
          <div className={`h-[5px] rounded-full flex-1 transition-all duration-400 ${step === 'movilidad' ? 'bg-brand-sky' : 'bg-line'}`} />
        </div>

        <AnimatePresence mode="wait" custom={direction}>

          {/* Paso 1: Datos */}
          {step === 'datos' && (
            <motion.div
              key="datos"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: EASE }}
            >
              <h1 className="font-display font-black text-[31px] sm:text-[37px] text-ink leading-[1.06] tracking-tight mb-3">
                Antes de empezar,<br />contanos sobre vos
              </h1>
              <p className="text-ink/55 text-[14px] font-medium leading-relaxed mb-8">
                Sin spam. Tu resultado va a llegar a tu mail.
              </p>

              <div className="space-y-4">
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL}>Edad</label>
                    <div className="relative">
                      <select
                        value={edad}
                        onChange={e => setEdad(e.target.value)}
                        className={`${INPUT} pr-9 appearance-none cursor-pointer`}
                      >
                        <option value="">--</option>
                        {AGES.map(a => <option key={a} value={a}>{a} años</option>)}
                      </select>
                      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>Provincia</label>
                    <div className="relative">
                      <select
                        value={provinciaId}
                        onChange={e => setProvinciaId(e.target.value)}
                        className={`${INPUT} pr-9 appearance-none cursor-pointer`}
                      >
                        <option value="">--</option>
                        {PROVINCIAS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                      </select>
                      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 shrink-0 accent-sky-deep cursor-pointer"
                  />
                  <span className="text-[12px] text-ink/50 leading-snug">
                    Confirmo que tengo 16 años o más y acepto los{' '}
                    <a href="/terminos" target="_blank" rel="noopener noreferrer" className="text-ink/70 font-semibold underline">
                      Términos
                    </a>{' '}y la{' '}
                    <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-ink/70 font-semibold underline">
                      Política de Privacidad
                    </a>.
                  </span>
                </label>

                {error && <p className="text-red-500 text-[13px] font-semibold">{error}</p>}

                <button
                  onClick={handleDatosNext}
                  className={`w-full py-4 text-[15px] mt-1 flex items-center justify-center gap-2 ${CTA_PRIMARY}`}
                >
                  Continuar
                  <ArrowRight size={17} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex items-center gap-3 mt-6 flex-wrap">
                {['Situaciones reales', 'Sin respuestas correctas', 'Resultado gratis'].map(t => (
                  <span key={t} className="text-[11px] text-ink/40 font-medium flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand-sky/60" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Paso 2: Movilidad */}
          {step === 'movilidad' && (
            <motion.div
              key="movilidad"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: EASE }}
            >
              <h1 className="font-display font-black text-[28px] sm:text-[33px] text-ink leading-[1.1] tracking-tight mb-3">
                ¿Estarías dispuesto/a a mudarte para estudiar?
              </h1>
              <p className="text-ink/55 text-[14px] font-medium mb-8 leading-relaxed">
                Lo usamos para recomendarte universidades accesibles para vos.
              </p>

              <div className="space-y-3 mb-7">
                {MOVILIDAD_OPTS.map(opt => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleMovilidadSelect(opt.id)}
                      className={`w-full text-left px-5 py-4 rounded-[20px] border transition-all duration-200 flex items-center gap-4 active:scale-[0.99] ${OPTION_IDLE}`}
                    >
                      <span className="shrink-0 w-11 h-11 rounded-2xl bg-sky-soft text-sky-deep flex items-center justify-center">
                        <Icon size={20} strokeWidth={1.9} />
                      </span>
                      <div>
                        <p className="font-display font-bold text-[14.5px] text-ink">{opt.titulo}</p>
                        <p className="text-[12.5px] text-ink/55 font-medium mt-0.5">{opt.sub}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => { setDirection(-1); setStep('datos'); }}
                className="text-ink/40 hover:text-ink text-[13px] font-medium font-display transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={15} strokeWidth={2.4} />
                Anterior
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}
