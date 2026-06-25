import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, animate, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { SKY, EASE } from '../ui/theme';

interface ProcessingScreenProps {
  nombre: string;
  onDone: () => void;
}

// Mensajes que transmiten una IA construyendo un perfil único (no "esperando").
const STEPS = [
  'Detectando patrones de personalidad',
  'Identificando fortalezas dominantes',
  'Comparando con 130+ carreras',
  'Construyendo tu mapa profesional',
  'Preparando resultados',
];

// Procesamiento deliberado (~6s): tiempo para que el descubrimiento respire.
const TOTAL_MS = 6000;
const BLOOM_AT = TOTAL_MS - 700; // el núcleo "florece" antes de revelar.

// ── Geometría del orbe (espacio viewBox 0–100, resolución independiente) ──────
// Red radial que converge a un centro donde vive el porcentaje (protagonista).
// Inspiración: Apple Intelligence (orbe vivo), Linear/Stripe (sobriedad,
// checklist), Raycast/Arc (glow sutil, profundidad).
const C = 50;
const ARC_R = 46; // anillo de progreso, casi al borde
const RING_OUTER = 37;
const RING_INNER = 22;
const OUTER_N = 9;
const INNER_N = 5;
const ARC_CIRC = 2 * Math.PI * ARC_R;

interface Pt { x: number; y: number; }
interface NodeT extends Pt { threshold: number; rDot: number; }
interface Edge { a: Pt; b: Pt; len: number; toCore: boolean; }

function polar(radius: number, angleDeg: number): Pt {
  const a = (angleDeg * Math.PI) / 180;
  return { x: C + radius * Math.cos(a), y: C + radius * Math.sin(a) };
}
function dist(a: Pt, b: Pt) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function buildOrb() {
  const core: Pt = { x: C, y: C };
  const inner = Array.from({ length: INNER_N }, (_, i) => polar(RING_INNER, (360 / INNER_N) * i - 90));
  const outer = Array.from({ length: OUTER_N }, (_, i) => polar(RING_OUTER, (360 / OUTER_N) * i - 90 + 20));

  // Activación progresiva: los externos primero (entra la señal), luego los
  // internos; el último tramo queda para el "bloom" del centro.
  const nodes: NodeT[] = [
    ...outer.map((p, i) => ({ ...p, rDot: 1.7, threshold: 0.06 + (i / OUTER_N) * 0.5 })),
    ...inner.map((p, i) => ({ ...p, rDot: 1.9, threshold: 0.58 + (i / INNER_N) * 0.32 })),
  ];

  // Conexiones: cada externo a sus 2 internos más cercanos; cada interno al core.
  const edges: Edge[] = [];
  outer.forEach((o) => {
    [...inner]
      .map((n) => ({ n, d: Math.abs(Math.atan2(n.y - C, n.x - C) - Math.atan2(o.y - C, o.x - C)) }))
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .forEach(({ n }) => edges.push({ a: o, b: n, len: dist(o, n), toCore: false }));
  });
  inner.forEach((n) => edges.push({ a: n, b: core, len: dist(n, core), toCore: true }));

  return { core, nodes, edges };
}

