import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, Check, Star, ArrowRight, Sparkles, ShieldCheck,
  GraduationCap, Landmark, Compass, Footprints, TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { ScoringResult } from '../engine/scorer';
import type { CareerPreferences } from '../engine/preferences';
import type { Tension } from '../engine/tensions';
import LogoIcon from '../../components/ui/LogoIcon';
import { iconForEmoji } from '../ui/icons';
import { PLANES, type PlanId } from '../data/profile';
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
  /** Chip corto de la señal detectada. */
  senal: string;
  /** Fragmento nominal para la frase espejo ("combina …"). */
  frag: string;
  /** Fragmento de motivación ("se motivan cuando …"). */
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

/** Devuelve las dimensiones dominantes (de mayor a menor), con un piso para no
 *  mostrar señales débiles como si definieran a la persona. */
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

// Teaser por tensión: un gancho corto (NO el contenido completo del informe).
const TENSION_TEASER: Record<Tension['tipo'], string> = {
  creatividad_vs_estructura: 'Tu lado creativo y tu necesidad de orden tiran para lados distintos. El informe te muestra cómo usar esa tensión a favor en vez de sufrirla.',
  autonomia_vs_dependencia:  'Querés independencia total y a la vez equipos cercanos. Hay un tipo de rol específico donde esa dualidad juega a tu favor.',
  impacto_vs_ingresos:       'Buscás impacto real y también seguridad económica. Esa tensión es resoluble, y el informe te dice por dónde.',
  tecnologia_vs_antimatematica: 'Tenés un perfil técnico fuerte pero rechazás la matemática pura. Hay caminos que priorizan lógica sobre cálculo.',
  exploracion_vs_seguridad:  'Hay un patrón que puede hacerte confundir seguridad con interés real. Vale la pena verlo antes de elegir.',
  social_vs_soledad:         'Tu orientación a las personas choca con el trabajo solitario. Eso define qué ambientes te conviene descartar.',
};

function bloqueoHook(result: ScoringResult): string {
  const t = [...result.tensiones].sort((a, b) => b.score - a.score)[0];
  return t
    ? TENSION_TEASER[t.tipo]
    : 'El informe cruza tus respuestas para detectar el patrón que más condiciona tus decisiones — y cómo aprovecharlo.';
}

// ───────────────────────────── componentes UI ──────────────────────────────

function ConfianzaBadge({ confianza }: { confianza: number }) {
  const label = confianza >= 85 ? 'Perfil muy definido' : confianza >= 70 ? 'Perfil definido' : 'Perfil en formación';
  // Acento de marca (lima) sin efecto sticker: fondo translúcido + punto sólido
  // + texto ink. Visible y premium, no flúor.
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-lime/40 bg-brand-lime/15 text-ink text-[11px] font-bold px-2.5 py-1 tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
      {label} · {confianza}%
    </span>
  );
}

/** "Análisis real oculto": cada fila lleva una etiqueta visible (Patrón
 *  detectado / Riesgo / Recomendación, etc.) y un valor borroso e ilegible. No
 *  se filtra ningún dato; comunica que detrás del candado hay un análisis
 *  estructurado, no un skeleton genérico. */
function LockedAnalysis({ rows }: { rows: string[] }) {
  const widths = ['94%', '86%', '90%', '82%'];
  return (
    <div className="space-y-2 select-none pointer-events-none" aria-hidden="true">
      {rows.map((label, i) => (
        <div key={label} className="flex items-center gap-2.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.07em] text-ink/35 w-[86px] shrink-0 leading-tight">
            {label}
          </span>
          <span
            className="h-2.5 rounded-full bg-ink/12 blur-[3px] flex-1"
            style={{ maxWidth: widths[i % widths.length] }}
          />
        </div>
      ))}
    </div>
  );
}

/** Card de feature BLOQUEADA: ícono + qué desbloquea + un hook real visible +
 *  un análisis estructurado grisado detrás de un fade. Comunica QUÉ viene y que
 *  ES un análisis, sin entregarlo. */
