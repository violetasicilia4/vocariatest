import { motion } from 'motion/react';
import { Lock, Check, Star, Scale } from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import LogoIcon from '../../components/ui/LogoIcon';
import { getArquetipo, type Arquetipo } from '../data/arquetipos';
import { PLANES, type PlanId } from '../data/profile';
import { CARD, CARD_SHADOW, CTA_PRIMARY, CTA_DARK } from '../ui/theme';

interface ResultPreviewProps {
  nombre: string;
  result: ScoringResult;
  answers: Record<string, string>;
  onGetFullReport: (plan: PlanId) => void;
}

function ConfianzaBadge({ confianza }: { confianza: number }) {
  const label = confianza >= 85 ? 'Alta precisión' : confianza >= 70 ? 'Buena precisión' : 'Precisión moderada';
  const color = confianza >= 85 ? 'text-emerald-600' : confianza >= 70 ? 'text-amber-600' : 'text-orange-600';
  const bg = confianza >= 85 ? 'bg-emerald-500' : confianza >= 70 ? 'bg-amber-500' : 'bg-orange-500';
  return (
    <span className={`text-[11px] font-bold ${color} flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${bg}`} />
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
      transition={{ duration: 0.5, delay: 0.12 }}
      className={`${CARD} p-4 flex items-start gap-3`}
      style={{ boxShadow: CARD_SHADOW }}
    >
      <span className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-brand-lime/20 flex items-center justify-center">
        <Scale size={13} className="text-[#07111F]" />
      </span>
      <div>
        <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-1">
          Un resultado afinado para vos
        </p>
        <p className="text-[12px] text-slate-600 leading-relaxed">
          Tu perfil estaba genuinamente entre <span className="text-slate-900 font-semibold">{lista}</span>.
          Tus respuestas a las {disputa.duelos} preguntas de precisión definieron tu camino —
          pocas personas reciben este nivel de ajuste.
        </p>
      </div>
    </motion.div>
  );
}

function ArquetipoSecundarioCard({ arq }: { arq: Arquetipo }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-slate-200"
      style={{ background: `${arq.color}12` }}
    >
      <span className="text-xl">{arq.emoji}</span>
      <div className="min-w-0 flex-1">
        <p className="font-display font-bold text-[13px] text-slate-900 truncate">{arq.nombre}</p>
        <p className="text-[11px] text-slate-500 font-medium leading-snug truncate">{arq.tagline}</p>
      </div>
      <Lock size={11} className="text-slate-300 shrink-0" />
    </div>
  );
}

function PlanCard({ planId, onSelect }: { planId: PlanId; onSelect: () => void }) {
  const plan = PLANES[planId];
  const isPopular = plan.popular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-[20px] border p-5 transition-all ${
        isPopular
          ? 'border-brand-lime bg-brand-lime/10'
          : 'border-slate-200 bg-white'
      }`}
      style={{ boxShadow: isPopular ? '0 10px 32px rgba(213,255,63,0.18)' : CARD_SHADOW }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-5">
          <span className="flex items-center gap-1 bg-[#07111F] text-brand-lime text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide">
            <Star size={9} fill="currentColor" /> MÁS ELEGIDO
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-display font-black text-[18px] leading-tight text-slate-900">
            {plan.nombre}
          </p>
          <p className="text-[12px] text-slate-500 font-medium mt-0.5">{plan.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display font-black text-[22px] leading-none text-slate-900">
            ${plan.precio}
          </p>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">ARS · único</p>
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        {plan.incluye.map(item => (
          <div key={item} className="flex items-start gap-2">
            <Check size={12} className="shrink-0 mt-0.5 text-[#07111F]" />
            <span className="text-[12px] text-slate-600 font-medium leading-snug">{item}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-3 text-[13px] ${isPopular ? CTA_PRIMARY : CTA_DARK}`}
      >
        Elegir este plan →
      </button>
    </motion.div>
  );
}

