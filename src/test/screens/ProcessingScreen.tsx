import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, animate, useReducedMotion } from 'motion/react';
import { SKY, EASE } from '../ui/theme';

interface ProcessingScreenProps {
  nombre: string;
  onDone: () => void;
}

const STEPS = [
  'Analizando tu forma de decidir',
  'Cruzando con 130+ carreras',
  'Identificando tu arquetipo',
  'Generando tu resultado',
];

// Procesamiento deliberado (~5.5s): largo para leerse como trabajo real y
// lucir la animación, pero sin aburrir.
const TOTAL_MS = 5500;
const STEP_MS = TOTAL_MS / STEPS.length;
const BLOOM_AT = TOTAL_MS - 700; // el núcleo "florece" justo antes de revelar.

// ── Geometría del orbe ────────────────────────────────────────────────────────
// Tendencia "AI orb": una red radial dentro de un orbe de cristal. Anillos de
// nodos que convergen hacia un núcleo central (la inteligencia resolviendo),
// con pulsos viajando hacia adentro y partículas orbitando. Inspirado en los
// loaders de IA actuales (orb glowing + partículas → centro).
const SIZE = 248;
const C = SIZE / 2;
const ORB_R = 112;
const RING_OUTER = 90;
const RING_INNER = 50;
const OUTER_N = 9;
const INNER_N = 5;

interface Pt { x: number; y: number; }
interface Edge { a: Pt; b: Pt; ring: 'in' | 'core'; }

function polar(radius: number, angleDeg: number): Pt {
  const a = (angleDeg * Math.PI) / 180;
  return { x: C + radius * Math.cos(a), y: C + radius * Math.sin(a) };
}

function buildOrb() {
  const core: Pt = { x: C, y: C };
  const inner: Pt[] = Array.from({ length: INNER_N }, (_, i) =>
    polar(RING_INNER, (360 / INNER_N) * i - 90),
  );
  const outer: Pt[] = Array.from({ length: OUTER_N }, (_, i) =>
    polar(RING_OUTER, (360 / OUTER_N) * i - 90 + 20),
  );

  // Cada nodo externo se conecta a los 2 internos angularmente más cercanos
  // (convergencia radial limpia, no una maraña).
  const edges: Edge[] = [];
  outer.forEach((o) => {
    const oa = Math.atan2(o.y - C, o.x - C);
    const ranked = inner
      .map((n) => {
        const na = Math.atan2(n.y - C, n.x - C);
        let d = Math.abs(na - oa);
        if (d > Math.PI) d = 2 * Math.PI - d;
        return { n, d };
      })
      .sort((p, q) => p.d - q.d);
    ranked.slice(0, 2).forEach(({ n }) => edges.push({ a: o, b: n, ring: 'in' }));
  });
  inner.forEach((n) => edges.push({ a: n, b: core, ring: 'core' }));

  return { core, inner, outer, edges };
}