function LockedFeature({
  icon: Icon,
  label,
  hook,
  rows,
  delay = 0,
  className = '',
}: {
  icon: LucideIcon;
  label: string;
  hook: string;
  rows: string[];
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className={`relative rounded-[20px] border border-line bg-paper-raised p-4 lg:p-5 overflow-hidden ${className}`}
      style={{ boxShadow: CARD_SHADOW }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-7 h-7 rounded-lg bg-sky-soft flex items-center justify-center shrink-0">
          <Icon size={14} strokeWidth={2} className="text-sky-deep" />
        </span>
        <p className="text-[12.5px] font-bold text-ink/80 leading-tight">{label}</p>
        <Lock size={13} className="ml-auto text-ink/25 shrink-0" />
      </div>
      <p className="text-[12.5px] text-ink/55 leading-snug mb-3.5">{hook}</p>
      <div className="relative">
        <LockedAnalysis rows={rows} />
        <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-10 bg-gradient-to-t from-paper-raised to-transparent" />
      </div>
    </motion.div>
  );
}

function PlanCard({
  planId,
  onSelect,
}: {
  planId: PlanId;
  onSelect: () => void;
}) {
  const plan = PLANES[planId];
  const isPopular = plan.popular;

  return (
    <div
      className={`relative flex flex-col rounded-[22px] border p-5 transition-all ${
        isPopular ? 'border-sky bg-sky-soft/50' : 'border-line bg-paper-raised'
      }`}
      style={{ boxShadow: CARD_SHADOW }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-5">
          <span className="flex items-center gap-1 bg-ink text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
            <Star size={9} fill="currentColor" /> {plan.badge ?? 'Más elegido'}
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <p className="font-display font-bold text-[17px] leading-tight text-ink">{plan.nombre}</p>
          <p className="text-[12.5px] text-ink/60 font-semibold mt-0.5 leading-snug">{plan.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-display font-extrabold text-[24px] leading-none text-ink tracking-tight whitespace-nowrap">
            ${plan.precio}
          </span>
          <span className="block text-[9.5px] text-ink/40 font-medium whitespace-nowrap mt-0.5">ARS · único</span>
        </div>
      </div>

      <p className="text-[11.5px] text-ink/45 font-medium leading-snug mb-3.5 pb-3.5 border-b border-line">
        {plan.paraQuien}
      </p>

      <div className="space-y-2 mb-3 flex-1">
        {plan.incluye.map(item => (
          <div key={item} className="flex items-start gap-2">
            <Check size={13} strokeWidth={2.5} className="shrink-0 mt-0.5 text-sky-deep" />
            <span className="text-[12px] text-ink/70 font-medium leading-snug">{item}</span>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-1.5 mb-4 rounded-xl bg-ink/[0.03] px-2.5 py-2">
        <Lock size={11} className="text-ink/30 shrink-0 mt-0.5" />
        <span className="text-[11px] text-ink/45 font-medium leading-snug italic">{plan.hook}</span>
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-3 text-[13px] flex items-center justify-center gap-1.5 ${isPopular ? CTA_PRIMARY : CTA_DARK}`}
      >
        Desbloquear
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
  const fortalezasVisibles = primario.fortalezas.slice(0, 2);
  const fortalezasOcultas = Math.max(0, primario.fortalezas.length - 2);

  // El usuario eligió un plan: lo registramos (sin PII) antes de avanzar al
  // checkout. Es la conversión real del funnel de la pantalla.
  const choosePlan = (plan: PlanId) => {
    track('plan_selected', { plan });
    onGetFullReport(plan);
  };

  const scrollToPlanes = () => {
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Sticky CTA (mobile): NO aparece de entrada. Se "arma" recién cuando el
  // usuario llega al preview bloqueado (ya vio valor) y se oculta cuando las
  // cards de planes entran en viewport (ahí los CTAs reales ya están a la vista,
  // así no tapa nada). Resultado: no pide compra antes de tiempo ni se solapa.
  const previewRef = useRef<HTMLDivElement | null>(null);
  const planesRef = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [planesVisible, setPlanesVisible] = useState(false);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    if (previewRef.current) {
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setArmed(true); },
        { rootMargin: '0px 0px -25% 0px' },
      );
      o.observe(previewRef.current);
      obs.push(o);
    }
    if (planesRef.current) {
      const o = new IntersectionObserver(
        ([e]) => setPlanesVisible(e.isIntersecting),
        { rootMargin: '0px 0px -10% 0px' },
      );
      o.observe(planesRef.current);
      obs.push(o);
    }
    return () => obs.forEach(o => o.disconnect());
  }, []);

  const showSticky = armed && !planesVisible;

  return (
    <div className="min-h-screen bg-paper">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line/70 bg-paper/85 backdrop-blur-xl sticky top-0 z-20 text-ink">
        <LogoIcon size={20} />
        <span className="font-display font-bold text-[13px] tracking-tight">Vocaria</span>
      </div>

      <div className="max-w-xl lg:max-w-6xl mx-auto px-5 lg:px-8 py-8 lg:py-12 pb-28 lg:pb-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_392px] lg:gap-12 lg:items-start">

          {/* ════════════════ COLUMNA IZQUIERDA: resultado + preview ════════════════ */}
          <div>
            {/* ── La revelación ─────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
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
                  <h1 className="font-display font-black text-[30px] sm:text-[38px] lg:text-[44px] text-ink leading-[1.02] tracking-tight">
                    {arquetipoNombre}
                  </h1>
                </div>
              </div>

              <div className="mb-6">
                <ConfianzaBadge confianza={confianza} />
              </div>

              {/* Frase espejo (real, derivada de las dimensiones dominantes). */}
              <p className="text-ink/80 text-[15.5px] lg:text-[17px] font-medium leading-relaxed border-l-2 border-sky/40 pl-4">
                {cap(fraseEspejo(preferences))}
              </p>

              {/* Microcopy de confianza: sobrio, no alarmista. Encuadra el
                  resultado como lectura inicial, no etiqueta cerrada. */}
              <p className="text-ink/50 text-[12.5px] lg:text-[13px] leading-relaxed mt-4">
                No es una etiqueta cerrada: es una lectura inicial de cómo venís decidiendo,
                qué te atrae y qué puede estar confundiendo tu elección.
              </p>
            </motion.div>

            {/* ── Señales detectadas + por qué salió ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
              className="mt-7 rounded-[20px] border border-line bg-paper-raised p-5 lg:p-6"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <p className="text-[11px] font-bold text-ink/40 tracking-[0.12em] uppercase mb-3">
                Señales que detectamos en tus respuestas
              </p>
              {señales.length > 0 ? (
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
              ) : null}
              <p className="text-[13px] text-ink/60 leading-relaxed">
                {porQue(arquetipoNombre, preferences, result)}
              </p>
            </motion.div>

            {/* ── Lo que ya detectamos: fortalezas reales (visible) ───────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
              className="mt-5 rounded-[20px] border border-line bg-paper-raised p-5 lg:p-6"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-7 h-7 rounded-lg bg-sky-soft flex items-center justify-center shrink-0">
                  <Sparkles size={14} strokeWidth={2} className="text-sky-deep" />
                </span>
                <p className="text-[12.5px] font-bold text-ink/80">Tus fortalezas</p>
                <span className="ml-auto text-[10.5px] font-semibold text-sky-deep">Vista previa</span>
              </div>
              <div className="space-y-2.5">
                {fortalezasVisibles.map(f => (
                  <div key={f} className="flex items-start gap-2.5">
                    <Check size={14} strokeWidth={2.5} className="text-sky-deep shrink-0 mt-0.5" />
                    <span className="text-[13px] text-ink/75 font-medium leading-snug">{f}</span>
                  </div>
                ))}
                {fortalezasOcultas > 0 && (
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <Lock size={13} className="text-ink/30 shrink-0" />
                    <span className="text-[12.5px] text-ink/45 font-medium italic">
                      +{fortalezasOcultas} fortalezas más y tus áreas de desarrollo en el informe completo
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* ── Lo que sigue bloqueado: hooks reales y específicos ──────────── */}
            <div ref={previewRef} className="mt-8 scroll-mt-20">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-deep tracking-[0.12em] uppercase mb-4">
                <Lock size={12} strokeWidth={2.4} /> Lo que tu informe completo revela
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <LockedFeature
                  icon={Compass}
                  label="Lo que te bloquea"
                  hook={bloqueoHook(result)}
                  rows={['Patrón detectado', 'Riesgo', 'Recomendación']}
                  delay={0.04}
                />
                <LockedFeature
                  icon={GraduationCap}
                  label="Tus carreras más compatibles"
                  hook="Tus 3 carreras con mayor compatibilidad, y la razón concreta de por qué aparece cada una."
                  rows={['1ª carrera', '2ª carrera', '3ª carrera']}
                  delay={0.08}
                />
                <LockedFeature
                  icon={Landmark}
                  label="Dónde estudiarlas en Argentina"
                  hook="Universidades reales, modalidad (presencial/virtual) y duración de cada carrera afín."
                  rows={['Universidad', 'Modalidad', 'Duración']}
                  delay={0.12}
                  className="hidden lg:block"
                />
                <LockedFeature
                  icon={Footprints}
                  label="Tu ambiente ideal de trabajo"
                  hook="Tu entorno ideal no depende solo de la carrera, sino del tipo de dinámica diaria que te hace rendir."
                  rows={['Dinámica diaria', 'Te potencia', 'Te drena']}
                  delay={0.16}
                  className="hidden lg:block"
                />
                <LockedFeature
                  icon={TrendingUp}
                  label="Futuro laboral y salarios"
                  hook="Salidas laborales concretas y rangos salariales orientativos en Argentina (ARS) por carrera."
                  rows={['Salida laboral', 'Inicial', 'Con experiencia']}
                  delay={0.2}
                  className="hidden lg:block"
                />
                <LockedFeature
                  icon={ArrowRight}
                  label="Tus próximos pasos"
                  hook="Qué hacer para empezar a moverte, según tu perfil."
                  rows={['Esta semana', 'Este mes', 'Validación']}
                  delay={0.24}
                  className="hidden lg:block"
                />
              </div>
            </div>
          </div>

          {/* ════════════════ COLUMNA DERECHA: elegí cuánto desbloquear ════════════════ */}
          <motion.aside
            id="planes"
            ref={planesRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
            className="mt-12 lg:mt-0 lg:sticky lg:top-24 scroll-mt-20"
          >
            <div className="mb-5">
              <h2 className="font-display font-black text-[22px] lg:text-[24px] text-ink tracking-tight leading-tight">
                Elegí cuánto querés desbloquear de tu resultado
              </h2>
              <p className="text-[13px] text-ink/55 font-medium mt-1.5">
                Un solo pago. Sin suscripción — el informe es tuyo.
              </p>
            </div>

            <div className="space-y-4">
              {PLAN_ORDER.map((planId, i) => (
                <motion.div
                  key={planId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 + i * 0.07, ease: EASE }}
                  className={planId === RECOMMENDED_PLAN ? 'mt-6 first:mt-0' : ''}
                >
                  <PlanCard planId={planId} onSelect={() => choosePlan(planId)} />
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-ink/45 font-medium">
              <span className="inline-flex items-center gap-1.5"><Check size={12} className="text-sky-deep" /> Acceso inmediato</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} className="text-sky-deep" /> Pago único</span>
              <span className="inline-flex items-center gap-1.5"><Lock size={12} className="text-sky-deep" /> Datos protegidos</span>
            </div>
          </motion.aside>

        </div>
      </div>

      {/* ── Sticky CTA (solo mobile) ──────────────────────────────────────────
          Aparece recién cuando el usuario llegó al preview bloqueado (showSticky)
          y desaparece al entrar las cards de planes en viewport — así no pide
          compra antes de mostrar valor ni se solapa con los CTAs reales. */}
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
              Desbloquear mi informe · ${PLANES[RECOMMENDED_PLAN].precio}
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
            <button
              onClick={scrollToPlanes}
              className="w-full text-center text-[11.5px] text-ink/45 font-medium mt-2 hover:text-ink transition-colors"
            >
              Ver los 3 planes
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
