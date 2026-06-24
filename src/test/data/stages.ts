/**
 * Narrativa de avance del test.
 *
 * El progreso no se cuenta como "pregunta X de Y" sino como una historia que
 * evoluciona: el sistema explora, detecta, construye, valida y genera. En
 * paralelo sube un medidor de "confianza del perfil" que se percibe como
 * precisión creciente, no como cantidad de respuestas.
 *
 * Los checkpoints son los momentos que interrumpen brevemente el flujo para
 * que el avance sea imposible de ignorar (premium, no gamificado).
 */

export interface Stage {
  /** % de avance a partir del cual rige esta etapa. */
  at: number;
  label: string;
}

/** Etapas de la barra (la barra "cuenta una historia").
 *  Nota: "Generando resultado" NO va acá — la generación ocurre en la pantalla
 *  de procesamiento, después del test. Mientras todavía se responde, la última
 *  etapa es de afinado, para no decir "generando" con preguntas pendientes. */
export const STAGES: Stage[] = [
  { at: 0,  label: 'Explorando patrones' },
  { at: 20, label: 'Detectando afinidades' },
  { at: 45, label: 'Construyendo perfil' },
  { at: 72, label: 'Validando hipótesis' },
  { at: 92, label: 'Afinando los detalles' },
];

export function stageForPct(pct: number): { label: string; index: number } {
  let index = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (pct >= STAGES[i].at) index = i;
  }
  return { label: STAGES[index].label, index };
}

export interface Checkpoint {
  /** % a partir del cual se dispara (una sola vez). */
  at: number;
  /** Valor "redondo" que muestra el anillo del hito (la cifra protagonista). */
  value: number;
  /** Título corto y premium del hito. */
  title: string;
  /** Línea de apoyo, breve. */
  text: string;
}

/** Tres momentos que interrumpen brevemente el flujo. Copy corto, sofisticado.
 *  Son pocos a propósito: cada interrupción tiene que pesar. El anillo del hito
 *  aterriza en una cifra redonda (30 → 60 → 80) para que se lea intencional. */
export const CHECKPOINTS: Checkpoint[] = [
  {
    at: 30,
    value: 30,
    title: 'Perfil tomando forma',
    text: 'Ya se marca una dirección',
  },
  {
    at: 58,
    value: 60,
    title: 'Progreso sólido',
    text: 'Señales cada vez más claras',
  },
  {
    at: 82,
    value: 80,
    title: 'Casi completo',
    text: 'La tendencia se afianza',
  },
];
