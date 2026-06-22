import { motion } from 'motion/react';
import { Lock, Check, Star, Scale, ArrowRight, Fingerprint } from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import type { CareerPreferences } from '../engine/preferences';
import LogoIcon from '../../components/ui/LogoIcon';
import { getArquetipo, type Arquetipo } from '../data/arquetipos';
import { iconForEmoji } from '../ui/icons';
import { PLANES, type PlanId } from '../data/profile';
import { CARD, CARD_SHADOW, CTA_PRIMARY, CTA_DARK, EASE } from '../ui/theme';

// Etiquetas legibles para las dimensiones de preferencia (preferences.ts).
const PREF_LABELS: Record<keyof CareerPreferences, string> = {
  personas: 'Trabajar con personas',
  datos: 'Análisis y datos',
  objetos: 'Cosas tangibles',
  ideas: 'Ideas y sistemas',
  creatividad: 'Expresión creativa',
  estructura: 'Orden y método',
  autonomia: 'Autonomía',
  estabilidad: 'Estabilidad',
  teoria: 'Lo conceptual',
  practica: 'Lo práctico',
  liderazgo: 'Liderar',
  colaboracion: 'Colaborar en equipo',
  impactoSocial: 'Impacto social',
  ingresos: 'Recompensa económica',
};

function topPreferences(prefs: CareerPreferences, n: number) {
  return (Object.entries(prefs) as [keyof CareerPreferences, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, value]) => ({ key, label: PREF_LABELS[key], value: Math.round(value) }));
}

/** Bloque "Tu huella": la tensión más fuerte (texto personalizado por usuario). */
function HuellaCard({ result }: { result: ScoringResult }) {
  const tension = [...result.tensiones].sort((a, b) => b.score - a.score)[0];
  const tops = topPreferences(result.preferences, 3);

  // Si no hay tensión marcada, armamos una frase a partir de lo que más define al perfil.
  const fallback = tops.length >= 2
    ? `Lo que más te mueve es ${tops[0].label.toLowerCase()} y ${tops[1].label.toLowerCase()} — eso orienta el tipo de carrera que tiene sentido para vos.`
    : null;

  if (!tension && !fallback) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.13, ease: EASE }}
      className={`${CARD} p-5`}
      style={{ boxShadow: CARD_SHADOW }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-8 h-8 rounded-full bg-sky-soft flex items-center justify-center">
          <Fingerprint size={15} strokeWidth={1.9} className="text-sky-deep" />
        </span>
        <p className="text-[11px] font-bold text-ink/40 tracking-[0.12em] uppercase">Lo que te hace distinto</p>
      </div>
      <p className="text-[14px] text-ink/80 leading-relaxed font-medium">
        {tension ? tension.mensaje : fallback}
      </p>
      {tension && (
        <p className="text-[12.5px] text-ink/55 leading-relaxed mt-2.5 pt-2.5 border-t border-line">
          {tension.consejo}
        </p>
      )}
    </motion.div>
  );
}

