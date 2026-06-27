import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, Check, Star, ArrowRight, Sparkles, ShieldCheck, Plus, Zap, TriangleAlert,
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
// El motor ya calcula 14 dimensiones (0-100). Mostramos las dominantes como
// señales y componemos desde ellas la frase espejo y el "momento aha". Nada de
// promesas: solo lo que las respuestas marcaron con más fuerza.
type DimKey = keyof CareerPreferences;

interface DimCopy {
  senal: string;        // chip corto
  frag: string;         // "tu perfil combina …"
  mueve: string;        // 2ª persona: "te movés mejor cuando …"
}

const DIM: Record<DimKey, DimCopy> = {
  personas:      { senal: 'Orientación a las personas',  frag: 'orientación a las personas', mueve: 'estás con gente' },
  datos:         { senal: 'Lectura analítica',           frag: 'lectura analítica',          mueve: 'analizás y encontrás patrones' },
  objetos:       { senal: 'Trabajo con lo concreto',     frag: 'foco en lo concreto',        mueve: 'ves resultados concretos' },
  ideas:         { senal: 'Pensamiento conceptual',      frag: 'pensamiento conceptual',     mueve: 'conectás ideas' },
  creatividad:   { senal: 'Necesidad de crear',          frag: 'necesidad de crear',         mueve: 'creás algo propio' },
  estructura:    { senal: 'Necesidad de orden',          frag: 'necesidad de orden',         mueve: 'tenés método y claridad' },
  autonomia:     { senal: 'Autonomía para decidir',      frag: 'autonomía',                  mueve: 'decidís con libertad' },
  estabilidad:   { senal: 'Búsqueda de estabilidad',     frag: 'búsqueda de estabilidad',    mueve: 'el terreno es firme' },
  teoria:        { senal: 'Profundidad teórica',         frag: 'ganas de entender a fondo',  mueve: 'entendés algo a fondo' },
  practica:      { senal: 'Aprender haciendo',           frag: 'aprender haciendo',          mueve: 'aprendés haciendo' },
  liderazgo:     { senal: 'Impulso de liderar',          frag: 'liderazgo',                  mueve: 'coordinás y activás ideas' },
  colaboracion:  { senal: 'Trabajo en equipo',           frag: 'trabajo en equipo',          mueve: 'trabajás en equipo' },
  impactoSocial: { senal: 'Necesidad de impacto',        frag: 'necesidad de impacto',       mueve: 'tu trabajo deja una marca' },
  ingresos:      { senal: 'Foco en el retorno',          frag: 'foco en el retorno',         mueve: 'tu esfuerzo rinde' },
};

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

/** Frase espejo corta, en 2ª persona. */
function fraseEspejo(prefs: CareerPreferences): string {
  const dims = topDims(prefs, 3, 30);
  if (dims.length === 0) {
    return 'Tu perfil es amplio: combina varias formas de trabajar con fuerza pareja.';
  }
  const frags = joinNatural(dims.map(d => DIM[d].frag));
  const mueve = joinNatural(topDims(prefs, 2, 30).map(d => DIM[d].mueve));
  return `Tu perfil combina ${frags}. Te movés mejor cuando ${mueve}.`;
}

/** Mini-explicación sobria de por qué salió este arquetipo (vive en "ya
 *  detectamos", no en el hero). */
function porQue(arquetipo: string, prefs: CareerPreferences, result: ScoringResult): string {
  const dims = topDims(prefs, 2, 30);
  const señales = dims.length
    ? `Marcaste con más fuerza ${joinNatural(dims.map(d => DIM[d].senal.toLowerCase()))}`
    : 'Tus respuestas se repartieron de forma pareja';
  const desempate = result.disputaResuelta
    ? ` Estabas entre ${result.disputaResuelta.entre.length} perfiles muy parejos y tus respuestas de desempate inclinaron la balanza.`
    : '';
  return `${señales}, y ese cruce te acerca a ${arquetipo} más que a cualquier otro perfil.${desempate}`;
}

// Riesgo del "momento aha": sale de la tensión dominante del motor (real).
const TENSION_RIESGO: Record<Tension['tipo'], string> = {
  creatividad_vs_estructura: 'que un entorno demasiado rígido te termine apagando',
  autonomia_vs_dependencia:  'frustrarte si no te dan margen para decidir',
  impacto_vs_ingresos:       'tener que elegir entre lo que te importa y lo que paga',
  tecnologia_vs_antimatematica: 'descartar caminos técnicos por miedo a la matemática',
  exploracion_vs_seguridad:  'elegir algo seguro que termine aburriéndote',
  social_vs_soledad:         'caer en un rol más solitario de lo que te gustaría',
};

