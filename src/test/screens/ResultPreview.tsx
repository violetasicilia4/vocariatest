import { motion } from 'motion/react';
import { Lock, TrendingUp, MapPin, Briefcase } from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import type { CarreraRecomendada } from '../engine/recommender';
import { recomendar } from '../engine/recommender';
import LogoIcon from '../../components/ui/LogoIcon';

interface ResultPreviewProps {
  nombre: string;
  result: ScoringResult;
  answers: Record<string, string>;
  onGetFullReport: () => void;
}

function ProfileBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-slate-400 font-mono w-5 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="text-[11px] text-slate-400 font-mono w-7 text-right">{value}</span>
    </div>
  );
}

function CarreraCard({ item, locked }: { item: CarreraRecomendada; locked: boolean }) {
  return (
    <div className={`relative rounded-2xl border-2 p-4 ${locked ? 'border-slate-100 bg-slate-50' : 'border-slate-200 bg-white'}`}>
      {locked && (
        <div className="absolute inset-0 rounded-2xl backdrop-blur-[2px] bg-white/60 flex items-center justify-center z-10">
          <div className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-full px-3 py-1.5">
            <Lock size={11} className="text-slate-400" />
            <span className="text-[11px] text-slate-500 font-semibold">En el informe completo</span>
          </div>
        </div>
      )}
      <div className={locked ? 'blur-[3px] select-none' : ''}>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div>
            <p className="font-display font-bold text-[14px] text-slate-900 leading-snug">{item.carrera.nombre}</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">{item.carrera.titulo} · {item.carrera.duracion_anios} años</p>
          </div>
          {item.tag === 'top' && (
            <span className="shrink-0 text-[10px] bg-[#07111F] text-white font-black px-2 py-0.5 rounded-full">MATCH</span>
          )}
          {item.tag === 'sorpresa' && (
            <span className="shrink-0 text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full">SORPRESA</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <TrendingUp size={10} />
            {item.carrera.mercado === 'en_expansion' ? 'En expansión' : item.carrera.mercado === 'estable' ? 'Estable' : 'Saturado'}
          </span>
          {item.carrera.remoto_posible && (
            <span className="flex items-center gap-1"><MapPin size={10} /> Remoto</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultPreview({ nombre, result, answers, onGetFullReport }: ResultPreviewProps) {
  const { arquetipoPrimario, arquetipoSecundario, esPerfilMixto, profile, confianza, advertencias } = result;

  const contexto = {
    provincia: answers['ctx_provincia'],
    movilidad: answers['ctx_movilidad'],
    duracion: answers['ctx_duracion'],
  };

  const carreras = recomendar(profile, arquetipoPrimario.id, contexto);
  const top = carreras[0];
  const rest = carreras.slice(1);

  const riasecDims = [
    { label: 'R', value: profile.R, color: '#f97316' },
    { label: 'I', value: profile.I, color: '#6366f1' },
    { label: 'A', value: profile.A, color: '#ec4899' },
    { label: 'S', value: profile.S, color: '#10b981' },
    { label: 'E', value: profile.E, color: '#f59e0b' },
    { label: 'C', value: profile.C, color: '#0ea5e9' },
  ];

  const firstName = nombre.split(' ')[0];
  const confianzaLabel = confianza >= 80 ? 'Alta precisión' : confianza >= 65 ? 'Buena precisión' : 'Precisión moderada';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 bg-white border-b border-slate-100">
        <LogoIcon size={22} />
        <span className="font-display font-bold text-[13px] text-slate-400">Vocaria</span>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-5 py-6 space-y-4 pb-28">

        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-slate-500 text-[13px] font-medium">Tu resultado, {firstName}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-1.5 h-1.5 rounded-full ${confianza >= 80 ? 'bg-emerald-400' : confianza >= 65 ? 'bg-yellow-400' : 'bg-orange-400'}`} />
            <span className={`text-[11px] font-semibold ${confianza >= 80 ? 'text-emerald-600' : confianza >= 65 ? 'text-yellow-600' : 'text-orange-500'}`}>
              {confianzaLabel} · {confianza}%
            </span>
          </div>
        </motion.div>

        {/* Arquetipo card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-3xl p-6 bg-white border-2 border-slate-200 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-1">Tu arquetipo</p>
              <h1 className="font-display font-black text-[26px] sm:text-[30px] text-slate-900 leading-tight tracking-tight">
                {arquetipoPrimario.nombre}
              </h1>
              {esPerfilMixto && arquetipoSecundario && (
                <p className="text-[12px] mt-1 font-semibold text-slate-500">
                  + {arquetipoSecundario.nombre}
                </p>
              )}
            </div>
            <span className="text-4xl shrink-0">{arquetipoPrimario.emoji}</span>
          </div>
          <p className="text-slate-600 text-[14px] font-semibold leading-relaxed mb-2">
            {arquetipoPrimario.tagline}
          </p>
          <p className="text-slate-500 text-[13px] leading-relaxed">
            {arquetipoPrimario.descripcion}
          </p>
        </motion.div>

        {/* Perfil RIASEC */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl bg-white border border-slate-200 p-5"
        >
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-4">Tu perfil de dimensiones</p>
          <div className="space-y-3">
            {riasecDims.map(d => <ProfileBar key={d.label} {...d} />)}
          </div>
        </motion.div>

        {/* Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-[#07111F] p-4 flex items-center gap-4"
        >
          <Briefcase size={20} className="text-brand-lime shrink-0" />
          <div>
            <p className="font-display font-bold text-[14px] text-white">
              {carreras.length} carreras se alinean con tu perfil
            </p>
            <p className="text-[12px] text-white/50 mt-0.5">
              El informe completo incluye universidades, salarios y próximos pasos.
            </p>
          </div>
        </motion.div>

        {/* Carreras */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-3">Carreras recomendadas</p>
          <div className="space-y-2.5">
            {top && <CarreraCard item={top} locked={false} />}
            {rest.slice(0, 2).map(item => (
              <CarreraCard key={item.carrera.id} item={item} locked />
            ))}
          </div>
        </motion.div>

        {/* Fortalezas preview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white border border-slate-200 p-5"
        >
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-3">Tus fortalezas clave</p>
          <div className="flex flex-wrap gap-2">
            {arquetipoPrimario.fortalezas.slice(0, 2).map(f => (
              <span key={f} className="px-3 py-1.5 rounded-full bg-slate-100 text-[12px] text-slate-600 font-medium">
                {f}
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[12px] text-slate-400 font-medium flex items-center gap-1.5">
              <Lock size={10} />
              +{arquetipoPrimario.fortalezas.length - 2} más en el informe
            </span>
          </div>
        </motion.div>

        {/* Advertencias */}
        {advertencias.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4"
          >
            <p className="text-[11px] font-bold text-yellow-600 mb-2 tracking-wide uppercase">Nota sobre tu perfil</p>
            {advertencias.map((a, i) => (
              <p key={i} className="text-[12px] text-yellow-800 leading-relaxed">{a}</p>
            ))}
          </motion.div>
        )}

      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 sm:px-5 pb-5 pt-4 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent">
        <button
          onClick={onGetFullReport}
          className="w-full max-w-xl mx-auto block py-4 rounded-2xl bg-[#07111F] text-white font-display font-black text-[15px] tracking-wide hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl"
        >
          Ver mi informe completo →
        </button>
        <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
          Carreras completas · Universidades · Salarios · PDF
        </p>
      </div>
    </div>
  );
}
