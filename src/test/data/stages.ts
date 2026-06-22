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
  /** Microcopy de la fase "analizando" — distinto en cada hito para no repetir. */
  analyzing: string;
  title: string;
  text: string;
}

/** Tres momentos que interrumpen brevemente el flujo. Copy corto, sofisticado.
 *  Cada uno tiene su propia frase de análisis para que no se sienta idéntico al
 *  anterior. Son pocos a propósito: cada interrupción tiene que pesar. */
export const CHECKPOINTS: Checkpoint[] = [
  {
    at: 30,
    analyzing: 'Leyendo tus primeras respuestas',
    title: 'Patrón detectado',
    text: 'Tus primeras respuestas ya marcan una dirección clara en tu perfil.',
  },
  {
    at: 58,
    analyzing: 'Cruzando señales de tu perfil',
    title: 'Perfil en construcción',
    text: 'Empiezan a aparecer señales cada vez más consistentes sobre cómo pensás.',
  },
  {
    at: 82,
    analyzing: 'Contrastando con tus respuestas',
    title: 'Hipótesis validada',
    text: 'Las últimas respuestas fortalecieron la tendencia que veníamos detectando.',
  },
];
