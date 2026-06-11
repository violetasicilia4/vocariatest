import { motion } from 'motion/react';
import { Lock, Check, Star, Scale, ArrowRight } from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import LogoIcon from '../../components/ui/LogoIcon';
import { getArquetipo, type Arquetipo } from '../data/arquetipos';
import { iconForEmoji } from '../ui/icons';
import { PLANES, type PlanId } from '../data/profile';
import { CARD, CARD_SHADOW, CTA_PRIMARY, CTA_DARK, EASE } from '../ui/theme';

interface ResultPreviewProps {
  nombre: string;
  result: ScoringResult;
  answers: Record<string, string>;
  onGetFullReport: (plan: PlanId) => void;
}

function ConfianzaBadge({ confianza }: { confianza: number }) {
  const label = confianza >= 85 ? 'Alta precisión' : confianza >= 70 ? 'Buena precisión' : 'Precisión moderada';
  return (
    <span className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-clay-deep">
      <span className="w-1.5 h-1.5 rounded-full inline-block bg-clay" />
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
      <span className="shrink-0 mt-0.5 w-9 h-9 rounded-full bg-clay-soft flex items-center justify-center">
        <Scale size={16} strokeWidth={1.9} className="text-clay-deep" />
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
      className={`relative rounded-[22px] border p-5 transition-all ${
        isPopular ? 'border-clay bg-clay-soft/50' : 'border-line bg-paper-raised'
      }`}
      style={{ boxShadow: CARD_SHADOW }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-5">
          <span className="flex items-center gap-1 bg-ink text-paper text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
            <Star size={9} fill="currentColor" /> Más elegido
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-display font-bold text-[18px] leading-tight text-ink">{plan.nombre}</p>
          <p className="text-[12px] text-ink/50 font-medium mt-0.5">{plan.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-serif font-semibold text-[23px] leading-none text-ink">${plan.precio}</p>
          <p className="text-[10px] text-ink/40 font-medium mt-1">ARS · único</p>
        </div>
      </div>

      <div className="space-y-2 mb-5">
        {plan.incluye.map(item => (
          <div key={item} className="flex items-start gap-2.5">
            <Check size={13} strokeWidth={2.5} className="shrink-0 mt-0.5 text-clay-deep" />
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

      <div className="max-w-xl mx-auto px-5 py-8 space-y-6 pb-12">

        {/* Saludo */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <p className="text-ink/50 text-[13px] font-medium mb-1.5">Tu perfil vocacional, {firstName}</p>
          <ConfianzaBadge confianza={confianza} />
        </motion.div>

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
              <h1 className="font-serif font-semibold text-[30px] sm:text-[35px] text-ink leading-[1.08] tracking-[-0.01em]">
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
              <span key={f} className="px-3.5 py-2 rounded-full bg-clay-soft/60 border border-line text-[12.5px] text-ink/80 font-semibold">
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
            className="rounded-[18px] border border-line bg-clay-soft/40 p-4"
          >
            <p className="text-[11px] font-bold text-clay-deep mb-1.5 tracking-[0.12em] uppercase">Nota</p>
            {advertencias.map((a, i) => (
              <p key={i} className="text-[12.5px] text-ink/70 leading-relaxed">{a}</p>
            ))}
          </motion.div>
        )}

        {/* Planes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
        >
          <div className="mb-5">
            <h2 className="font-serif font-semibold text-[22px] text-ink mb-1.5 tracking-[-0.01em]">
              Desbloqueá tu informe completo
            </h2>
            <p className="text-[13px] text-ink/55 font-medium">
              Elegí el plan que más se adapta a lo que necesitás.
            </p>
          </div>

          <div className="space-y-5">
            {(['esencial', 'universitario', 'profesional'] as PlanId[]).map((planId, i) => (
              <motion.div
                key={planId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, ease: EASE }}
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