/** Barras de las dimensiones más fuertes — vuelve concreto el claim "37 dimensiones". */
function PreferencesCard({ prefs }: { prefs: CareerPreferences }) {
  const tops = topPreferences(prefs, 5);
  if (tops.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
      className={`${CARD} p-5`}
      style={{ boxShadow: CARD_SHADOW }}
    >
      <p className="text-[11px] font-bold text-ink/40 tracking-[0.12em] uppercase mb-4">Tu perfil en detalle</p>
      <div className="space-y-3">
        {tops.map(({ key, label, value }) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12.5px] text-ink/70 font-semibold">{label}</span>
              <span className="text-[11px] text-ink/45 font-bold">{value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-line overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="h-full rounded-full bg-sky-deep"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface ResultPreviewProps {
  nombre: string;
  result: ScoringResult;
  answers: Record<string, string>;
  onGetFullReport: (plan: PlanId) => void;
}

function ConfianzaBadge({ confianza }: { confianza: number }) {
  const label = confianza >= 85 ? 'Alta precisión' : confianza >= 70 ? 'Buena precisión' : 'Precisión moderada';
  // Píldora lima con texto navy — el mismo gesto de "alta afinidad" del hero.
  return (
    <span className="inline-flex items-center gap-1.5 bg-brand-lime text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-md tracking-wide">
      {label} · {confianza}%
    </span>
  );
}

function DisputaCard({ result }: { result: ScoringResult }) {
  const disputa = result.disputaResuelta;
  if (!disputa) return null;

  const nombres = disputa.entre
    .map(id => getArquetipo(id)?.nombre)
    .filter((n): n is string => Boolean(n));
  if (nombres.length < 2) return null;

  const lista =
    nombres.length === 2
      ? `${nombres[0]} y ${nombres[1]}`
      : `${nombres.slice(0, -1).join(', ')} y ${nombres[nombres.length - 1]}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
      className={`${CARD} p-5 flex items-start gap-3.5`}
      style={{ boxShadow: CARD_SHADOW }}
    >
      <span className="shrink-0 mt-0.5 w-9 h-9 rounded-full bg-sky-soft flex items-center justify-center">
        <Scale size={16} strokeWidth={1.9} className="text-sky-deep" />
      </span>
      <div>
        <p className="text-[11px] font-bold text-ink/40 tracking-[0.12em] uppercase mb-1.5">
          Un resultado afinado para vos
        </p>
        <p className="text-[12.5px] text-ink/65 leading-relaxed">
          Tu perfil estaba genuinamente entre <span className="text-ink font-semibold">{lista}</span>.
          Tus respuestas a las {disputa.duelos} preguntas de precisión definieron tu camino —
          pocas personas reciben este nivel de ajuste.
        </p>
      </div>
    </motion.div>
  );
}

function ArquetipoSecundarioCard({ arq }: { arq: Arquetipo }) {
  const Icon = iconForEmoji(arq.emoji);
  return (
    <div className={`${CARD} flex items-center gap-3.5 px-4 py-3.5`} style={{ boxShadow: CARD_SHADOW }}>
      <span
        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${arq.color}14`, color: arq.color }}
      >
        <Icon size={18} strokeWidth={1.9} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display font-bold text-[13.5px] text-ink truncate">{arq.nombre}</p>
        <p className="text-[11.5px] text-ink/50 font-medium leading-snug truncate">{arq.tagline}</p>
      </div>
      <Lock size={13} className="text-ink/25 shrink-0" />
    </div>
  );
}

function PlanCard({ planId, onSelect }: { planId: PlanId; onSelect: () => void }) {
  const plan = PLANES[planId];
  const isPopular = plan.popular;

  return (
    <div
      className={`relative flex flex-col h-full rounded-[22px] border p-5 lg:p-6 transition-all ${
        isPopular ? 'border-sky bg-sky-soft/50' : 'border-line bg-paper-raised'
      }`}
      style={{ boxShadow: CARD_SHADOW }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-5">
          <span className="flex items-center gap-1 bg-ink text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
            <Star size={9} fill="currentColor" /> Más elegido
          </span>
        </div>
      )}

      {/* Nombre + tagline */}
      <div className="mb-3">
        <p className="font-display font-bold text-[18px] leading-tight text-ink">{plan.nombre}</p>
        <p className="text-[12px] text-ink/50 font-medium mt-0.5">{plan.tagline}</p>
      </div>

      {/* Precio en su propia línea: nunca se corta, sin importar el ancho */}
      <div className="flex items-baseline gap-1.5 mb-5 pb-5 border-b border-line">
        <span className="font-display font-extrabold text-[28px] leading-none text-ink tracking-tight whitespace-nowrap">
          ${plan.precio}
        </span>
        <span className="text-[10.5px] text-ink/40 font-medium whitespace-nowrap">ARS · único</span>
      </div>

      <div className="space-y-2.5 mb-6 flex-1">
        {plan.incluye.map(item => (
          <div key={item} className="flex items-start gap-2.5">
            <Check size={13} strokeWidth={2.5} className="shrink-0 mt-0.5 text-sky-deep" />
            <span className="text-[12.5px] text-ink/65 font-medium leading-snug">{item}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-3 text-[13.5px] flex items-center justify-center gap-1.5 ${isPopular ? CTA_PRIMARY : CTA_DARK}`}
      >
        Elegir este plan
        <ArrowRight size={15} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function ResultPreview({ nombre, result, onGetFullReport }: ResultPreviewProps) {
  const { primario, secundario, tercero, combinacion, confianza, advertencias } = result;
  const firstName = nombre.split(' ')[0];
  const PrimarioIcon = iconForEmoji(primario.emoji);

  return (
    <div className="min-h-screen bg-paper">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line/70 bg-paper/85 backdrop-blur-xl sticky top-0 z-10 text-ink">
        <LogoIcon size={20} />
        <span className="font-display font-bold text-[13px] tracking-tight">Vocaria</span>
      </div>

      <div className="max-w-xl lg:max-w-5xl mx-auto px-5 lg:px-8 py-8 lg:py-12 pb-12">

        {/* Saludo */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <p className="text-ink/50 text-[13px] font-medium mb-2">Tu perfil vocacional, {firstName}</p>
          <ConfianzaBadge confianza={confianza} />
          <p className="text-[12px] text-ink/40 font-medium mt-3 leading-relaxed">
            Analizado en <span className="text-ink/60 font-semibold">37 dimensiones</span>
            {result.disputaResuelta ? ', con un recorrido afinado para vos.' : '.'}
          </p>
        </motion.div>

        {/* Cuerpo del resultado.
            Mobile: una sola columna (orden natural). Desktop: dos columnas para
            aprovechar el ancho — el arquetipo y su contexto a la izquierda, el
            detalle del perfil a la derecha. Así deja de verse "mobile estirado". */}
        <div className="mt-6 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">

        {/* Columna izquierda: arquetipo + contexto del resultado */}
        <div className="space-y-6">

        {/* Arquetipo principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className={`${CARD} p-6 relative overflow-hidden`}
          style={{ boxShadow: CARD_SHADOW }}
        >
          {/* Acento superior sutil con el color del arquetipo */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: primario.color }} />

          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="min-w-0">
              <p className="text-[11px] text-ink/45 font-bold tracking-[0.12em] uppercase mb-2">Tu arquetipo</p>
              <h1 className="font-display font-black text-[30px] sm:text-[35px] text-ink leading-[1.06] tracking-tight">
                {combinacion ? combinacion.nombre : primario.nombre}
              </h1>
              {!combinacion && secundario && (
                <p className="text-[12.5px] mt-2 font-medium text-ink/50">
                  con rasgos de <span className="text-ink/80 font-semibold">{secundario.nombre}</span>
                  {tercero && <span className="text-ink/80 font-semibold"> y {tercero.nombre}</span>}
                </p>
              )}
              {combinacion && (
                <p className="text-[12.5px] mt-2 text-ink/50 font-medium">
                  {primario.nombre} + {secundario?.nombre}
                </p>
              )}
            </div>
            <span
              className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: `${primario.color}14`, color: primario.color }}
            >
              <PrimarioIcon size={26} strokeWidth={1.8} />
            </span>
          </div>

          <p className="text-ink/85 text-[15px] font-semibold leading-relaxed mb-4 border-b border-line pb-5">
            {combinacion ? combinacion.descripcion : primario.tagline}
          </p>
          <p className="text-ink/65 text-[13.5px] leading-relaxed">
            {primario.descripcion}
          </p>
        </motion.div>

        {/* Resolución del duelo */}
        <DisputaCard result={result} />

        {/* Insight personalizado — la tensión/huella propia del usuario */}
        <HuellaCard result={result} />

        </div>{/* /columna izquierda */}

        {/* Columna derecha: detalle del perfil */}
        <div className="space-y-6">

        {/* Perfil en dimensiones — concreta el "37 dimensiones" */}
        <PreferencesCard prefs={result.preferences} />

        {/* Fortalezas (parcial) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className={`${CARD} p-5`}
          style={{ boxShadow: CARD_SHADOW }}
        >
          <p className="text-[11px] font-bold text-ink/40 tracking-[0.12em] uppercase mb-3.5">Tus fortalezas</p>
          <div className="flex flex-wrap gap-2">
            {primario.fortalezas.slice(0, 2).map(f => (
              <span key={f} className="px-3.5 py-2 rounded-full bg-sky-soft/60 border border-line text-[12.5px] text-ink/80 font-semibold">
                {f}
              </span>
            ))}
            <span className="px-3.5 py-2 rounded-full bg-paper border border-line text-[12.5px] text-ink/40 font-semibold flex items-center gap-1.5">
              <Lock size={10} />
              +{primario.fortalezas.length - 2} más
            </span>
          </div>
        </motion.div>

        {/* Arquetipos secundarios */}
        {(secundario || tercero) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          >
            <p className="text-[11px] font-bold text-ink/40 tracking-[0.12em] uppercase mb-3">También resonás con</p>
            <div className="space-y-2.5">
              {secundario && <ArquetipoSecundarioCard arq={secundario} />}
              {tercero && <ArquetipoSecundarioCard arq={tercero} />}
            </div>
          </motion.div>
        )}

        {/* Advertencias */}
        {advertencias.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="rounded-[18px] border border-line bg-sky-soft/40 p-4"
          >
            <p className="text-[11px] font-bold text-sky-deep mb-1.5 tracking-[0.12em] uppercase">Nota</p>
            {advertencias.map((a, i) => (
              <p key={i} className="text-[12.5px] text-ink/70 leading-relaxed">{a}</p>
            ))}
          </motion.div>
        )}

        </div>{/* /columna derecha */}
        </div>{/* /cuerpo dos columnas */}

        {/* Planes — ancho completo, 3 cards a lo ancho en desktop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
          className="mt-10 lg:mt-14"
        >
          <div className="mb-5 lg:text-center">
            <h2 className="font-display font-black text-[22px] lg:text-[28px] text-ink mb-1.5 tracking-tight">
              Desbloqueá tu informe completo
            </h2>
            <p className="text-[13px] lg:text-[14px] text-ink/55 font-medium">
              Elegí el plan que más se adapta a lo que necesitás.
            </p>
          </div>

          <div className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:items-stretch">
            {(['esencial', 'universitario', 'profesional'] as PlanId[]).map((planId, i) => (
              <motion.div
                key={planId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, ease: EASE }}
                className="h-full"
              >
                <PlanCard planId={planId} onSelect={() => onGetFullReport(planId)} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
