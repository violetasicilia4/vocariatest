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

/** Etapas de la barra (la barra "cuenta una historia"). */
export const STAGES: Stage[] = [
  { at: 0,  label: 'Explorando patrones' },
  { at: 20, label: 'Detectando afinidades' },
  { at: 45, label: 'Construyendo perfil' },
  { at: 70, label: 'Validando hipótesis' },
  { at: 90, label: 'Generando resultado' },
];

export function stageForPct(pct: number): { label: string; index: number } {
  let index = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (pct >= STAGES[i].at) index = i;
  }
  return { label: STAGES[index].label, index };
}

/**
 * Confianza del perfil (0–100). Arranca alta-media y sube hacia ~97 — se siente
 * como precisión que mejora, nunca como un contador de preguntas.
 */
export function confidenceForPct(pct: number): number {
  return Math.max(42, Math.min(97, Math.round(42 + pct * 0.55)));
}

export interface Checkpoint {
  /** % a partir del cual se dispara (una sola vez). */
  at: number;
  title: string;
  text: string;
}

/** Los 4 momentos que interrumpen el flujo. Copy corto, sofisticado.
 *  Cada texto está pensado para asentar en líneas parejas —sin huérfanas—
 *  dentro del ancho del modal. */
export const CHECKPOINTS: Checkpoint[] = [
  { at: 25, title: 'Patrón detectado',       text: 'Tus primeras respuestas ya marcan una dirección clara en tu perfil.' },
  { at: 50, title: 'Perfil en construcción', text: 'Tu perfil está mostrando señales cada vez más consistentes.' },
  { at: 75, title: 'Hipótesis validada',     text: 'Las últimas respuestas fortalecieron una tendencia que veníamos detectando.' },
  { at: 90, title: 'Resultado casi listo',   text: 'Ya tenemos información suficiente para una recomendación precisa.' },
];
