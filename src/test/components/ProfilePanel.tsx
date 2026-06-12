import { motion } from 'motion/react';
import type { ProfileSnapshot } from '../engine/profileSignals';
import { EASE } from '../ui/theme';

/**
 * Panel de "perfil en construcción" — vive en el riel izquierdo del desktop.
 * Muestra cómo el sistema va captando señal con cada respuesta: 5 dimensiones
 * neutras que se activan en vivo. No revela resultados ni arquetipos; su único
 * trabajo es que el usuario sienta "esto me está entendiendo".
 */
export default function ProfilePanel({ snapshot }: { snapshot: ProfileSnapshot }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-ink/40 tracking-[0.16em] uppercase mb-3">
        Perfil en construcción
      </p>

      <div className="space-y-3">
        {snapshot.dimensions.map((d, i) => (
          <div key={d.id}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12.5px] font-semibold text-ink/70">{d.label}</span>
              <span className="text-[10.5px] font-medium text-ink/35 tabular-nums">
                {d.value < 8 ? 'captando…' : `${d.value}%`}
              </span>
            </div>
            <div className="h-[5px] rounded-full bg-line overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-brand-sky"
                initial={false}
                animate={{ width: `${Math.max(3, d.value)}%` }}
                transition={{ duration: 0.7, delay: i * 0.04, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-ink/35 font-medium leading-relaxed mt-5">
        Se reajusta con cada respuesta.
      </p>
    </div>
  );
}