export default function ProcessingScreen({ nombre, onDone }: ProcessingScreenProps) {
  const [pct, setPct] = useState(0);
  const [bloom, setBloom] = useState(false);
  const reduceMotion = useReducedMotion();
  const { core, nodes, edges } = useMemo(buildOrb, []);

  useEffect(() => {
    const bloomT = setTimeout(() => setBloom(true), reduceMotion ? 0 : BLOOM_AT);
    const done = setTimeout(onDone, TOTAL_MS + 350);
    const controls = reduceMotion
      ? (setPct(100), null)
      : animate(0, 100, {
          duration: TOTAL_MS / 1000,
          ease: [0.33, 0, 0.2, 1],
          onUpdate: (v: number) => setPct(v),
        });
    return () => {
      clearTimeout(bloomT);
      clearTimeout(done);
      controls?.stop();
    };
  }, [onDone, reduceMotion]);

  const rounded = Math.round(pct);
  const frac = pct / 100;
  const arcOffset = ARC_CIRC * (1 - frac);
  const stageIndex = Math.min(STEPS.length - 1, Math.floor(frac * STEPS.length));
  // Punta del arco de progreso (para el glow que lo persigue).
  const tip = polar(ARC_R, -90 + frac * 360);

  return (
    <div className="min-h-[100dvh] bg-paper flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-display font-extrabold text-[20px] lg:text-[24px] text-ink text-center mb-8 sm:mb-10 tracking-tight leading-tight px-2"
        >
          {nombre ? `Construyendo tu perfil, ${nombre.split(' ')[0]}` : 'Construyendo tu perfil'}
        </motion.h2>

        {/* ── Orbe (héroe) ───────────────────────────────────────────────── */}
        <div
          className="relative w-[clamp(260px,78vw,360px)] aspect-square"
          aria-hidden="true"
        >
          {/* Glow externo que respira (Raycast/Arc vibe). */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: '-7%',
              background:
                'radial-gradient(circle at 50% 45%, rgba(37,142,249,0.22) 0%, rgba(37,142,249,0.08) 48%, transparent 72%)',
              filter: 'blur(14px)',
            }}
            animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.5, 0.85, 0.5], scale: [0.97, 1.04, 0.97] }}
            transition={reduceMotion ? { duration: 0.4 } : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Cuerpo de cristal frío con borde hairline (identidad de la landing). */}
          <div
            className="absolute inset-0 rounded-full border border-line"
            style={{
              background: 'radial-gradient(circle at 50% 36%, #ffffff 0%, #f6f9fd 60%, #eaf1fb 100%)',
              boxShadow:
                'inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -14px 36px rgba(37,142,249,0.07), 0 22px 60px rgba(11,22,40,0.13)',
            }}
          />

          {/* Red + anillo de progreso (viewBox 0–100, escala perfecto). */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
            {/* Track del progreso */}
            <circle cx={C} cy={C} r={ARC_R} fill="none" stroke="var(--color-line)" strokeWidth={1.4} />

            {/* Conexiones: se DIBUJAN al inicio (pathLength 0→1, escalonadas). */}
            <g stroke={SKY} strokeWidth={0.6} strokeOpacity={0.16} strokeLinecap="round">
              {edges.map((e, i) => (
                <motion.line
                  key={`e${i}`}
                  x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y}
                  initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.15 + i * 0.035, ease: EASE }}
                />
              ))}
            </g>

            {/* Pulsos de señal viajando hacia el centro (convergencia continua). */}
            {!reduceMotion &&
              edges.map((e, i) => {
                const mx = (e.a.x + e.b.x) / 2;
                const my = (e.a.y + e.b.y) / 2;
                const delay = 1 + (e.toCore ? 0.45 : 0) + (i % 6) * 0.14;
                return (
                  <motion.circle
                    key={`p${i}`}
                    r={0.95}
                    fill={SKY}
                    initial={{ opacity: 0 }}
                    animate={{ cx: [e.a.x, mx, e.b.x], cy: [e.a.y, my, e.b.y], opacity: [0, 0.95, 0] }}
                    transition={{ duration: 1.0, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut', delay }}
                  />
                );
              })}

            {/* Partículas orbitando (dos grupos contrarrotantes → profundidad). */}
            {!reduceMotion &&
              [
                { r: 30, n: 5, dur: 11, dir: 1, op: 0.45 },
                { r: 15, n: 4, dur: 7.5, dir: -1, op: 0.6 },
              ].map((o, oi) => (
                <motion.g
                  key={`o${oi}`}
                  style={{ transformOrigin: '50px 50px' }}
                  animate={{ rotate: 360 * o.dir }}
                  transition={{ duration: o.dur, repeat: Infinity, ease: 'linear' }}
                >
                  {Array.from({ length: o.n }).map((_, j) => {
                    const p = polar(o.r, (360 / o.n) * j);
                    return <circle key={j} cx={p.x} cy={p.y} r={0.7} fill={SKY} fillOpacity={o.op} />;
                  })}
                </motion.g>
              ))}

            {/* Nodos: entran y se ACTIVAN según el progreso real (color + glow). */}
            {nodes.map((n, i) => {
              const active = frac >= n.threshold;
              return (
                <motion.circle
                  key={`n${i}`}
                  cx={n.x}
                  cy={n.y}
                  r={n.rDot}
                  fill="#ffffff"
                  stroke={SKY}
                  strokeWidth={0.9}
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    filter: active ? 'drop-shadow(0 0 2.5px rgba(37,142,249,0.7))' : 'none',
                  }}
                  initial={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={{
                    scale: active ? 1.18 : 1,
                    opacity: 1,
                    strokeOpacity: active ? 1 : 0.32,
                  }}
                  transition={{
                    scale: { type: 'spring', stiffness: 320, damping: 18 },
                    opacity: { duration: 0.5, delay: reduceMotion ? 0 : 0.2 + i * 0.045, ease: EASE },
                    strokeOpacity: { duration: 0.4, ease: EASE },
                  }}
                />
              );
            })}

            {/* Arco de progreso (determinado): el "progreso real". */}
            <circle
              cx={C}
              cy={C}
              r={ARC_R}
              fill="none"
              stroke={SKY}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeDasharray={ARC_CIRC}
              strokeDashoffset={arcOffset}
              transform={`rotate(-90 ${C} ${C})`}
              style={{ filter: 'drop-shadow(0 0 2px rgba(37,142,249,0.45))' }}
            />
            {/* Glow en la punta del arco. */}
            {!reduceMotion && pct > 1 && pct < 99.5 && (
              <circle cx={tip.x} cy={tip.y} r={1.7} fill="#fff" stroke={SKY} strokeWidth={1} style={{ filter: 'drop-shadow(0 0 3px rgba(37,142,249,0.9))' }} />
            )}
          </svg>

          {/* Halo del centro (detrás del número): palpita y al final florece. */}
          <motion.div
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: '46%',
              height: '46%',
              x: '-50%',
              y: '-50%',
              background: 'radial-gradient(circle, rgba(37,142,249,0.30) 0%, rgba(37,142,249,0.10) 50%, transparent 72%)',
              filter: 'blur(4px)',
            }}
            animate={
              reduceMotion
                ? { opacity: 0.6 }
                : bloom
                  ? { scale: 2.4, opacity: 0 }
                  : { scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }
            }
            transition={
              reduceMotion
                ? { duration: 0.4 }
                : bloom
                  ? { duration: 0.7, ease: EASE }
                  : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
          />

          {/* PORCENTAJE — protagonista, dentro del orbe. */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            animate={reduceMotion ? {} : bloom ? { scale: 1.06 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-start font-display font-black text-ink tracking-tighter tabular-nums leading-none">
              <span className="text-[clamp(48px,15vw,68px)]">{rounded}</span>
              <span className="text-[clamp(20px,5vw,26px)] font-extrabold text-ink/55 mt-[0.45em] ml-0.5">%</span>
            </div>
            <span className="mt-1 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-sky-deep/70">
              {bloom ? 'Listo' : 'Analizando'}
            </span>
          </motion.div>
        </div>

        {/* ── Checklist animado (Linear/Stripe) ──────────────────────────── */}
        <div className="mt-9 sm:mt-10 w-full max-w-[300px] flex flex-col gap-2.5">
          {STEPS.map((label, i) => {
            const done = i < stageIndex || (bloom && i === stageIndex);
            const current = i === stageIndex && !done;
            const pending = i > stageIndex;
            return (
              <motion.div
                key={label}
                className="flex items-center gap-3"
                animate={{ opacity: pending ? 0.4 : 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span
                  className="relative shrink-0 w-[20px] h-[20px] rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{
                    background: done ? SKY : 'transparent',
                    border: done ? `1px solid ${SKY}` : current ? `1px solid ${SKY}` : '1px solid var(--color-line-strong)',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {done ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                      >
                        <Check size={12} strokeWidth={3} className="text-white" />
                      </motion.span>
                    ) : current ? (
                      <motion.span
                        key="dot"
                        className="w-[7px] h-[7px] rounded-full"
                        style={{ background: SKY }}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    ) : (
                      <span key="empty" className="w-[6px] h-[6px] rounded-full bg-line-strong" />
                    )}
                  </AnimatePresence>
                </span>
                <span
                  className={`font-display text-[13px] sm:text-[13.5px] leading-snug transition-colors duration-300 ${
                    current ? 'text-ink font-semibold' : done ? 'text-ink/70 font-medium' : 'text-ink/45 font-medium'
                  }`}
                >
                  {label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
