import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Plane, House, HelpCircle } from 'lucide-react';
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

// Validación de email razonable (no acepta "a@.b" ni dobles puntos), suficiente
// para frenar tipeos y basura sin pretender validar la existencia del buzón.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

type Step = 'datos' | 'movilidad';

// Eyebrow + barra segmentada de progreso. Se reutiliza en el panel de marca
// (desktop) y arriba del formulario (mobile), siempre con el mismo estado.
function Progress({ step, dark = false }: { step: Step; dark?: boolean }) {
  const idx = step === 'datos' ? 0 : 1;
  return (
    <div>
      <span
        className={`block text-[11px] font-bold uppercase tracking-[0.14em] mb-2.5 ${
          dark ? 'text-white/55' : 'text-ink/45'
        }`}
      >
        Paso {idx + 1} de 2
      </span>
      <div className="flex gap-1.5">
        <div
          className={`h-[5px] rounded-full flex-1 transition-all duration-500 ${
            step === 'datos' ? 'bg-brand-sky' : dark ? 'bg-brand-sky/50' : 'bg-brand-sky/40'
          }`}
        />
        <div
          className={`h-[5px] rounded-full flex-1 transition-all duration-500 ${
            step === 'movilidad' ? 'bg-brand-sky' : dark ? 'bg-white/15' : 'bg-line'
          }`}
        />
      </div>
    </div>
  );
}

export default function ProfileCapture({ onStart }: ProfileCaptureProps) {
  const [step, setStep] = useState<Step>('datos');
  const [direction, setDirection] = useState(1);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [provinciaId, setProvinciaId] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  // Honeypot anti-bot: campo oculto que un humano nunca completa. Si llega con
  // valor, es casi seguro un bot → cortamos sin capturar el lead.
  const [website, setWebsite] = useState('');

  const handleDatosNext = () => {
    if (website) return; // bot detectado (honeypot)
    if (!nombre.trim()) { setError('Escribí tu nombre para continuar.'); return; }
    if (!EMAIL_RE.test(email.trim())) { setError('Ingresá un email válido.'); return; }
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
    // Una sola columna centrada (mobile y desktop). El ancho del contenido se
    // mantiene acotado a propósito: ensanchar los inputs los vuelve incómodos.
    // La presencia en desktop viene de centrar bien el bloque y de la escala
    // tipográfica, no de un panel lateral.
    //
    // La raíz está fijada a la altura del viewport con overflow-hidden: así NUNCA
    // genera el scroll fantasma (el padre es `fixed inset-0 overflow-y-auto`, y un
    // hijo con min-h-[100dvh] lo desbordaba por sub-píxeles). Si el formulario no
    // entra en pantallas bajas, scrollea solo esta columna.
    <div className="h-[100dvh] overflow-hidden bg-paper">
      <div className="h-full overflow-y-auto">
        <div className="min-h-full flex flex-col justify-center px-6 sm:px-8 py-10 lg:py-14">
          <div className="w-full max-w-[560px] mx-auto">

            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-8 text-ink">
              <LogoIcon size={24} />
              <span className="font-display font-bold text-[15px] tracking-tight">Vocaria</span>
            </div>

            {/* Progreso */}
            <div className="mb-9">
              <Progress step={step} />
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
              <h1 className="font-display font-black text-[31px] sm:text-[38px] lg:text-[42px] text-ink leading-[1.04] tracking-tight mb-3">
                Antes de empezar,<br />contanos sobre vos
              </h1>
              <p className="text-ink/55 text-[15px] lg:text-[16px] font-medium leading-relaxed mb-9">
                Sin spam. Tu resultado va a llegar a tu mail.
              </p>

              <div className="space-y-5">
                {/* Nombre y email comparten fila en pantallas medianas+ para acortar el recorrido vertical */}
                <div className="grid sm:grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-2 gap-4">
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

                <label className="flex items-start gap-2.5 cursor-pointer pt-0.5">
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

                {/* Honeypot: oculto para humanos (aria-hidden + fuera de tab),
                    visible para bots que completan todo el formulario. */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                />

                {error && <p className="text-red-500 text-[13px] font-semibold">{error}</p>}

                <button
                  onClick={handleDatosNext}
                  className={`w-full sm:w-auto sm:min-w-[220px] px-8 py-4 text-[15px] mt-1 flex items-center justify-center gap-2 ${CTA_PRIMARY}`}
                >
                  Continuar
                  <ArrowRight size={17} strokeWidth={2.5} />
                </button>
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
              <h1 className="font-display font-black text-[29px] sm:text-[36px] lg:text-[40px] text-ink leading-[1.06] tracking-tight mb-3">
                ¿Estarías dispuesto/a a mudarte para estudiar?
              </h1>
              <p className="text-ink/55 text-[15px] lg:text-[16px] font-medium mb-9 leading-relaxed">
                Lo usamos para recomendarte universidades accesibles para vos.
              </p>

              <div className="space-y-3 mb-7">
                {MOVILIDAD_OPTS.map(opt => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleMovilidadSelect(opt.id)}
                      className={`group w-full text-left px-5 py-4 rounded-2xl border transition-all duration-200 flex items-center gap-4 active:scale-[0.99] ${OPTION_IDLE}`}
                    >
                      <span className="shrink-0 w-11 h-11 rounded-2xl bg-sky-soft text-sky-deep flex items-center justify-center">
                        <Icon size={20} strokeWidth={1.9} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-bold text-[15px] text-ink leading-tight">{opt.titulo}</p>
                        <p className="text-[13px] text-ink/55 font-medium mt-0.5 leading-tight">{opt.sub}</p>
                      </div>
                      <ChevronRight size={18} strokeWidth={2.2} className="shrink-0 text-ink/20 group-hover:text-sky transition-colors" />
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
    </div>
  );
}
