import { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { SKY, EASE } from '../ui/theme';

interface ProcessingScreenProps {
  nombre: string;
  onDone: () => void;
}

// Etapas del descubrimiento (checklist) — mismo texto abajo del checklist y
// como mensaje vivo bajo la esfera (una sola fuente de verdad: antes vivían
// desfasados un paso entre sí, así que un ítem podía leerse "completado" en la
// lista y "en curso" en el mensaje vivo al mismo tiempo).
const STEPS = [
  'Ordenando tus respuestas',
  'Detectando patrones de pensamiento',
  'Cruzando intereses y carreras',
  'Construyendo tu mapa profesional',
  'Preparando tu resultado',
];

/** Cierre del checklist — reemplaza el mensaje vivo cuando todo terminó. */
const FINAL_MESSAGE = 'Tu resultado está listo';

// Descubrimiento breve pero con cuerpo: alcanza para que la esfera respire y
// los mensajes cambien con calma, sin sentirse una espera artificial.
const TOTAL_MS = 5800;

// ── Gradiente líquido (tinta en agua) ─────────────────────────────────────────
// Manchas de color que se desplazan y "respiran" lentamente dentro de la esfera.
// Sin rotación (nada de planeta): solo deriva y morphing orgánico. Brand: azul
// cielo + soft teal como protagonistas; el lima queda como acento puntual (no
// domina la paleta — evita el efecto "blob verde de IA").
interface Blob {
  color: string;
  size: string;
  top: string[];
  left: string[];
  dur: number;
  delay: number;
  /** Opacidad pico (0–1). Los acentos (lima) van más bajos que el resto. */
  peak?: number;
}
// Paleta luminosa (brilla desde adentro, no masa oscura). Amplitud amplia y
// duraciones desfasadas → tinta en agua que nunca repite el mismo "beat".
const BLOBS: Blob[] = [
  { color: '#258ef9', size: '96%', top: ['-6%', '24%', '0%', '16%'], left: ['4%', '32%', '10%', '26%'], dur: 6.2, delay: 0 },
  { color: '#5aa2f7', size: '88%', top: ['10%', '-10%', '22%', '2%'], left: ['36%', '10%', '42%', '20%'], dur: 7.1, delay: 0.6 },
  { color: '#3fb6c9', size: '92%', top: ['46%', '24%', '56%', '34%'], left: ['0%', '30%', '-4%', '18%'], dur: 5.6, delay: 0.3 },
  { color: '#bfe3ff', size: '68%', top: ['54%', '72%', '40%', '62%'], left: ['44%', '16%', '50%', '28%'], dur: 5.1, delay: 1.0 },
  { color: '#d5ff3f', size: '32%', top: ['28%', '48%', '16%', '40%'], left: ['38%', '18%', '48%', '26%'], dur: 7.6, delay: 0.2, peak: 0.55 },
];

/** Desplazamiento de cada frame respecto del primero (para animar x/y por
 *  transform en vez de top/left, que disparan layout en cada frame). */
function deltas(values: string[]): number[] {
  const base = parseFloat(values[0]);
  return values.map((v) => parseFloat(v) - base);
}

export default function ProcessingScreen({ nombre, onDone }: ProcessingScreenProps) {
  const [pct, setPct] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // +500ms tras llegar a 100%: deja el checklist completo en pantalla un
    // instante antes de cortar al resultado (cierre visual, no corte abrupto).
    const done = setTimeout(onDone, TOTAL_MS + 500);
    const controls = reduceMotion
      ? (setPct(100), null)
      : animate(0, 100, {
          duration: TOTAL_MS / 1000,
          ease: 'linear',
          onUpdate: (v: number) => setPct(v),
        });
    return () => {
      clearTimeout(done);
      controls?.stop();
    };
  }, [onDone, reduceMotion]);

  const stageIndex = Math.min(STEPS.length - 1, Math.floor((pct / 100) * STEPS.length));
  // Desde 96% todos los pasos se ven completos: el último ítem nunca debe
  // quedarse "en curso" hasta el corte final.
  const allDone = pct >= 96;
  const firstName = nombre ? nombre.split(' ')[0] : '';

  return (
    <div className="relative h-[100dvh] bg-paper flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden px-6 py-[clamp(1rem,3vh,2rem)]">
      {/* Ambient de escritorio — ahí el lienzo es mucho más ancho que alto y
          sin esto el contenido se lee como "tarjeta flotando en el vacío".
          Sólo desde lg: para no tocar el mobile (ya resuelto aparte). Respira
          muy lento (14-16s): es atmósfera de fondo, no protagonista — la
          esfera sigue siendo el único elemento "vivo" en primer plano. */}
      <div className="hidden lg:block absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '58vmax',
            height: '58vmax',
            top: '-18%',
            left: '-14%',
            background: 'radial-gradient(circle, rgba(37,142,249,0.10), transparent 70%)',
            filter: 'blur(70px)',
          }}
          animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.45, 0.75, 0.45] }}
          transition={reduceMotion ? { duration: 0.4 } : { duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '52vmax',
            height: '52vmax',
            bottom: '-22%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(63,182,201,0.09), transparent 70%)',
            filter: 'blur(70px)',
          }}
          animate={reduceMotion ? { opacity: 0.4 } : { opacity: [0.35, 0.65, 0.35] }}
          transition={reduceMotion ? { duration: 0.4 } : { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="w-full max-w-[420px] lg:max-w-[480px] flex flex-col items-center">
        {/* Encabezado — el nombre cede protagonismo (menor contraste, debajo). */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center"
        >
          <h2 className="font-display font-semibold text-[19px] sm:text-[21px] lg:text-[26px] text-ink/85 tracking-tight leading-tight">
            Construyendo tu perfil
          </h2>
          {firstName && (
            <p className="mt-1 font-display text-[14px] lg:text-[15px] text-ink/35 font-medium tracking-wide">{firstName}</p>
          )}
        </motion.div>

        {/* ── Esfera orgánica (único elemento visual fuerte) ─────────────── */}
        <motion.div
          className="relative w-[clamp(150px,32dvh,230px)] lg:w-[280px] aspect-square mt-[clamp(1.25rem,3.5vh,2.25rem)] lg:mt-10"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Glow ambiental suave que respira (sin borde duro). Azul cielo +
              soft teal de marca — antes tenía una base verde que reforzaba el
              efecto "IA pensando"; ahora es coherente con el resto del test. */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: '-12%',
              background:
                'radial-gradient(circle, rgba(37,142,249,0.16), rgba(63,182,201,0.10) 55%, transparent 72%)',
              filter: 'blur(26px)',
              willChange: 'transform, opacity',
            }}
            animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.4, 0.7, 0.4], scale: [0.97, 1.05, 0.97] }}
            transition={reduceMotion ? { duration: 0.4 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* La esfera: respira (escala muy sutil). */}
          <motion.div
            className="absolute inset-0"
            style={{ willChange: 'transform' }}
            animate={reduceMotion ? {} : { scale: [1, 1.05, 0.99, 1.03, 1] }}
            transition={reduceMotion ? {} : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Capa de color líquido — blur + máscara radial que difumina el
                borde (orgánico, no bola de cristal). Los blobs derivan, escalan
                y cambian de brillo, desfasados: tinta moviéndose en agua.
                Animan x/y/scale/opacity (transform, sólo composición) en vez de
                top/left (layout): mismo movimiento, sin reflow por frame. */}
            <div
              className="absolute inset-0"
              style={{
                filter: 'blur(15px) saturate(1.1) brightness(1.04)',
                WebkitMaskImage: 'radial-gradient(circle farthest-side at 50% 50%, #000 58%, rgba(0,0,0,0.5) 78%, transparent 96%)',
                maskImage: 'radial-gradient(circle farthest-side at 50% 50%, #000 58%, rgba(0,0,0,0.5) 78%, transparent 96%)',
                contain: 'paint',
              }}
            >
              {BLOBS.map((b, i) => {
                const dTop = deltas(b.top);
                const dLeft = deltas(b.left);
                const peak = b.peak ?? 1;
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: b.size,
                      height: b.size,
                      top: b.top[0],
                      left: b.left[0],
                      background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, ${b.color} 42%, ${b.color}99 60%, transparent 75%)`,
                      willChange: 'transform, opacity',
                    }}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            x: dLeft.map((v) => `${v}%`),
                            y: dTop.map((v) => `${v}%`),
                            scale: [1, 1.32, 0.9, 1.18, 1],
                            opacity: [0.92, 1, 0.85, 1, 0.92].map((v) => v * peak),
                          }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: b.dur, delay: b.delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                    }
                  />
                );
              })}
            </div>

            {/* Núcleo de luz interior — la esfera brilla desde adentro (lift del
                centro para que no se lea como masa oscura). Late muy suave. */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 48% 44%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.12) 26%, transparent 50%)',
                WebkitMaskImage: 'radial-gradient(circle farthest-side at 50% 50%, #000 70%, transparent 92%)',
                maskImage: 'radial-gradient(circle farthest-side at 50% 50%, #000 70%, transparent 92%)',
                willChange: 'transform, opacity',
              }}
              animate={reduceMotion ? {} : { opacity: [0.85, 1, 0.85], scale: [0.96, 1.04, 0.96] }}
              transition={reduceMotion ? {} : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Luz orgánica superior (volumen sin reflejo de cristal). */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 42% 28%, rgba(255,255,255,0.32) 0%, transparent 44%)',
                WebkitMaskImage: 'radial-gradient(circle farthest-side at 50% 50%, #000 66%, transparent 92%)',
                maskImage: 'radial-gradient(circle farthest-side at 50% 50%, #000 66%, transparent 92%)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* ── Mensaje vivo (cambia con calma, sin números) ───────────────── */}
        <div
          className="relative w-full mt-[clamp(1rem,3vh,1.75rem)] lg:mt-8 h-6 lg:h-7 flex items-center justify-center"
          aria-live="polite"
        >
          {/* Sin mode="wait": el saliente y el entrante cruzan en simultáneo
              (crossfade real) en vez de exit→hueco→enter, que dejaba un
              instante sin texto justo antes del mensaje final. Crossfade
              corto (no los 0.6s de las entradas de escena): es feedback que
              se repite 5 veces y tiene que sentirse vivo, no lento. */}
          <AnimatePresence>
            <motion.p
              key={allDone ? 'done' : stageIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-0 flex items-center justify-center text-ink/55 text-[14px] sm:text-[15px] lg:text-[17px] font-medium tracking-wide text-center"
            >
              {allDone ? FINAL_MESSAGE : `${STEPS[stageIndex]}…`}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── Checklist (aire generoso, jerarquía suave) ─────────────────── */}
        <div className="mt-[clamp(1rem,3vh,1.75rem)] lg:mt-8 w-full max-w-[320px] lg:max-w-[360px] flex flex-col gap-[clamp(0.625rem,1.75vh,1.125rem)] lg:gap-4">
          {STEPS.map((label, i) => {
            // Desde allDone, todos los ítems quedan marcados como completos —
            // el último paso no se queda pulsando "en curso" hasta el corte.
            const done = allDone || i < stageIndex;
            const current = !allDone && i === stageIndex;
            return (
              // Entrada escalonada (una sola vez, al montar) en el wrapper
              // externo; el estado done/current vive en el interno con una
              // transición corta y sin delay — así marcar un paso se siente
              // inmediato sin importar cuántas veces se re-renderice.
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
              >
                <motion.div
                  className="flex items-center gap-3.5"
                  animate={{ opacity: done ? 0.9 : current ? 1 : 0.4 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <span className="relative shrink-0 w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] flex items-center justify-center">
                    {/* Pulso discreto del paso activo (vivo, no tech). */}
                    {current && !reduceMotion && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1.5px solid ${SKY}` }}
                        animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <span
                      className="relative w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] rounded-full flex items-center justify-center transition-colors duration-500"
                      style={{
                        background: done ? SKY : '#fff',
                        border: done ? `1px solid ${SKY}` : current ? `1.5px solid ${SKY}` : '1.5px solid var(--color-line-strong)',
                      }}
                    >
                      {done ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 480, damping: 20 }}
                        >
                          <Check size={12} strokeWidth={3} className="text-white" />
                        </motion.span>
                      ) : current && !reduceMotion ? (
                        <motion.span
                          className="w-[7px] h-[7px] lg:w-[8px] lg:h-[8px] rounded-full"
                          style={{ background: SKY }}
                          animate={{ opacity: [1, 0.4, 1], scale: [1, 0.82, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      ) : null}
                    </span>
                  </span>

                  <span
                    className={`font-display text-[14px] sm:text-[14.5px] lg:text-[16px] leading-snug transition-colors duration-500 ${
                      current ? 'text-ink font-semibold' : done ? 'text-ink/70 font-medium' : 'text-ink/45 font-medium'
                    }`}
                  >
                    {label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