export default function ResultPreview({ nombre, result, onGetFullReport }: ResultPreviewProps) {
  const { primario, secundario, tercero, combinacion, confianza, advertencias } = result;
  const firstName = nombre.split(' ')[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-200 bg-white/70 backdrop-blur-md sticky top-0 z-10 text-[#07111F]">
        <LogoIcon size={22} />
        <span className="font-display font-bold text-[13px] text-slate-700">Vocaria</span>
      </div>

      <div className="max-w-xl mx-auto px-5 py-8 space-y-6 pb-12">

        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-slate-500 text-[13px] font-medium mb-1">Tu perfil vocacional, {firstName}</p>
          <ConfianzaBadge confianza={confianza} />
        </motion.div>

        {/* Arquetipo principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-[20px] p-6 border"
          style={{
            background: `linear-gradient(135deg, ${primario.color}1f, ${primario.color}0a)`,
            borderColor: `${primario.color}33`,
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-[11px] text-slate-500 font-bold tracking-widest uppercase mb-1.5">Tu arquetipo</p>
              <h1 className="font-display font-black text-[30px] sm:text-[36px] text-slate-900 leading-tight tracking-tight">
                {combinacion ? combinacion.nombre : primario.nombre}
              </h1>
              {!combinacion && secundario && (
                <p className="text-[12px] mt-1 font-semibold text-slate-500">
                  con rasgos de <span className="text-slate-700">{secundario.nombre}</span>
                  {tercero && <span className="text-slate-700"> y {tercero.nombre}</span>}
                </p>
              )}
              {combinacion && (
                <p className="text-[12px] mt-1 text-slate-500 font-medium">
                  {primario.nombre} + {secundario?.nombre}
                </p>
              )}
            </div>
            <span className="text-5xl shrink-0">{primario.emoji}</span>
          </div>

          <p className="text-slate-700 text-[15px] font-semibold leading-relaxed mb-3 border-b border-slate-200/70 pb-4">
            {combinacion ? combinacion.descripcion : primario.tagline}
          </p>
          <p className="text-slate-600 text-[13px] leading-relaxed">
            {primario.descripcion}
          </p>
        </motion.div>

        {/* Resolución del duelo (solo si hubo fase adaptativa) */}
        <DisputaCard result={result} />

        {/* Fortalezas (parcial) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`${CARD} p-5`}
          style={{ boxShadow: CARD_SHADOW }}
        >
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-3">Tus fortalezas</p>
          <div className="flex flex-wrap gap-2">
            {primario.fortalezas.slice(0, 2).map(f => (
              <span key={f} className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[12px] text-slate-700 font-medium">
                {f}
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[12px] text-slate-400 font-medium flex items-center gap-1.5">
              <Lock size={9} />
              +{primario.fortalezas.length - 2} más
            </span>
          </div>
        </motion.div>

        {/* Arquetipos secundarios (bloqueados) */}
        {(secundario || tercero) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-3">También resonás con</p>
            <div className="space-y-2">
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
            className="rounded-2xl border border-amber-200 bg-amber-50 p-4"
          >
            <p className="text-[11px] font-bold text-amber-700 mb-2 tracking-wide uppercase">Nota</p>
            {advertencias.map((a, i) => (
              <p key={i} className="text-[12px] text-amber-900/70 leading-relaxed">{a}</p>
            ))}
          </motion.div>
        )}

        {/* Planes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="mb-5">
            <h2 className="font-display font-black text-[20px] text-slate-900 mb-1">
              Desbloqueá tu informe completo
            </h2>
            <p className="text-[13px] text-slate-500 font-medium">
              Elegí el plan que más se adapta a lo que necesitás.
            </p>
          </div>

          <div className="space-y-4">
            {(['esencial', 'universitario', 'profesional'] as PlanId[]).map((planId, i) => (
              <motion.div
                key={planId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
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