function riesgoAha(result: ScoringResult): string {
  const t = [...result.tensiones].sort((a, b) => b.score - a.score)[0];
  return t ? TENSION_RIESGO[t.tipo] : 'elegir por descarte, en vez de por lo que de verdad te mueve';
}

// ───────────────────────────── componentes UI ──────────────────────────────

function ConfianzaBadge({ confianza }: { confianza: number }) {
  // Reframe: confianza baja/media no suena "débil". Siempre en clave de
  // "% de definición", con etiqueta que acompaña.
  const label =
    confianza >= 85 ? 'Perfil muy definido' :
    confianza >= 70 ? 'Perfil definido' :
    confianza >= 55 ? 'Lectura inicial' :
    'Señales mixtas';
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-lime/40 bg-brand-lime/15 text-ink text-[11px] font-bold px-2.5 py-1 tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
      {label} · {confianza}% de definición
    </span>
  );
}

/** Barra borrosa (valor oculto, sin filtrar dato). */
function Ghost({ className = 'flex-1' }: { className?: string }) {
  return <span className={`h-2.5 rounded-full bg-ink/12 blur-[3px] ${className}`} aria-hidden="true" />;
}

/** Nivel 1 — filas etiquetadas (estructura del análisis). */
function LockedRows({ labels }: { labels: string[] }) {
  return (
    <div className="space-y-2.5">
      {labels.map(l => (
        <div key={l} className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-ink/55 w-[124px] shrink-0">{l}</span>
          <Ghost />
          <Lock size={11} className="text-ink/25 shrink-0" />
        </div>
      ))}
    </div>
  );
}

/** Nivel 2 — ranking bloqueado de carreras. */
function LockedRanking() {
  return (
    <div className="space-y-2.5">
      {[1, 2, 3].map(n => (
        <div key={n} className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-lg bg-sky text-white text-[11px] font-black flex items-center justify-center shrink-0">{n}</span>
          <span className="text-[11.5px] font-semibold text-ink/55 shrink-0">Carrera compatible</span>
          <Ghost />
          <Lock size={11} className="text-ink/25 shrink-0" />
        </div>
      ))}
    </div>
  );
}