export default function ProcessingScreen({ nombre, onDone }: ProcessingScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [pct, setPct] = useState(0);
  const [bloom, setBloom] = useState(false);
  const reduceMotion = useReducedMotion();

  const { core, inner, outer, edges } = useMemo(buildOrb, []);

  useEffect(() => {
    const steps = STEPS.map((_, i) => setTimeout(() => setStepIndex(i), i * STEP_MS));
    const bloomT = setTimeout(() => setBloom(true), reduceMotion ? 0 : BLOOM_AT);
    const done = setTimeout(onDone, TOTAL_MS + 350);

    const controls = reduceMotion
      ? (setPct(100), null)
      : animate(0, 100, {
          duration: TOTAL_MS / 1000,
          ease: [0.4, 0, 0.2, 1],
          onUpdate: (v: number) => setPct(v),
        });

    return () => {
      steps.forEach(clearTimeout);
      clearTimeout(bloomT);
      clearTimeout(done);
      controls?.stop();
    };
  }, [onDone, reduceMotion]);

  const rounded = Math.round(pct);

  return (
    <div className="min-h-[100dvh] bg-paper flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[340px] flex flex-col items-center">
        <h2 className="font-display font-extrabold text-[22px] lg:text-[26px] text-ink text-center mb-9 tracking-tight leading-tight">
          {nombre ? `Calculando tu perfil, ${nombre.split(' ')[0]}` : 'Calculando tu perfil'}
        </h2>

        {/* ── Orbe neuronal ──────────────────────────────────────────────── */}
        <div className="relative" style={{ width: SIZE, height: SIZE }} aria-hidden="true">
          {/* Glow externo suave (sky de marca). Respira despacio. */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: -14,
              background:
                'radial-gradient(circle at 50% 50%, rgba(37,142,249,0.20) 0%, rgba(37,142,249,0.07) 50%, transparent 72%)',
              filter: 'blur(10px)',
            }}
            animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.5, 0.8, 0.5], scale: [0.98, 1.03, 0.98] }}
            transition={reduceMotion ? { duration: 0.4 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Cuerpo del orbe: cristal frío con borde hairline (identidad landing). */}
          <div
            className="absolute rounded-full border border-line"
            style={{
              inset: (SIZE - ORB_R * 2) / 2,
              background:
                'radial-gradient(circle at 50% 38%, #ffffff 0%, #f6f9fd 58%, #eef3fa 100%)',
              boxShadow:
                'inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -10px 30px rgba(37,142,249,0.06), 0 16px 48px rgba(11,22,40,0.12)',
            }}
          />

          {/* Anillo escáner que gira (sweep cónico) — el cliché AI-loader, en sky. */}
          {!reduceMotion && (
            <motion.div
              className="absolute rounded-full"
              style={{
                inset: (SIZE - ORB_R * 2) / 2,
                background:
                  'conic-gradient(from 0deg, rgba(37,142,249,0) 0deg, rgba(37,142,249,0) 280deg, rgba(37,142,249,0.55) 350deg, rgba(37,142,249,0) 360deg)',
                WebkitMaskImage:
                  'radial-gradient(closest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))',
                maskImage:
                  'radial-gradient(closest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* La red, recortada al orbe. */}
          <div
            className="absolute rounded-full overflow-hidden"
            style={{ inset: (SIZE - ORB_R * 2) / 2 }}
          >
            <svg
              width={ORB_R * 2}
              height={ORB_R * 2}
              viewBox={`${C - ORB_R} ${C - ORB_R} ${ORB_R * 2} ${ORB_R * 2}`}
              className="overflow-visible"
            >
              {/* Conexiones base — hairline frío. */}
              <g stroke={SKY} strokeWidth={1} strokeOpacity={0.12}>
                {edges.map((e, i) => (
                  <line key={`e${i}`} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} />
                ))}
              </g>

              {/* Pulsos de señal viajando HACIA el centro (convergencia). Los de
                  los radios externos arrancan primero; los internos, con retraso
                  → el flujo "entra" al núcleo en oleadas continuas. */}
              {!reduceMotion &&
                edges.map((e, i) => {
                  const mx = (e.a.x + e.b.x) / 2;
                  const my = (e.a.y + e.b.y) / 2;
                  const delay = (e.ring === 'in' ? 0 : 0.5) + (i % 6) * 0.13;
                  return (
                    <motion.circle
                      key={`p${i}`}
                      r={2.4}
                      fill={SKY}
                      initial={{ opacity: 0 }}
                      animate={{
                        cx: [e.a.x, mx, e.b.x],
                        cy: [e.a.y, my, e.b.y],
                        opacity: [0, 0.95, 0],
                      }}
                      transition={{
                        duration: 1.0,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        ease: 'easeInOut',
                        delay,
                      }}
                    />
                  );
                })}

              {/* Partículas orbitando (dos grupos contrarrotantes → profundidad).
                  Tendencia: partículas en trayectoria circular alrededor del núcleo. */}
              {!reduceMotion &&
                [
                  { r: 70, n: 5, dur: 9, dir: 1, op: 0.5 },
                  { r: 38, n: 4, dur: 6.5, dir: -1, op: 0.7 },
                ].map((orbit, oi) => (
                  <motion.g
                    key={`orb${oi}`}
                    style={{ transformOrigin: `${C}px ${C}px` }}
                    animate={{ rotate: 360 * orbit.dir }}
                    transition={{ duration: orbit.dur, repeat: Infinity, ease: 'linear' }}
                  >
                    {Array.from({ length: orbit.n }).map((_, j) => {
                      const p = polar(orbit.r, (360 / orbit.n) * j);
                      return <circle key={j} cx={p.x} cy={p.y} r={1.6} fill={SKY} fillOpacity={orbit.op} />;
                    })}
                  </motion.g>
                ))}

              {/* Nodos externos e internos — pulso suave en oleada radial. */}
              {[...outer.map((p) => ({ p, r: 4.5, w: 0 }) ), ...inner.map((p) => ({ p, r: 5, w: 1 }))].map(
                (node, i) => (
                  <motion.circle
                    key={`n${i}`}
                    cx={node.p.x}
                    cy={node.p.y}
                    r={node.r}
                    fill="#ffffff"
                    stroke={SKY}
                    strokeWidth={2}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={
                      reduceMotion
                        ? { duration: 0.3 }
                        : {
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.3,
                            ease: 'easeInOut',
                            delay: (node.w === 1 ? 0.5 : 0) + (i % 4) * 0.12,
                          }
                    }
                  />
                ),
              )}

              {/* Halo del núcleo — palpita; al final "florece". */}
              <motion.circle
                cx={core.x}
                cy={core.y}
                fill={SKY}
                fillOpacity={0.18}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                animate={
                  reduceMotion
                    ? { scale: 1 }
                    : bloom
                      ? { scale: 3.2, opacity: 0 }
                      : { scale: [1, 1.5, 1], opacity: [0.5, 0.9, 0.5] }
                }
                transition={
                  reduceMotion
                    ? { duration: 0.3 }
                    : bloom
                      ? { duration: 0.7, ease: EASE }
                      : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                }
                r={14}
              />

              {/* Núcleo (la "respuesta"): navy sólido que crece al florecer. */}
              <motion.circle
                cx={core.x}
                cy={core.y}
                r={9}
                fill={SKY}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  filter: 'drop-shadow(0 2px 10px rgba(37,142,249,0.55))',
                }}
                animate={reduceMotion ? { scale: 1 } : bloom ? { scale: 1.6 } : { scale: [1, 1.12, 1] }}
                transition={
                  reduceMotion
                    ? { duration: 0.3 }
                    : bloom
                      ? { duration: 0.6, ease: EASE }
                      : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                }
              />
            </svg>
          </div>
        </div>

        {/* Barra de progreso fina + etapa + % (sobrio, deja claro que avanza). */}
        <div className="mt-9 w-full max-w-[260px]">
          <div className="h-[3px] w-full rounded-full bg-line overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: SKY }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
          </div>
          <div className="mt-3.5 flex items-center justify-between gap-3">
            <div className="h-5 overflow-hidden flex-1">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stepIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="text-ink/55 text-[12.5px] font-medium tracking-wide leading-none"
                >
                  {STEPS[stepIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            <span className="text-ink/40 text-[12.5px] font-semibold tabular-nums leading-none shrink-0">
              {rounded}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
