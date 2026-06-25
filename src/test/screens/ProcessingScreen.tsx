import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, animate, useReducedMotion } from 'motion/react';
import { SKY, INK, EASE } from '../ui/theme';

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

// ~4 s de procesamiento (deliberado: se lee como "trabajo real", no como un loader).
const TOTAL_MS = 4000;
const STEP_MS = TOTAL_MS / STEPS.length;

// ── Geometría de la red ───────────────────────────────────────────────────────
// Capas tipo perceptrón multicapa: varias entradas que convergen a UNA salida
// (la "respuesta"). Las cantidades están elegidas para leerse densas pero limpias.
const W = 320;
const H = 232;
const PAD_X = 34;
const PAD_Y = 26;
const LAYERS = [4, 6, 5, 1];

interface Node {
  x: number;
  y: number;
  layer: number;
  isOutput: boolean;
}
interface Edge {
  x1: number; y1: number; x2: number; y2: number; layer: number;
}

function buildGraph() {
  const nodes: Node[] = [];
  const byLayer: Node[][] = [];

  LAYERS.forEach((count, li) => {
    const x = LAYERS.length === 1 ? W / 2 : PAD_X + ((W - 2 * PAD_X) * li) / (LAYERS.length - 1);
    const layerNodes: Node[] = [];
    for (let j = 0; j < count; j++) {
      const y = count === 1 ? H / 2 : PAD_Y + ((H - 2 * PAD_Y) * j) / (count - 1);
      const n: Node = { x, y, layer: li, isOutput: li === LAYERS.length - 1 };
      nodes.push(n);
      layerNodes.push(n);
    }
    byLayer.push(layerNodes);
  });

  const edges: Edge[] = [];
  for (let li = 0; li < byLayer.length - 1; li++) {
    byLayer[li].forEach((a) => {
      byLayer[li + 1].forEach((b) => {
        edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, layer: li });
      });
    });
  }
  return { nodes, edges };
}

export default function ProcessingScreen({ nombre, onDone }: ProcessingScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [pct, setPct] = useState(0);
  const reduceMotion = useReducedMotion();

  const { nodes, edges } = useMemo(buildGraph, []);

  // Subconjunto de conexiones que llevan un pulso visible (señal viajando).
  // No animamos todas: unas pocas, bien escalonadas, bastan para leer "flujo".
  const pulseEdges = useMemo(() => {
    const stride = Math.max(1, Math.round(edges.length / 16));
    return edges.filter((_, i) => i % stride === 0);
  }, [edges]);

  useEffect(() => {
    const steps = STEPS.map((_, i) => setTimeout(() => setStepIndex(i), i * STEP_MS));
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

        {/* ── Red neuronal ────────────────────────────────────────────────
            Conexiones tenues (la "arquitectura"), pulsos de señal que viajan de
            izquierda a derecha y nodos que se activan en oleadas, convergiendo a
            un nodo de salida navy: la "respuesta" que se está resolviendo. Todo
            en la paleta de marca, sin glow neón. */}
        <div className="relative" style={{ width: W, height: H }} aria-hidden="true">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
            {/* Conexiones base — hairline frío, casi un boceto. */}
            <g stroke={SKY} strokeWidth={1}>
              {edges.map((e, i) => (
                <line
                  key={`e${i}`}
                  x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                  strokeOpacity={0.1}
                />
              ))}
            </g>

            {/* Pulsos de señal — un punto brillante que recorre la conexión.
                Escalonados por capa → la activación "barre" de izq. a der. */}
            {!reduceMotion && pulseEdges.map((e, i) => {
              const mx = (e.x1 + e.x2) / 2;
              const my = (e.y1 + e.y2) / 2;
              const delay = e.layer * 0.42 + (i % 5) * 0.12;
              return (
                <motion.circle
                  key={`p${i}`}
                  r={2.6}
                  fill={SKY}
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [e.x1, mx, e.x2],
                    cy: [e.y1, my, e.y2],
                    opacity: [0, 0.95, 0],
                  }}
                  transition={{
                    duration: 1.05,
                    repeat: Infinity,
                    repeatDelay: 0.55,
                    ease: 'easeInOut',
                    delay,
                  }}
                />
              );
            })}

            {/* Nodos — se activan en oleadas (escala + brillo) por capa. El de
                salida es navy y un poco mayor: la respuesta tomando forma. */}
            {nodes.map((n, i) => {
              const r = n.isOutput ? 8 : 5;
              const wave = n.layer * 0.42;
              return (
                <motion.circle
                  key={`n${i}`}
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill={n.isOutput ? INK : '#ffffff'}
                  stroke={n.isOutput ? INK : SKY}
                  strokeWidth={n.isOutput ? 0 : 2}
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    filter: n.isOutput
                      ? 'drop-shadow(0 2px 8px rgba(7,17,31,0.22))'
                      : 'drop-shadow(0 1px 3px rgba(37,142,249,0.28))',
                  }}
                  animate={
                    reduceMotion
                      ? { scale: 1, opacity: 1 }
                      : n.isOutput
                        ? { scale: [1, 1.14, 1], opacity: 1 }
                        : { scale: [1, 1.35, 1], opacity: [0.85, 1, 0.85] }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0.3 }
                      : {
                          duration: 1.4,
                          repeat: Infinity,
                          repeatDelay: 0.4,
                          ease: 'easeInOut',
                          delay: wave,
                        }
                  }
                />
              );
            })}
          </svg>
        </div>

        {/* Barra de progreso fina — determinada (se ve que es finito y avanza). */}
        <div className="mt-8 w-full max-w-[260px]">
          <div className="h-[3px] w-full rounded-full bg-line overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: SKY }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
          </div>

          {/* Etapa actual + porcentaje, en una fila sobria. */}
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