/** Nivel 3 — mini timeline bloqueado (plan semana a semana). */
function LockedTimeline() {
  const weeks: [string, string][] = [
    ['Semana 1', 'Explorar'],
    ['Semana 2', 'Comparar'],
    ['Semana 3', 'Validar'],
    ['Semana 4', 'Decidir'],
  ];
  return (
    <div className="relative">
      <div className="absolute left-[6px] top-2.5 bottom-2.5 w-px bg-line-strong" aria-hidden="true" />
      <div className="space-y-3">
        {weeks.map(([w, act]) => (
          <div key={w} className="relative flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-sky/20 border-2 border-sky shrink-0 z-10" />
            <span className="text-[11px] font-bold text-ink/60 shrink-0 w-[118px]">
              {w} · <span className="text-ink/45 font-semibold">{act}</span>
            </span>
            <Ghost className="flex-1 h-2" />
            <Lock size={11} className="text-ink/25 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TierVisual({ planId }: { planId: PlanId }) {
  if (planId === 'esencial') return <LockedRows labels={['Motivadores', 'Bloqueos', 'Estilo de decisión']} />;
  if (planId === 'universitario') return <LockedRanking />;
  return <LockedTimeline />;
}

/** Un NIVEL del informe = el plan que lo desbloquea + una recompensa visual
 *  propia (filas / ranking / timeline), fundidos en un panel. */
function TierPanel({
  planId,
  index,
  prevNivel,
  onSelect,
  innerRef,
}: {
  planId: PlanId;
  index: number;
  prevNivel: string | null;
  onSelect: () => void;
  innerRef?: (el: HTMLDivElement | null) => void;
}) {
  const plan = PLANES[planId];
  const reco = !!plan.popular;

  return (
    <div
      ref={innerRef}
      className={`relative rounded-[24px] border p-5 lg:p-7 scroll-mt-24 ${
        reco ? 'border-sky bg-sky-soft/40 lg:shadow-[0_18px_50px_rgba(37,142,249,0.12)]' : 'border-line bg-paper-raised'
      }`}
      style={reco ? undefined : { boxShadow: CARD_SHADOW }}
    >
      {reco && (
        <div className="absolute -top-3 left-6">
          <span className="flex items-center gap-1 bg-ink text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
            <Star size={9} fill="currentColor" /> {plan.badge ?? 'Más elegido'}
          </span>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8">
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

        {/* Qué desbloquea: gancho + recompensa visual propia del nivel */}
        <div className="mt-6 lg:mt-0">
          <p className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-ink/40 mb-2">Qué desbloquea</p>
          <p className="text-[12.5px] text-ink/65 font-medium leading-snug mb-4">{plan.gancho}</p>
          <TierVisual planId={planId} />
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
  const rinde = señales.length ? DIM[señales[0]].mueve : null;
  const lowConf = confianza < 70;

  const choosePlan = (plan: PlanId) => {
    track('plan_selected', { plan });
    onGetFullReport(plan);
  };

  const scrollToNiveles = () => {
    document.getElementById('niveles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Sticky CTA (mobile): no aparece de entrada. Se "arma" en la zona de niveles y
  // se oculta cuando el nivel recomendado está en viewport (su CTA real ya se ve).
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

        {/* ══════════ A. LO MÁS CLARO DE TU PERFIL (gratis, corto) ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start"
        >
          {/* Arquetipo + frase espejo corta + momento aha */}
          <div>
            <p className="text-sky-deep text-[12px] font-bold tracking-[0.14em] uppercase mb-4 inline-flex items-center gap-1.5">
              <Sparkles size={13} strokeWidth={2.4} />
              {firstName ? `${firstName}, tu resultado está listo` : 'Tu resultado está listo'}
            </p>

            <div className="flex items-center gap-4 mb-4">
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

            <div className="mb-4">
              <ConfianzaBadge confianza={confianza} />
            </div>

            <p className="text-ink/80 text-[15px] lg:text-[16px] font-medium leading-relaxed border-l-2 border-sky/40 pl-4">
              {cap(fraseEspejo(preferences))}
            </p>

            {/* Momento "aha": dónde rendís + tu riesgo (escaneable, no párrafo). */}
            {rinde && (
              <div className="mt-5 rounded-2xl border border-sky/25 bg-sky-soft/40 p-3.5 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 w-6 h-6 rounded-lg bg-sky/15 flex items-center justify-center shrink-0">
                    <Zap size={13} className="text-sky-deep" strokeWidth={2.4} />
                  </span>
                  <p className="text-[13px] text-ink/80 leading-snug">
                    <span className="font-bold text-ink">Donde más rendís</span> — {rinde}.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <TriangleAlert size={13} className="text-amber-600" strokeWidth={2.4} />
                  </span>
                  <p className="text-[13px] text-ink/80 leading-snug">
                    <span className="font-bold text-ink">Tu mayor riesgo al elegir</span> — {riesgoAha(result)}.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Esto ya detectamos de vos: chips + explicación (la lectura larga vive acá) */}
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
            {lowConf && (
              <p className="text-[12px] text-ink/45 leading-relaxed mt-3 pt-3 border-t border-line">
                El informe completo muestra qué perfiles quedaron cerca y qué respuestas inclinaron el resultado.
              </p>
            )}
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
              Elegí qué parte de tu decisión querés resolver
            </h2>
            <p className="text-[13.5px] text-ink/55 font-medium mt-3 leading-relaxed">
              Tu resultado ya muestra una dirección. El informe completo abre lo que más ayuda a decidir:
              qué te mueve, qué puede confundirte y qué caminos encajan mejor con vos.
            </p>
            <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-semibold text-ink/50">
              <span className="inline-flex items-center gap-1"><ShieldCheck size={12} className="text-sky-deep" /> Pago único</span>
              <span className="text-ink/25">·</span>
              <span>Sin suscripción</span>
              <span className="text-ink/25">·</span>
              <span>Acceso inmediato</span>
            </div>
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
                  onSelect={() => choosePlan(planId)}
                  innerRef={planId === RECOMMENDED_PLAN ? (el => { recoTierRef.current = el; }) : undefined}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] text-ink/45 font-medium">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-sky-deep" /> Pago único, sin suscripción</span>
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
              Comparar opciones
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
