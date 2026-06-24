import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Plane, House, HelpCircle, Sparkles, Mail, Check } from 'lucide-react';
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

// Hoja de ruta del onboarding mostrada en el panel izquierdo (estilo Linear/
// Stripe): hace tangible "dónde estoy" y "qué falta", en vez de repetir el
// branding que el usuario ya leyó en la landing.
const ROADMAP: { id: Step | 'test'; label: string; desc: string }[] = [
  { id: 'datos',     label: 'Tus datos',   desc: 'Para enviarte el resultado' },
  { id: 'movilidad', label: 'Tu contexto', desc: 'Para afinar las universidades' },
  { id: 'test',      label: 'El test',     desc: '15 situaciones reales · 4 min' },
];

// Copy contextual del panel izquierdo — cambia según el paso para que la
// pantalla se sienta "un producto en uso", no una landing con un formulario.
const LEFT_COPY: Record<Step, { kicker: string; title: string; sub: string }> = {
  datos: {
    kicker: 'Test vocacional · Gratis',
    title: 'La carrera correcta no se adivina. Se descubre.',
    sub: 'Detectamos tu patrón de pensamiento con situaciones reales y lo cruzamos con carreras universitarias argentinas.',
  },
  movilidad: {
    kicker: 'Último paso antes de empezar',
    title: 'Un dato más y arrancamos con el test.',
    sub: 'Con esto recomendamos universidades realmente accesibles para vos, no una lista genérica.',
  },
};

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

  const activeRoadmapIndex = step === 'datos' ? 0 : 1;
  const leftCopy = LEFT_COPY[step];

  return (
    // Desktop-first: split asimétrico. El panel de marca pasa de 50% a ~34% para
    // ceder protagonismo a la pregunta (66%). Mobile mantiene una sola columna.
    <div className="min-h-[100dvh] bg-paper lg:grid lg:grid-cols-[34fr_66fr]">

      {/* ── Panel izquierdo (solo desktop): contexto dinámico, no branding repetido ── */}
      <aside className="hidden lg:flex flex-col justify-between bg-ink text-white px-10 xl:px-12 py-10 xl:py-12 relative overflow-hidden">
        {/* Acentos sutiles de marca */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-sky/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 rounded-full bg-brand-lime/10 blur-3xl" />

        {/* Top: identidad */}
        <div className="relative flex items-center gap-2.5">
          <LogoIcon size={24} />
          <span className="font-display font-bold text-[15px] tracking-tight">Vocaria</span>
        </div>

        {/* Centro: mensaje contextual + hoja de ruta del onboarding */}
        <div className="relative max-w-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-sky mb-4">
                <Sparkles size={13} strokeWidth={2.4} />
                {leftCopy.kicker}
              </span>
              <h2 className="font-display font-black text-[30px] xl:text-[34px] leading-[1.1] tracking-tight mb-4">
                {leftCopy.title}
              </h2>
              <p className="text-white/60 text-[14.5px] leading-relaxed font-medium">
                {leftCopy.sub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Hoja de ruta — estado vivo del onboarding */}
          <div className="mt-9 space-y-1">
            {ROADMAP.map((item, i) => {
              const done = i < activeRoadmapIndex;
              const active = i === activeRoadmapIndex;
              return (
                <div key={item.id} className="flex items-center gap-3.5 py-1.5">
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold font-display transition-colors duration-300 ${
                      done
                        ? 'bg-brand-lime text-slate-950'
                        : active
                          ? 'bg-white text-ink ring-4 ring-white/15'
                          : 'bg-white/8 text-white/40 ring-1 ring-white/10'
                    }`}
                  >
                    {done ? <Check size={14} strokeWidth={3} /> : i + 1}
                  </span>
                  <div className={`transition-opacity duration-300 ${active || done ? 'opacity-100' : 'opacity-50'}`}>
                    <p className="font-display font-bold text-[13.5px] leading-tight">{item.label}</p>
                    <p className="text-white/45 text-[12px] font-medium leading-tight mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Abajo: qué vas a recibir + dato motivador */}
        <div className="relative space-y-4">
          <div className="flex items-start gap-3 rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3.5">
            <span className="shrink-0 w-9 h-9 rounded-xl bg-brand-sky/15 text-brand-sky flex items-center justify-center">
              <Mail size={17} strokeWidth={2} />
            </span>
            <div>
              <p className="font-display font-bold text-[13px] text-white leading-tight">Tu informe, al instante</p>
              <p className="text-white/50 text-[12px] font-medium leading-snug mt-0.5">
                Tus carreras más compatibles, gratis y a tu mail.
              </p>
            </div>
          </div>
          <p className="text-white/40 text-[12px] font-medium leading-snug pl-1">
            Más del 70% de las personas cambia su expectativa inicial al terminar el test.
          </p>
        </div>
      </aside>

      {/* ── Panel derecho: la pregunta es la protagonista ── */}
      <div className="flex flex-col items-center justify-center px-5 py-10 lg:px-14 xl:px-20 lg:py-12">
        <div className="w-full max-w-[680px]">

          {/* Logo solo mobile (en desktop vive en el panel izquierdo) */}
          <div className="flex items-center gap-2.5 mb-7 text-ink lg:hidden">
            <LogoIcon size={24} />
            <span className="font-display font-bold text-[15px] tracking-tight">Vocaria</span>
          </div>

          {/* Cabecera de progreso compacta: contador + barra segmentada */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45">
                Paso {activeRoadmapIndex + 1} de 2
              </span>
              <span className="text-[11px] font-semibold text-ink/35 font-display">
                Antes de empezar
              </span>
            </div>
            <div className="flex gap-1.5">
              <div className={`h-[5px] rounded-full flex-1 transition-all duration-500 ${step === 'datos' ? 'bg-brand-sky' : 'bg-brand-sky/40'}`} />
              <div className={`h-[5px] rounded-full flex-1 transition-all duration-500 ${step === 'movilidad' ? 'bg-brand-sky' : 'bg-line'}`} />
            </div>
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
                <h1 className="font-display font-black text-[30px] sm:text-[36px] lg:text-[38px] text-ink leading-[1.05] tracking-tight mb-2.5">
                  Antes de empezar,<br />contanos sobre vos
                </h1>
                <p className="text-ink/55 text-[14.5px] font-medium leading-relaxed mb-7">
                  Sin spam. Tu resultado va a llegar a tu mail.
                </p>

                <div className="space-y-4">
                  {/* En desktop, nombre y email comparten fila para acortar el recorrido vertical */}
                  <div className="grid sm:grid-cols-2 gap-3.5">
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

                  <div className="grid grid-cols-2 gap-3.5">
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
                <h1 className="font-display font-black text-[28px] sm:text-[34px] lg:text-[38px] text-ink leading-[1.08] tracking-tight mb-2.5">
                  ¿Estarías dispuesto/a a mudarte para estudiar?
                </h1>
                <p className="text-ink/55 text-[14.5px] font-medium mb-7 leading-relaxed">
                  Lo usamos para recomendarte universidades accesibles para vos.
                </p>

                <div className="space-y-2.5 mb-6">
                  {MOVILIDAD_OPTS.map(opt => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleMovilidadSelect(opt.id)}
                        className={`group w-full text-left px-4 py-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-3.5 active:scale-[0.99] ${OPTION_IDLE}`}
                      >
                        <span className="shrink-0 w-10 h-10 rounded-xl bg-sky-soft text-sky-deep flex items-center justify-center">
                          <Icon size={19} strokeWidth={1.9} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-display font-bold text-[14.5px] text-ink leading-tight">{opt.titulo}</p>
                          <p className="text-[12.5px] text-ink/55 font-medium mt-0.5 leading-tight">{opt.sub}</p>
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
  );
}
