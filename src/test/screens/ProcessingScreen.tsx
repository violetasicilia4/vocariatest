import { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { SKY, EASE } from '../ui/theme';

interface ProcessingScreenProps {
  nombre: string;
  onDone: () => void;
}

// Etapas del descubrimiento (checklist) y su mensaje vivo (debajo de la esfera).
const STEPS = [
  { item: 'Detectando patrones de personalidad', live: 'Analizando tus intereses' },
  { item: 'Identificando fortalezas dominantes', live: 'Detectando patrones de personalidad' },
  { item: 'Comparando con 130+ carreras', live: 'Identificando fortalezas dominantes' },
  { item: 'Construyendo tu mapa profesional', live: 'Comparando caminos profesionales' },
  { item: 'Preparando resultados', live: 'Preparando tus resultados' },
];

// Descubrimiento sin prisa: tiempo para que la esfera respire y los mensajes
// cambien con calma. No es una barra de carga.
const TOTAL_MS = 8200;

// ── Gradiente líquido (tinta en agua) ─────────────────────────────────────────
// Manchas de color que se desplazan y "respiran" lentamente dentro de la esfera.
// Sin rotación (nada de planeta): solo deriva y morphing orgánico. Brand: azul/
// verde/lima con teal de transición.
interface Blob {
  color: string;
  size: string;
  top: string[];
  left: string[];
  dur: number;
}
const BLOBS: Blob[] = [
  { color: '#1452c9', size: '88%', top: ['-2%', '18%', '6%'], left: ['8%', '30%', '14%'], dur: 7.5 },
  { color: '#0b6f86', size: '80%', top: ['8%', '-6%', '16%'], left: ['32%', '14%', '36%'], dur: 8.5 },
  { color: '#2fbf3f', size: '98%', top: ['44%', '28%', '50%'], left: ['4%', '26%', '0%'], dur: 7 },
  { color: '#9bd84a', size: '82%', top: ['50%', '66%', '42%'], left: ['40%', '20%', '46%'], dur: 6.5 },
  { color: '#0a4f63', size: '56%', top: ['26%', '42%', '20%'], left: ['34%', '22%', '44%'], dur: 9 },
];

export default function ProcessingScreen({ nombre, onDone }: ProcessingScreenProps) {
  const [pct, setPct] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const done = setTimeout(onDone, TOTAL_MS + 300);
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
  const firstName = nombre ? nombre.split(' ')[0] : '';

  return (
    <div className="min-h-[100dvh] bg-paper flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        {/* Encabezado — el nombre cede protagonismo (menor contraste, debajo). */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center"
        >
          <h2 className="font-display font-semibold text-[19px] sm:text-[21px] text-ink/85 tracking-tight leading-tight">
            Construyendo tu perfil
          </h2>
          {firstName && (
            <p className="mt-1 font-display text-[14px] text-ink/35 font-medium tracking-wide">{firstName}</p>
          )}
        </motion.div>

        {/* ── Esfera orgánica (único elemento visual fuerte) ─────────────── */}
        <motion.div
          className="relative w-[clamp(244px,70vw,332px)] aspect-square mt-12"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
        >
          {/* Glow ambiental suave que respira (sin borde duro). */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: '-12%',
              background:
                'radial-gradient(circle, rgba(47,191,63,0.16), rgba(20,82,201,0.12) 50%, transparent 70%)',
              filter: 'blur(26px)',
            }}
            animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.4, 0.7, 0.4], scale: [0.97, 1.05, 0.97] }}
            transition={reduceMotion ? { duration: 0.4 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* La esfera: respira (escala muy sutil). */}
          <motion.div
            className="absolute inset-0"
            animate={reduceMotion ? {} : { scale: [1, 1.035, 1] }}
            transition={reduceMotion ? {} : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Capa de color líquido — blur fuerte + máscara radial que difumina
                el borde (orgánico, no bola de cristal). Los blobs derivan y
                cambian de tamaño: tinta moviéndose en agua. */}
            <div
              className="absolute inset-0"
              style={{
                filter: 'blur(20px) saturate(1.25)',
                WebkitMaskImage: 'radial-gradient(circle farthest-side at 50% 50%, #000 58%, rgba(0,0,0,0.5) 78%, transparent 96%)',
                maskImage: 'radial-gradient(circle farthest-side at 50% 50%, #000 58%, rgba(0,0,0,0.5) 78%, transparent 96%)',
              }}
            >
              {BLOBS.map((b, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: b.size,
                    height: b.size,
                    background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, ${b.color} 44%, ${b.color}99 62%, transparent 76%)`,
                  }}
                  initial={{ top: b.top[0], left: b.left[0] }}
                  animate={
                    reduceMotion
                      ? { top: b.top[1], left: b.left[1] }
                      : { top: b.top, left: b.left, scale: [1, 1.28, 0.92, 1] }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: b.dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                  }
                />
              ))}
            </div>

            {/* Luz orgánica superior (volumen sin reflejo de cristal). */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 42% 30%, rgba(255,255,255,0.28) 0%, transparent 46%)',
                WebkitMaskImage: 'radial-gradient(circle farthest-side at 50% 50%, #000 66%, transparent 92%)',
                maskImage: 'radial-gradient(circle farthest-side at 50% 50%, #000 66%, transparent 92%)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* ── Mensaje vivo (cambia con calma, sin números) ───────────────── */}
        <div className="mt-12 h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stageIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-ink/55 text-[14px] sm:text-[15px] font-medium tracking-wide text-center"
            >
              {STEPS[stageIndex].live}…
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── Checklist (aire generoso, jerarquía suave) ─────────────────── */}
        <div className="mt-10 w-full max-w-[290px] flex flex-col gap-5">
          {STEPS.map((s, i) => {
            const done = i < stageIndex;
            const current = i === stageIndex;
            return (
              <motion.div
                key={s.item}
                className="flex items-center gap-3.5"
                animate={{ opacity: done ? 0.9 : current ? 1 : 0.4 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="relative shrink-0 w-[22px] h-[22px] flex items-center justify-center">
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
                    className="relative w-[22px] h-[22px] rounded-full flex items-center justify-center transition-colors duration-500"
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
                        className="w-[7px] h-[7px] rounded-full"
                        style={{ background: SKY }}
                        animate={{ opacity: [1, 0.4, 1], scale: [1, 0.82, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    ) : null}
                  </span>
                </span>

                <span
                  className={`font-display text-[14px] sm:text-[14.5px] leading-snug transition-colors duration-500 ${
                    current ? 'text-ink font-semibold' : done ? 'text-ink/70 font-medium' : 'text-ink/45 font-medium'
                  }`}
                >
                  {s.item}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
