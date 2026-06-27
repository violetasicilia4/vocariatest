import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, Check, Star, ArrowRight, Sparkles, ShieldCheck, Plus,
} from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import type { CareerPreferences } from '../engine/preferences';
import type { Tension } from '../engine/tensions';
import LogoIcon from '../../components/ui/LogoIcon';
import { iconForEmoji } from '../ui/icons';
import { PLANES, type PlanId, type PlanModulo } from '../data/profile';
import { CARD_SHADOW, CTA_PRIMARY, CTA_DARK, EASE } from '../ui/theme';
import { track } from '../../services/analytics';

interface ResultPreviewProps {
  nombre: string;
  result: ScoringResult;
  answers: Record<string, string>;
  onGetFullReport: (plan: PlanId) => void;
}

const PLAN_ORDER: PlanId[] = ['esencial', 'universitario', 'profesional'];
const RECOMMENDED_PLAN: PlanId = 'universitario';

// ───────────────────────────── señales reales ──────────────────────────────
// El motor ya calcula 14 dimensiones (0-100) a partir de las respuestas. En vez
// de inventar texto, mostramos las dominantes como "señales detectadas" y
// componemos una frase espejo desde ellas. Nada de promesas: solo lo que las
// respuestas marcaron con más fuerza.
type DimKey = keyof CareerPreferences;

interface DimCopy {
  senal: string;
  frag: string;
  motiv: string;
}

const DIM: Record<DimKey, DimCopy> = {
  personas:      { senal: 'Orientación a las personas',   frag: 'orientación a las personas',     motiv: 'trabajan con otros' },
  datos:         { senal: 'Lectura analítica',            frag: 'lectura analítica',              motiv: 'encuentran patrones en los datos' },
  objetos:       { senal: 'Trabajo con lo concreto',      frag: 'foco en lo concreto',            motiv: 'necesitan resultados tangibles' },
  ideas:         { senal: 'Pensamiento conceptual',       frag: 'pensamiento conceptual',         motiv: 'conectan ideas' },
  creatividad:   { senal: 'Necesidad de crear',           frag: 'necesidad de crear',             motiv: 'ponen su sello en lo que hacen' },
  estructura:    { senal: 'Necesidad de orden',           frag: 'necesidad de orden',             motiv: 'buscan método y claridad' },
  autonomia:     { senal: 'Autonomía para decidir',       frag: 'autonomía',                      motiv: 'necesitan libertad para decidir' },
  estabilidad:   { senal: 'Búsqueda de estabilidad',      frag: 'búsqueda de estabilidad',        motiv: 'necesitan un piso sólido' },
  teoria:        { senal: 'Profundidad teórica',          frag: 'necesidad de entender a fondo',  motiv: 'van al fondo de cada tema' },
  practica:      { senal: 'Aprender haciendo',            frag: 'orientación a aprender haciendo', motiv: 'pasan a la acción rápido' },
  liderazgo:     { senal: 'Impulso de liderar',           frag: 'impulso de liderar',             motiv: 'movilizan personas y recursos' },
  colaboracion:  { senal: 'Trabajo en equipo',            frag: 'trabajo en equipo',              motiv: 'construyen con otros cerca' },
  impactoSocial: { senal: 'Necesidad de impacto',         frag: 'necesidad de impacto',           motiv: 'quieren dejar una marca' },
  ingresos:      { senal: 'Foco en el retorno',           frag: 'foco en el retorno',             motiv: 'buscan que su esfuerzo rinda' },
};

/** Dimensiones dominantes (de mayor a menor), con un piso para no mostrar
 *  señales débiles como si definieran a la persona. */
