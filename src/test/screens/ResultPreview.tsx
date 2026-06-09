import { motion } from 'motion/react';
import { Lock, Check, Star } from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import LogoIcon from '../../components/ui/LogoIcon';
import type { Arquetipo } from '../data/arquetipos';
import { PLANES, type PlanId } from '../data/profile';

interface ResultPreviewProps {
  nombre: string;
  result: ScoringResult;
  answers: Record<string, string>;
  onGetFullReport: (plan: PlanId) => void;
}

function ConfianzaBadge({ confianza }: { confianza: number }) {
  const label = confianza >= 85 ? 'Alta precisión' : confianza >= 70 ? 'Buena precisión' : 'Precisión moderada';
  const color = confianza >= 85 ? 'text-emerald-400' : confianza >= 70 ? 'text-yellow-400' : 'text-orange-400';
  const bg = confianza >= 85 ? 'bg-emerald-400' : confianza >= 70 ? 'bg-yellow-400' : 'bg-orange-400';
  return (
    <span className={`text-[11px] font-semibold ${color} flex items-center gap-1`}>
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${bg}`} />
      {label} · {confianza}%
    </span>
  );
}

function ArquetipoSecundarioCard({ arq }: { arq: Arquetipo }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10"
      style={{ background: `${arq.color}10` }}
    >
      <span className="text-xl">{arq.emoji}</span>
      <div className="min-w-0 flex-1">
        <p className="font-display font-bold text-[13px] text-white truncate">{arq.nombre}</p>
        <p className="text-[11px] text-white/35 font-medium leading-snug truncate">{arq.tagline}</p>
      </div>
      <Lock size={11} className="text-white/20 shrink-0" />
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
      className={`relative rounded-2xl border p-5 transition-all ${
        isPopular
          ? 'border-brand-lime/40 bg-brand-lime/6'
          : 'border-white/10 bg-white/4'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-5">
          <span className="flex items-center gap-1 bg-brand-lime text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide">
            <Star size={9} fill="currentColor" /> MÁS ELEGIDO
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className={`font-display font-black text-[18px] leading-tight ${isPopular ? 'text-white' : 'text-white/80'}`}>
            {plan.nombre}
          </p>
          <p className="text-[12px] text-white/40 font-medium mt-0.5">{plan.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          <p className={`font-display font-black text-[22px] leading-none ${isPopular ? 'text-brand-lime' : 'text-white'}`}>
            ${plan.precio}
          </p>
          <p className="text-[10px] text-white/30 font-medium mt-0.5">ARS · único</p>
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        {plan.incluye.map(item => (
          <div key={item} className="flex items-start gap-2">
            <Check size={12} className={`shrink-0 mt-0.5 ${isPopular ? 'text-brand-lime' : 'text-white/40'}`} />
            <span className="text-[12px] text-white/55 font-medium leading-snug">{item}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-3 rounded-xl font-display font-black text-[13px] tracking-wide transition-all active:scale-[0.98] ${
          isPopular
            ? 'bg-brand-lime text-slate-950 hover:brightness-105 shadow-[0_4px_20px_rgba(213,255,63,0.25)]'
            : 'bg-white/10 text-white hover:bg-white/16'
        }`}
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
    <div className="min-h-screen bg-[#07111F]">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/6">
        <LogoIcon size={22} />
        <span className="font-display font-bold text-[13px] text-white/60">Vocaria</span>
      </div>

      <div className="max-w-xl mx-auto px-5 py-8 space-y-6 pb-12">

        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-white/40 text-[13px] font-medium mb-1">Tu perfil vocacional, {firstName}</p>
          <ConfianzaBadge confianza={confianza} />
        </motion.div>

        {/* Arquetipo principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl p-6 border border-white/10"
          style={{ background: `linear-gradient(135deg, ${primario.color}20, ${primario.color}06)` }}
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-[11px] text-white/35 font-semibold tracking-widest uppercase mb-1.5">Tu arquetipo</p>
              <h1 className="font-display font-black text-[30px] sm:text-[36px] text-white leading-tight tracking-tight">
                {combinacion ? combinacion.nombre : primario.nombre}
              </h1>
              {!combinacion && secundario && (
                <p className="text-[12px] mt-1 font-semibold" style={{ color: secundario.color }}>
                  con rasgos de {secundario.nombre}
                  {tercero && <span style={{ color: tercero.color }}> y {tercero.nombre}</span>}
                </p>
              )}
              {combinacion && (
                <p className="text-[12px] mt-1 text-white/35 font-medium">
                  {primario.nombre} + {secundario?.nombre}
                </p>
              )}
            </div>
            <span className="text-5xl shrink-0">{primario.emoji}</span>
          </div>

          <p className="text-white/70 text-[15px] font-semibold leading-relaxed mb-3 border-b border-white/8 pb-4">
            {combinacion ? combinacion.descripcion : primario.tagline}
          </p>
          <p className="text-white/50 text-[13px] leading-relaxed">
            {primario.descripcion}
          </p>
        </motion.div>

        {/* Fortalezas (parcial) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl border border-white/8 bg-white/3 p-5"
        >
          <p className="text-[11px] font-bold text-white/40 tracking-widest uppercase mb-3">Tus fortalezas</p>
          <div className="flex flex-wrap gap-2">
            {primario.fortalezas.slice(0, 2).map(f => (
              <span key={f} className="px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-[12px] text-white/65 font-medium">
                {f}
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-full bg-white/4 border border-white/6 text-[12px] text-white/20 font-medium flex items-center gap-1.5">
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
            <p className="text-[11px] font-bold text-white/40 tracking-widest uppercase mb-3">También resonás con</p>
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
            className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4"
          >
            <p className="text-[11px] font-bold text-yellow-400/60 mb-2 tracking-wide uppercase">Nota</p>
            {advertencias.map((a, i) => (
              <p key={i} className="text-[12px] text-white/40 leading-relaxed">{a}</p>
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
            <h2 className="font-display font-black text-[20px] text-white mb-1">
              Desbloqueá tu informe completo
            </h2>
            <p className="text-[13px] text-white/40 font-medium">
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
