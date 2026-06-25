import { useEffect, useMemo, useState } from 'react';
import { motion, animate, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { SKY, EASE } from '../ui/theme';

interface ProcessingScreenProps {
  nombre: string;
  onDone: () => void;
}

// Mensajes que transmiten una IA construyendo un perfil único.
const STEPS = [
  'Detectando patrones de personalidad',
  'Identificando fortalezas dominantes',
  'Comparando con 130+ carreras',
  'Construyendo tu mapa profesional',
  'Preparando resultados',
];

// Procesamiento deliberado (~6.5s): el "descubrimiento" respira.
const TOTAL_MS = 6500;

// ── Blobs del gradiente fluido (estética Apple Intelligence) ──────────────────
// Manchas de color que derivan y rotan lentamente dentro de la esfera, con blur
// fuerte → se leen como un fluido vivo "procesando". Azul/teal arriba, verde/lima
// abajo, núcleo teal profundo. Brand: sky + lima, con teal/verde de transición.
interface Blob {
  color: string;
  size: string;
  from: { top: string; left: string };
  drift: { top: string[]; left: string[] };
  dur: number;
}
const BLOBS: Blob[] = [
  { color: '#1452c9', size: '86%', from: { top: '2%', left: '16%' }, drift: { top: ['0%', '16%', '4%'], left: ['12%', '30%', '10%'] }, dur: 11 },
  { color: '#0b6f86', size: '80%', from: { top: '10%', left: '26%' }, drift: { top: ['8%', '-2%', '18%'], left: ['30%', '16%', '34%'] }, dur: 13 },
  { color: '#2fbf3f', size: '96%', from: { top: '40%', left: '8%' }, drift: { top: ['42%', '30%', '48%'], left: ['6%', '24%', '2%'] }, dur: 12 },
  { color: '#a6e635', size: '80%', from: { top: '48%', left: '36%' }, drift: { top: ['50%', '62%', '42%'], left: ['38%', '22%', '44%'] }, dur: 10 },
  { color: '#0a4f63', size: '54%', from: { top: '26%', left: '32%' }, drift: { top: ['24%', '38%', '20%'], left: ['34%', '24%', '42%'] }, dur: 14 },
];

export default function ProcessingScreen({ nombre, onDone }: ProcessingScreenProps) {
  const [pct, setPct] = useState(0);
  const reduceMotion = useReducedMotion();
  const orbit = useMemo(
    () => [
      { r: 50, ang: -118, color: SKY, dot: 3.5 },
      { r: 50, ang: 8, color: SKY, dot: 3 },
      { r: 49, ang: 96, color: '#5bbf2e', dot: 3.5 },
    ],
    [],
  );

  useEffect(() => {
    const done = setTimeout(onDone, TOTAL_MS + 300);
    const controls = reduceMotion
      ? (setPct(100), null)
      : animate(0, 100, {
          duration: TOTAL_MS / 1000,
          ease: [0.33, 0, 0.2, 1],
          onUpdate: (v: number) => setPct(v),
        });
    return () => {
      clearTimeout(done);
      controls?.stop();
    };
  }, [onDone, reduceMotion]);

  const frac = pct / 100;
  const stageIndex = Math.min(STEPS.length - 1, Math.floor(frac * STEPS.length));

  const firstName = nombre ? nombre.split(' ')[0] : '';

  return (
    <div className="min-h-[100dvh] bg-paper flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        {/* Encabezado */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-display font-extrabold text-[24px] sm:text-[28px] text-ink text-center tracking-tight leading-tight"
        >
          Construyendo tu perfil{firstName && <>, <span className="text-sky">{firstName}</span></>}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          className="mt-3 text-[14px] sm:text-[15px] text-ink/55 font-medium text-center leading-relaxed max-w-[330px]"
        >
          Estamos analizando tus respuestas para encontrar tu mejor camino profesional.
        </motion.p>

        {/* ── Esfera (héroe) + órbita ───────────────────────────────────── */}
        <div className="relative w-[clamp(248px,72vw,348px)] aspect-square mt-10 mb-2">
          {/* Órbita sutil con puntitos que giran (fuera de la esfera). */}
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: '50% 50%' }}
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
              <circle cx="50" cy="50" r="50" fill="none" stroke="var(--color-line)" strokeWidth="0.3" strokeDasharray="0.6 2.4" opacity="0.7" />
              {orbit.map((o, i) => {
                const a = (o.ang * Math.PI) / 180;
                return (
                  <circle key={i} cx={50 + o.r * Math.cos(a)} cy={50 + o.r * Math.sin(a)} r={o.dot * 0.18} fill={o.color} />
                );
              })}
            </svg>
          </motion.div>

          {/* Sombra de contacto suave bajo la esfera. */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
            style={{ bottom: '-3%', width: '64%', height: '9%', background: 'rgba(11,22,40,0.14)', filter: 'blur(14px)' }}
          />

          {/* Cuerpo de la esfera de cristal. */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              boxShadow:
                '0 30px 70px rgba(11,22,40,0.16), inset 0 1px 2px rgba(255,255,255,0.9)',
            }}
          >
            {/* Fluido: blobs que derivan dentro de un grupo que rota lento.
                Blur fuerte + máscara radial que los desvanece antes del borde
                (deja el rim esmerilado, no un color plano hasta el filo). */}
            <motion.div
              className="absolute inset-0"
              style={{
                filter: 'blur(22px) saturate(1.3)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 66%, transparent 90%)',
                maskImage: 'radial-gradient(circle at 50% 50%, #000 66%, transparent 90%)',
                transformOrigin: '50% 50%',
              }}
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              {BLOBS.map((b, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: b.size,
                    height: b.size,
                    top: b.from.top,
                    left: b.from.left,
                    background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, ${b.color} 42%, ${b.color}aa 60%, transparent 74%)`,
                  }}
                  animate={reduceMotion ? {} : { top: b.drift.top, left: b.drift.left, scale: [1, 1.18, 1] }}
                  transition={{ duration: b.dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                />
              ))}
            </motion.div>

            {/* Rim esmerilado (vidrio): aro blanco translúcido hacia el borde. */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle at 50% 50%, transparent 70%, rgba(255,255,255,0.35) 90%, rgba(255,255,255,0.6) 100%)' }}
            />
            {/* Highlight especular arriba-izquierda (volumen de esfera). */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle at 33% 25%, rgba(255,255,255,0.75) 0%, transparent 38%)' }}
            />
            {/* Sombra interior inferior (da peso a la esfera). */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: 'inset 0 -22px 44px rgba(11,22,40,0.10), inset 0 0 0 1px rgba(255,255,255,0.5)' }}
            />
          </div>

          {/* Glow ambiental externo que respira. */}
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            style={{ background: 'radial-gradient(circle, rgba(55,194,74,0.18), rgba(37,142,249,0.12) 55%, transparent 72%)', filter: 'blur(22px)' }}
            animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.45, 0.75, 0.45], scale: [0.98, 1.05, 0.98] }}
            transition={reduceMotion ? { duration: 0.4 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* ── Checklist (Completado / En progreso) ───────────────────────── */}
        <div className="relative mt-9 w-full max-w-[300px]">
          {/* Conector vertical entre íconos. */}
          <div className="absolute top-3 bottom-3 w-px bg-line" style={{ left: '12.5px' }} />

          <div className="flex flex-col gap-3.5">
            {STEPS.map((label, i) => {
              const done = i < stageIndex;
              const current = i === stageIndex;
              return (
                <div key={label} className="flex items-start gap-3.5">
                  <span
                    className="relative z-10 shrink-0 w-[26px] h-[26px] rounded-full flex items-center justify-center bg-paper transition-colors duration-300"
                    style={{
                      background: done ? SKY : '#fff',
                      border: done ? `1px solid ${SKY}` : current ? `2px solid ${SKY}` : '1.5px solid var(--color-line-strong)',
                    }}
                  >
                    {done ? (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 22 }}>
                        <Check size={13} strokeWidth={3} className="text-white" />
                      </motion.span>
                    ) : current && !reduceMotion ? (
                      <motion.span
                        className="w-[8px] h-[8px] rounded-full"
                        style={{ background: SKY }}
                        animate={{ scale: [1, 1.45, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    ) : null}
                  </span>

                  <div className="pt-0.5">
                    <p
                      className={`font-display text-[14px] sm:text-[14.5px] leading-tight transition-colors duration-300 ${
                        current ? 'text-ink font-bold' : done ? 'text-ink/80 font-semibold' : 'text-ink/40 font-medium'
                      }`}
                    >
                      {label}
                    </p>
                    <p
                      className={`mt-0.5 text-[11.5px] font-medium leading-none transition-colors duration-300 ${
                        current ? 'text-sky' : done ? 'text-ink/35' : 'text-ink/25'
                      }`}
                    >
                      {done ? 'Completado' : current ? 'En progreso' : 'En espera'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