function topDims(prefs: CareerPreferences, n: number, floor = 35): DimKey[] {
  return (Object.keys(prefs) as DimKey[])
    .map(k => [k, prefs[k]] as const)
    .filter(([, v]) => v >= floor)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function joinNatural(parts: string[]): string {
  if (parts.length <= 1) return parts[0] ?? '';
  return `${parts.slice(0, -1).join(', ')} y ${parts[parts.length - 1]}`;
}

/** Frase espejo: compuesta desde las dimensiones dominantes reales del usuario. */
function fraseEspejo(prefs: CareerPreferences): string {
  const dims = topDims(prefs, 3, 30);
  if (dims.length === 0) {
    return 'Tu patrón es amplio y equilibrado: no se inclina por una sola forma de trabajar, sino que combina varias con fuerza pareja.';
  }
  const frags = joinNatural(dims.map(d => DIM[d].frag));
  const motivs = joinNatural(dims.map(d => DIM[d].motiv));
  return `Tu patrón combina ${frags}. Suele aparecer en personas que ${motivs}.`;
}

const CONF_LABEL = (c: number) =>
  c >= 85 ? 'muy definido' : c >= 70 ? 'definido' : 'en formación';

/** Mini-explicación sobria de por qué salió este arquetipo. Sin misticismo. */
function porQue(arquetipo: string, prefs: CareerPreferences, result: ScoringResult): string {
  const dims = topDims(prefs, 2, 30);
  const señales = dims.length
    ? `Marcaste con más fuerza ${joinNatural(dims.map(d => DIM[d].senal.toLowerCase()))}`
    : 'Tus respuestas se repartieron de forma pareja';
  const desempate = result.disputaResuelta
    ? ` Estabas entre ${result.disputaResuelta.entre.length} perfiles muy parejos y tus respuestas de desempate inclinaron la balanza.`
    : '';
  return `${señales}, y ese cruce te acerca a ${arquetipo} más que a cualquier otro perfil.${desempate} Por eso tu resultado quedó ${CONF_LABEL(result.confianza)} al ${result.confianza}%.`;
}

// Teaser por tensión: gancho corto (NO el contenido completo del informe).
const TENSION_TEASER: Record<Tension['tipo'], string> = {
  creatividad_vs_estructura: 'Tu lado creativo y tu necesidad de orden tiran para lados distintos: el informe te muestra cómo usar esa tensión a favor.',
  autonomia_vs_dependencia:  'Querés independencia total y a la vez equipos cercanos: hay un rol específico donde esa dualidad juega a tu favor.',
  impacto_vs_ingresos:       'Buscás impacto real y también seguridad económica: esa tensión es resoluble, y el informe te dice por dónde.',
  tecnologia_vs_antimatematica: 'Tenés perfil técnico fuerte pero rechazás la matemática pura: hay caminos que priorizan lógica sobre cálculo.',
  exploracion_vs_seguridad:  'Podés estar confundiendo seguridad con interés real. Vale la pena verlo antes de elegir.',
  social_vs_soledad:         'Tu orientación a las personas choca con el trabajo solitario: eso define qué ambientes conviene descartar.',
};

function bloqueoHook(result: ScoringResult): string {
  const t = [...result.tensiones].sort((a, b) => b.score - a.score)[0];
  return t
    ? TENSION_TEASER[t.tipo]
    : 'Hay un patrón que condiciona tus decisiones más de lo que parece — el informe te muestra cuál y cómo aprovecharlo.';
}

// ───────────────────────────── componentes UI ──────────────────────────────

function ConfianzaBadge({ confianza }: { confianza: number }) {
  const label = confianza >= 85 ? 'Perfil muy definido' : confianza >= 70 ? 'Perfil definido' : 'Perfil en formación';
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-lime/40 bg-brand-lime/15 text-ink text-[11px] font-bold px-2.5 py-1 tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
      {label} · {confianza}%
    </span>
  );
}

/** Módulo premium bloqueado dentro de un nivel: hook marketinero (qué revela) +
 *  por qué importa + dos barras borrosas (análisis oculto, sin filtrar dato). */
function LockedModule({ titulo, porque }: { titulo: string; porque: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 w-6 h-6 rounded-md bg-ink/[0.05] flex items-center justify-center shrink-0">
        <Lock size={11} className="text-ink/35" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-bold text-ink/85 leading-snug">{titulo}</p>
        <p className="text-[11.5px] text-ink/55 leading-snug mt-0.5">{porque}</p>
        <div className="mt-2 space-y-1.5" aria-hidden="true">
          <div className="h-2 rounded-full bg-ink/10 blur-[2.5px] w-[92%]" />
          <div className="h-2 rounded-full bg-ink/10 blur-[2.5px] w-[64%]" />
        </div>
      </div>
    </div>
  );
}

/** Un NIVEL del informe = módulos premium + el plan que los desbloquea, fundidos
 *  en un mismo panel. Comunica: qué revela, por qué importa y con qué se abre. */
