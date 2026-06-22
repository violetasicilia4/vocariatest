import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  Lock, Check, Star, ArrowRight, Sparkles,
  GraduationCap, Landmark, TrendingUp, Award, Layers,
  type LucideIcon,
} from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import LogoIcon from '../../components/ui/LogoIcon';
import { iconForEmoji } from '../ui/icons';
import { PLANES, type PlanId } from '../data/profile';
import { CARD_SHADOW, CTA_PRIMARY, CTA_DARK, EASE } from '../ui/theme';

interface ResultPreviewProps {
  nombre: string;
  result: ScoringResult;
  answers: Record<string, string>;
  onGetFullReport: (plan: PlanId) => void;
}

function ConfianzaBadge({ confianza }: { confianza: number }) {
  const label = confianza >= 85 ? 'Alta precisión' : confianza >= 70 ? 'Buena precisión' : 'Precisión moderada';
  return (
    <span className="inline-flex items-center gap-1.5 bg-brand-lime text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-md tracking-wide">
      {label} · {confianza}%
    </span>
  );
}

/**
 * Barras "fantasma" borrosas: simulan contenido real sin renderizar ningún dato
 * (no se filtra nada por más que se inspeccione el DOM). Generan la sensación de
 * "hay un montón acá adentro" detrás del candado.
 */
function GhostLines({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-2 blur-[3px] select-none pointer-events-none" aria-hidden="true">
      {widths.map((w, i) => (
        <div key={i} className="h-2.5 rounded-full bg-ink/12" style={{ width: w }} />
      ))}
    </div>
  );
}

function GhostChips({ widths }: { widths: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 blur-[3px] select-none pointer-events-none" aria-hidden="true">
      {widths.map((w, i) => (
        <div key={i} className="h-6 rounded-full bg-ink/10" style={{ width: w }} />
      ))}
    </div>
  );
}

/** Fila de valor bloqueada: ícono + nombre claro de lo que se desbloquea + una
 *  muestra grisada del contenido. Comunica QUÉ viene sin entregarlo. */
function LockedFeature({
  icon: Icon,
  label,
  children,
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="relative rounded-[20px] border border-line bg-paper-raised p-4 lg:p-5 overflow-hidden"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-7 h-7 rounded-lg bg-sky-soft flex items-center justify-center shrink-0">
          <Icon size={14} strokeWidth={2} className="text-sky-deep" />
        </span>
        <p className="text-[12.5px] font-bold text-ink/80 leading-tight">{label}</p>
        <Lock size={13} className="ml-auto text-ink/25 shrink-0" />
      </div>
      {children}
    </motion.div>
  );
}

