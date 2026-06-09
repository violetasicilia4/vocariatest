import { motion } from 'motion/react';
import { Lock, MapPin, Briefcase, Building2, DollarSign } from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import type { CarreraRecomendada } from '../engine/recommender';
import { recomendar } from '../engine/recommender';
import { formatSalario } from '../data/salarios';
import LogoIcon from '../../components/ui/LogoIcon';

interface ResultPreviewProps {
  nombre: string;
  result: ScoringResult;
  answers: Record<string, string>;
  onGetFullReport: () => void;
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

function ArquetipoBar({ nombre, pct, color, isPrimario }: { nombre: string; pct: number; color: string; isPrimario: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`text-[11px] font-medium w-28 shrink-0 truncate ${isPrimario ? 'text-white/80' : 'text-white/40'}`}>
        {nombre.replace('El ', '').replace('La ', '')}
      </span>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: isPrimario ? color : `${color}99` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="text-[11px] text-white/25 font-mono w-8 text-right">{pct}%</span>
    </div>
  );
}

function CarreraCard({ item, locked }: { item: CarreraRecomendada; locked: boolean }) {
  const salarioJunior = item.salario?.roles[0]
    ? formatSalario(item.salario.roles[0].juniorMin, item.salario.roles[0].juniorMax)
    : null;

  return (
    <div className={`relative rounded-2xl border p-4 transition-all ${locked ? 'border-white/8 bg-white/3' : 'border-white/12 bg-white/6'}`}>
      {locked && (
        <div className="absolute inset-0 rounded-2xl backdrop-blur-[2px] bg-[#07111F]/40 flex items-center justify-center z-10">
          <div className="flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-3 py-1.5">
            <Lock size={11} className="text-white/50" />
            <span className="text-[11px] text-white/50 font-semibold">Disponible en el informe completo</span>
          </div>
        </div>
      )}
      <div className={locked ? 'blur-[3px] select-none' : ''}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-[14px] text-white leading-snug">{item.titulo}</p>
            <p className="text-[11px] text-white/35 font-medium mt-0.5 truncate">{item.familia}</p>
          </div>
          {item.tag === 'top' && (
            <span className="shrink-0 text-[10px] bg-brand-lime text-slate-950 font-black px-2 py-0.5 rounded-full">TOP</span>
          )}
          {item.tag === 'sorpresa' && (
            <span className="shrink-0 text-[10px] bg-white/10 text-white/60 font-bold px-2 py-0.5 rounded-full">SORPRESA</span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/35">
          {item.duracion && (
            <span>{item.duracion}</span>
          )}
          {item.universidadesEnProvincia.length > 0 ? (
            <span className="flex items-center gap-1 text-emerald-400/70">
              <MapPin size={10} />
              {item.universidadesEnProvincia.length} univ. cerca tuyo
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Building2 size={10} />
              {item.universidadesTotal} universidades
            </span>
          )}
          {salarioJunior && (
            <span className="flex items-center gap-1">
              <DollarSign size={10} />
              {salarioJunior} / mes (junior)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultPreview({ nombre, result, onGetFullReport }: ResultPreviewProps) {
  const { primario, secundario, tercero, combinacion, activos, ranking, confianza, advertencias } = result;

  const carreras = recomendar(result);
  const top = carreras[0];
  const rest = carreras.slice(1);

  const firstName = nombre.split(' ')[0];

  // Top 5 archetypes for the bar chart
  const topRanking = ranking.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#07111F]">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/6">
        <LogoIcon size={22} />
        <span className="font-display font-bold text-[13px] text-white/60">Vocaria</span>
      </div>

      <div className="max-w-xl mx-auto px-5 py-8 space-y-6 pb-24">

        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-white/40 text-[13px] font-medium mb-1">Tu resultado, {firstName}</p>
          <ConfianzaBadge confianza={confianza} />
        </motion.div>

        {/* Arquetipo card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl p-6 border border-white/10"
          style={{ background: `linear-gradient(135deg, ${primario.color}18, transparent)` }}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-[12px] text-white/40 font-semibold tracking-widest uppercase mb-1">Tu arquetipo</p>
              <h1 className="font-display font-black text-[28px] sm:text-[32px] text-white leading-tight tracking-tight">
                {combinacion ? combinacion.nombre : primario.nombre}
              </h1>
              {!combinacion && secundario && (
                <p className="text-[12px] mt-1 font-semibold" style={{ color: secundario.color }}>
                  + {secundario.nombre}
                  {tercero && <span style={{ color: tercero.color }}> · {tercero.nombre}</span>}
                </p>
              )}
              {combinacion && (
                <p className="text-[12px] mt-1 text-white/40 font-medium">
                  {primario.nombre} + {secundario?.nombre}
                </p>
              )}
            </div>
            <span className="text-4xl shrink-0">{primario.emoji}</span>
          </div>

          <p className="text-white/60 text-[14px] font-medium leading-relaxed mb-3">
            {combinacion ? combinacion.descripcion : primario.tagline}
          </p>
          <p className="text-white/45 text-[13px] leading-relaxed">
            {primario.descripcion}
          </p>
        </motion.div>

        {/* Perfil de arquetipos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-white/8 bg-white/3 p-5"
        >
          <p className="text-[12px] font-bold text-white/50 tracking-widest uppercase mb-4">Tu perfil de afinidades</p>
          <div className="space-y-3">
            {topRanking.map((item, i) => {
              const arq = [primario, secundario, tercero].find(a => a?.id === item.id) ??
                { nombre: item.id, color: '#ffffff' };
              return (
                <ArquetipoBar
                  key={item.id}
                  nombre={arq.nombre}
                  pct={item.pct}
                  color={arq.color}
                  isPrimario={i === 0}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Highlight stat */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-2xl bg-brand-lime/10 border border-brand-lime/20 p-4 flex items-center gap-4"
        >
          <Briefcase size={20} className="text-brand-lime shrink-0" />
          <div>
            <p className="font-display font-bold text-[14px] text-white">
              Encontramos {carreras.length} carreras que se alinean con tu perfil
            </p>
            <p className="text-[12px] text-white/40 mt-0.5">
              El informe completo incluye universidades, salarios y próximos pasos.
            </p>
          </div>
        </motion.div>

        {/* Carreras */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-[12px] font-bold text-white/50 tracking-widest uppercase mb-3">Carreras recomendadas</p>
          <div className="space-y-2.5">
            {top && <CarreraCard item={top} locked={false} />}
            {rest.slice(0, 2).map(item => (
              <CarreraCard key={item.id} item={item} locked />
            ))}
          </div>
        </motion.div>

        {/* Advertencias */}
        {advertencias.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4"
          >
            <p className="text-[12px] font-bold text-yellow-400/70 mb-2 tracking-wide uppercase">Nota sobre tu perfil</p>
            {advertencias.map((a, i) => (
              <p key={i} className="text-[12px] text-white/40 leading-relaxed">{a}</p>
            ))}
          </motion.div>
        )}

        {/* Fortalezas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-white/8 bg-white/3 p-5"
        >
          <p className="text-[12px] font-bold text-white/50 tracking-widest uppercase mb-3">Tus fortalezas clave</p>
          <div className="flex flex-wrap gap-2">
            {primario.fortalezas.slice(0, 2).map(f => (
              <span key={f} className="px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-[12px] text-white/60 font-medium">
                {f}
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-[12px] text-white/25 font-medium flex items-center gap-1.5">
              <Lock size={10} />
              +{primario.fortalezas.length - 2} más en el informe
            </span>
          </div>
        </motion.div>

      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-6 pt-4 bg-gradient-to-t from-[#07111F] via-[#07111F]/95 to-transparent">
        <button
          onClick={onGetFullReport}
          className="w-full max-w-xl mx-auto block py-4 rounded-2xl bg-brand-lime text-slate-950 font-display font-black text-[16px] tracking-wide hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_8px_40px_rgba(213,255,63,0.35)]"
        >
          Ver mi informe completo →
        </button>
        <p className="text-center text-[11px] text-white/25 mt-2 font-medium">
          Carreras completas · Universidades · Salarios · PDF
        </p>
      </div>
    </div>
  );
}