function TierPanel({
  planId,
  index,
  prevNivel,
  bloqueo,
  onSelect,
  innerRef,
}: {
  planId: PlanId;
  index: number;
  prevNivel: string | null;
  bloqueo: string;
  onSelect: () => void;
  innerRef?: (el: HTMLDivElement | null) => void;
}) {
  const plan = PLANES[planId];
  const reco = !!plan.popular;

  return (
    <div
      ref={innerRef}
      className={`relative rounded-[24px] border p-5 lg:p-7 scroll-mt-24 ${
        reco ? 'border-sky bg-sky-soft/40' : 'border-line bg-paper-raised'
      }`}
      style={{ boxShadow: CARD_SHADOW }}
    >
      {reco && (
        <div className="absolute -top-3 left-6">
          <span className="flex items-center gap-1 bg-ink text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
            <Star size={9} fill="currentColor" /> {plan.badge ?? 'Más elegido'}
          </span>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
        {/* Identidad del nivel */}
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-sky-deep mb-2">
            Nivel {index} · {plan.nivel}
          </p>
          <div className="flex items-baseline gap-2.5 mb-2">
            <h3 className="font-display font-black text-[20px] lg:text-[22px] text-ink tracking-tight">{plan.nombre}</h3>
            <span className="font-display font-extrabold text-[19px] text-ink tracking-tight">${plan.precio}</span>
            <span className="text-[10px] text-ink/40 font-medium">ARS · único</span>
          </div>
          <p className="text-[13px] text-ink/70 font-semibold leading-snug mb-2">{plan.valor}</p>
          <p className="text-[12px] text-ink/50 leading-snug">{plan.paraQuien}</p>
          {prevNivel && (
            <p className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-ink/55 bg-ink/[0.04] rounded-full px-2.5 py-1">
              <Plus size={11} strokeWidth={2.6} className="text-sky-deep" />
              Incluye todo lo de «{prevNivel}»
            </p>
          )}
        </div>

        {/* Qué desbloquea (módulos) */}
        <div className="mt-6 lg:mt-0">
          <p className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-ink/40 mb-3.5">
            Qué desbloquea
          </p>
          <div className="space-y-4">
            {plan.modulos.map((m: PlanModulo) => (
              <LockedModule
                key={m.titulo}
                titulo={m.titulo}
                porque={m.dyn === 'bloqueo' ? bloqueo : m.porque}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onSelect}
        className={`mt-6 w-full flex items-center justify-center gap-2 py-3.5 text-[13.5px] ${reco ? CTA_PRIMARY : CTA_DARK}`}
      >
        Desbloquear «{plan.nivel}» · ${plan.precio}
        <ArrowRight size={15} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function ResultPreview({ nombre, result, onGetFullReport }: ResultPreviewProps) {
  const { primario, combinacion, confianza, preferences } = result;
  const firstName = nombre.split(' ')[0];
  const PrimarioIcon = iconForEmoji(primario.emoji);
  const arquetipoNombre = combinacion ? combinacion.nombre : primario.nombre;

  const señales = topDims(preferences, 3);
  const bloqueo = bloqueoHook(result);

  const choosePlan = (plan: PlanId) => {
    track('plan_selected', { plan });
    onGetFullReport(plan);
  };

  const scrollToNiveles = () => {
    document.getElementById('niveles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Sticky CTA (mobile): no aparece de entrada. Se "arma" cuando el usuario llega
  // a la zona de niveles (ya vio valor) y se oculta cuando el nivel recomendado
  // está en viewport (ahí su CTA real ya se ve, así no tapa nada).
  const unlockRef = useRef<HTMLDivElement | null>(null);
  const recoTierRef = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [recoVisible, setRecoVisible] = useState(false);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    if (unlockRef.current) {
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setArmed(true); },
        { rootMargin: '0px 0px -30% 0px' },
      );
      o.observe(unlockRef.current);
      obs.push(o);
    }
    if (recoTierRef.current) {
      const o = new IntersectionObserver(
        ([e]) => setRecoVisible(e.isIntersecting),
        { rootMargin: '0px 0px -15% 0px' },
      );
      o.observe(recoTierRef.current);
      obs.push(o);
    }
    return () => obs.forEach(o => o.disconnect());
  }, []);

  const showSticky = armed && !recoVisible;

  return (
    <div className="min-h-screen bg-paper">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line/70 bg-paper/85 backdrop-blur-xl sticky top-0 z-20 text-ink">
        <LogoIcon size={20} />
        <span className="font-display font-bold text-[13px] tracking-tight">Vocaria</span>
      </div>

      <div className="max-w-xl lg:max-w-4xl mx-auto px-5 lg:px-8 py-8 lg:py-12 pb-28 lg:pb-16">

        {/* ══════════ A. LO MÁS CLARO DE TU PERFIL (gratis, simplificado) ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start"
        >
          {/* Arquetipo + frase espejo + microcopy */}
          <div>
            <p className="text-sky-deep text-[12px] font-bold tracking-[0.14em] uppercase mb-4 inline-flex items-center gap-1.5">
              <Sparkles size={13} strokeWidth={2.4} />
              {firstName ? `${firstName}, tu resultado está listo` : 'Tu resultado está listo'}
            </p>

            <div className="flex items-center gap-4 mb-5">
              <span
                className="inline-flex w-14 h-14 lg:w-16 lg:h-16 rounded-2xl items-center justify-center shrink-0"
                style={{ background: `${primario.color}16`, color: primario.color }}
              >
                <PrimarioIcon size={30} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-ink/45 text-[12px] font-semibold mb-1">Tu arquetipo</p>
                <h1 className="font-display font-black text-[30px] sm:text-[36px] lg:text-[40px] text-ink leading-[1.02] tracking-tight">
                  {arquetipoNombre}
                </h1>
              </div>
            </div>

            <div className="mb-5">
              <ConfianzaBadge confianza={confianza} />
            </div>

            <p className="text-ink/80 text-[15px] lg:text-[16px] font-medium leading-relaxed border-l-2 border-sky/40 pl-4">
              {cap(fraseEspejo(preferences))}
            </p>

            <p className="text-ink/50 text-[12.5px] leading-relaxed mt-4">
              No es una etiqueta cerrada: es una lectura inicial de cómo venís decidiendo,
              qué te atrae y qué puede estar confundiendo tu elección.
            </p>
          </div>

          {/* Esto ya detectamos de vos: chips reales + por qué */}
          <div
            className="mt-7 lg:mt-0 rounded-[20px] border border-line bg-paper-raised p-5 lg:p-6"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <p className="text-[11px] font-bold text-ink/40 tracking-[0.12em] uppercase mb-3">
              Esto ya detectamos de vos
            </p>
            {señales.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {señales.map(d => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1.5 rounded-full bg-sky-soft text-sky-deep text-[12px] font-semibold px-3 py-1.5"
                  >
                    <Check size={12} strokeWidth={2.6} />
                    {DIM[d].senal}
                  </span>
                ))}
              </div>
            )}
            <p className="text-[13px] text-ink/60 leading-relaxed">
              {porQue(arquetipoNombre, preferences, result)}
            </p>
          </div>
        </motion.div>

        {/* ══════════ B + C. NIVELES DEL INFORME (módulos + plan fundidos) ══════════ */}
        <div ref={unlockRef} id="niveles" className="mt-14 lg:mt-16 scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center max-w-xl mx-auto mb-8 lg:mb-10"
          >
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-deep tracking-[0.12em] uppercase mb-2.5">
              <Lock size={12} strokeWidth={2.4} /> Tu informe, por niveles
            </p>
            <h2 className="font-display font-black text-[24px] lg:text-[30px] text-ink tracking-tight leading-[1.1]">
              Esto es lo que tu informe puede revelarte
            </h2>
            <p className="text-[13.5px] text-ink/55 font-medium mt-3 leading-relaxed">
              Cada nivel abre una parte distinta de <span className="text-ink/75 font-semibold">tu</span> informe.
              Son niveles del mismo informe, no productos sueltos. Elegí hasta dónde querés llegar.
            </p>
          </motion.div>

          <div className="space-y-5 lg:space-y-6">
            {PLAN_ORDER.map((planId, i) => (
              <motion.div
                key={planId}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              >
                <TierPanel
                  planId={planId}
                  index={i + 1}
                  prevNivel={i > 0 ? PLANES[PLAN_ORDER[i - 1]].nivel : null}
                  bloqueo={bloqueo}
                  onSelect={() => choosePlan(planId)}
                  innerRef={planId === RECOMMENDED_PLAN ? (el => { recoTierRef.current = el; }) : undefined}
                />
              </motion.div>
            ))}
          </div>

          {/* Tira de confianza */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] text-ink/45 font-medium">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-sky-deep" /> Un pago, sin suscripción</span>
            <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-sky-deep" /> Acceso inmediato</span>
            <span className="inline-flex items-center gap-1.5"><Lock size={13} className="text-sky-deep" /> Tus datos protegidos</span>
          </div>
        </div>
      </div>

      {/* ── Sticky CTA (solo mobile): aparece en la zona de niveles, lleva al
          recomendado y se oculta cuando ese nivel ya está a la vista. ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            key="sticky-cta"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-20 px-5 pb-5 pt-6 bg-gradient-to-t from-paper via-paper to-transparent"
          >
            <button
              onClick={() => choosePlan(RECOMMENDED_PLAN)}
              className={`w-full flex items-center justify-center gap-2 py-3.5 text-[14.5px] ${CTA_PRIMARY}`}
            >
              Desbloquear «{PLANES[RECOMMENDED_PLAN].nivel}» · ${PLANES[RECOMMENDED_PLAN].precio}
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
            <button
              onClick={scrollToNiveles}
              className="w-full text-center text-[11.5px] text-ink/45 font-medium mt-2 hover:text-ink transition-colors"
            >
              Ver los 3 niveles
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