function PlanCard({ planId, onSelect }: { planId: PlanId; onSelect: () => void }) {
  const plan = PLANES[planId];
  const isPopular = plan.popular;

  return (
    <div
      className={`relative flex flex-col h-full rounded-[22px] border p-5 lg:p-6 transition-all ${
        isPopular ? 'border-sky bg-sky-soft/50 lg:scale-[1.03]' : 'border-line bg-paper-raised'
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

      <div className="mb-3">
        <p className="font-display font-bold text-[18px] leading-tight text-ink">{plan.nombre}</p>
        <p className="text-[12px] text-ink/50 font-medium mt-0.5">{plan.tagline}</p>
      </div>

      <div className="flex items-baseline gap-1.5 mb-5 pb-5 border-b border-line">
        <span className="font-display font-extrabold text-[28px] leading-none text-ink tracking-tight whitespace-nowrap">
          ${plan.precio}
        </span>
        <span className="text-[10.5px] text-ink/40 font-medium whitespace-nowrap">ARS · pago único</span>
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
        Desbloquear
        <ArrowRight size={15} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function ResultPreview({ nombre, result, onGetFullReport }: ResultPreviewProps) {
  const { primario, secundario, combinacion, confianza } = result;
  const firstName = nombre.split(' ')[0];
  const PrimarioIcon = iconForEmoji(primario.emoji);
  const arquetipoNombre = combinacion ? combinacion.nombre : primario.nombre;

  const scrollToPlanes = () => {
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line/70 bg-paper/85 backdrop-blur-xl sticky top-0 z-10 text-ink">
        <LogoIcon size={20} />
        <span className="font-display font-bold text-[13px] tracking-tight">Vocaria</span>
      </div>

      <div className="max-w-xl lg:max-w-5xl mx-auto px-5 lg:px-8 py-8 lg:py-12 pb-16">

        {/* ───────────────────────── HOOK: la revelación ─────────────────────────
            Lo único gratis: el nombre del arquetipo, la frase catchy (la muestra),
            la precisión y un gancho. Nada del informe en sí. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center lg:max-w-2xl lg:mx-auto"
        >
          <p className="text-ink/45 text-[12.5px] font-bold tracking-[0.14em] uppercase mb-5">
            {firstName ? `${firstName}, tu arquetipo es` : 'Tu arquetipo es'}
          </p>

          <span
            className="inline-flex w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-2xl items-center justify-center mb-5"
            style={{ background: `${primario.color}16`, color: primario.color }}
          >
            <PrimarioIcon size={32} strokeWidth={1.8} />
          </span>

          <h1 className="font-display font-black text-[34px] sm:text-[42px] lg:text-[52px] text-ink leading-[1.04] tracking-tight mb-4">
            {arquetipoNombre}
          </h1>

          {/* La "muestra": la frase que define al arquetipo (catchy, una línea). */}
          <p className="text-ink/75 text-[15.5px] lg:text-[18px] font-semibold leading-relaxed max-w-[34ch] lg:max-w-[44ch] mx-auto mb-5">
            {combinacion ? combinacion.descripcion.split('. ')[0] + '.' : primario.tagline}
          </p>

          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            <ConfianzaBadge confianza={confianza} />
            <span className="text-[12px] text-ink/40 font-medium">
              Analizado en <span className="text-ink/60 font-semibold">37 dimensiones</span>
            </span>
          </div>

          <button
            onClick={scrollToPlanes}
            className={`mt-7 inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] ${CTA_PRIMARY}`}
          >
            Desbloquear mi informe completo
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* ──────────────────── DESEO: lo que está bloqueado ────────────────────
            Grisado/borroso. Comunica todo lo que el informe revela, sin darlo. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="mt-12 lg:mt-16"
        >
          <div className="text-center mb-6 lg:mb-8">
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-deep tracking-[0.12em] uppercase mb-2">
              <Sparkles size={13} strokeWidth={2.4} /> Esto es solo la punta
            </p>
            <h2 className="font-display font-black text-[22px] lg:text-[26px] text-ink tracking-tight">
              Tu informe completo te espera
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <LockedFeature icon={Award} label="Por qué este arquetipo te define" delay={0.18}>
              <GhostLines widths={['100%', '95%', '78%']} />
            </LockedFeature>

            <LockedFeature icon={Sparkles} label="Tus fortalezas y áreas de desarrollo" delay={0.22}>
              <GhostChips widths={['92px', '120px', '76px', '104px', '88px']} />
            </LockedFeature>

            <LockedFeature icon={GraduationCap} label="Tus carreras más afines, con el por qué" delay={0.26}>
              <GhostLines widths={['88%', '100%', '70%']} />
            </LockedFeature>

            <LockedFeature icon={Landmark} label="Universidades de Argentina donde estudiarlas" delay={0.3}>
              <GhostLines widths={['95%', '82%', '90%']} />
            </LockedFeature>

            <LockedFeature icon={Layers} label="Modalidad y duración real de cada carrera" delay={0.34}>
              <GhostChips widths={['110px', '84px', '96px']} />
            </LockedFeature>

            <LockedFeature icon={TrendingUp} label="Rangos salariales orientativos (ARS)" delay={0.38}>
              <GhostLines widths={['76%', '92%', '64%']} />
            </LockedFeature>
          </div>

          {secundario && (
            <motion.button
              onClick={scrollToPlanes}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-[18px] border border-dashed border-line-strong bg-paper-raised/60 py-3.5 text-[12.5px] font-semibold text-ink/55 hover:text-ink hover:border-ink/40 transition-colors"
            >
              <Lock size={13} className="text-ink/35" />
              + otros arquetipos que también te representan
            </motion.button>
          )}
        </motion.div>

        {/* ─────────────────────────── PLANES: la acción ───────────────────────── */}
        <motion.div
          id="planes"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="mt-12 lg:mt-16 scroll-mt-20"
        >
          <div className="mb-6 lg:mb-8 text-center">
            <h2 className="font-display font-black text-[24px] lg:text-[30px] text-ink mb-2 tracking-tight">
              Desbloqueá tu informe completo
            </h2>
            <p className="text-[13px] lg:text-[14.5px] text-ink/55 font-medium">
              Un solo pago. Sin suscripción, sin renovaciones — el informe es tuyo.
            </p>
          </div>

          <div className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:items-stretch">
            {(['esencial', 'universitario', 'profesional'] as PlanId[]).map((planId, i) => (
              <motion.div
                key={planId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.07, ease: EASE }}
                className="h-full"
              >
                <PlanCard planId={planId} onSelect={() => onGetFullReport(planId)} />
              </motion.div>
            ))}
          </div>

          {/* Tira de confianza: refuerza pago único, sin fricción. */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] text-ink/45 font-medium">
            <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-sky-deep" /> Acceso inmediato</span>
            <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-sky-deep" /> Pago único, no suscripción</span>
            <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-sky-deep" /> Tus datos protegidos</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
