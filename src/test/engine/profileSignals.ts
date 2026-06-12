/**
 * Lectura en vivo del perfil — "el sistema te está entendiendo".
 *
 * Reusa el vector latente de 37 señales (computeVector) para mostrar, en tiempo
 * real y a medida que el usuario responde, cómo se va construyendo su perfil.
 *
 * Importante (anti-spoiler): NO expone arquetipos ni resultados. Agrega las
 * señales en 5 meta-dimensiones humanas y neutras —ejes de personalidad, no
 * carreras— que sirven sólo para generar sensación de construcción y de que
 * "algo se está midiendo". Es read-only: no afecta el scoring.
 */

import { computeVector, type VectorVocacional } from '../engine/signals';

export interface ProfileDimension {
  id: string;
  label: string;
  /** Activación 0–100 captada hasta ahora. */
  value: number;
}

export interface ProfileSnapshot {
  dimensions: ProfileDimension[];
  /** Intensidad global de señal captada (0–100), para el "perfil en construcción". */
  strength: number;
}

/** Cada meta-dimensión promedia un grupo de señales latentes afines. */
const DIMENSION_MAP: { id: string; label: string; signals: (keyof VectorVocacional)[] }[] = [
  {
    id: 'exploracion',
    label: 'Exploración',
    signals: ['curiosidad_intelectual', 'orientacion_investigativa', 'tolerancia_incertidumbre', 'pensamiento_abstracto'],
  },
  {
    id: 'estructura',
    label: 'Estructura',
    signals: ['necesidad_estructura', 'pensamiento_sistemico', 'orientacion_analitica', 'orientacion_largo_plazo'],
  },
  {
    id: 'impacto',
    label: 'Impacto en personas',
    signals: ['empatia_funcional', 'impacto_social', 'vocacion_servicio', 'orientacion_social'],
  },
  {
    id: 'creatividad',
    label: 'Creatividad',
    signals: ['creatividad_generativa', 'expresion_personal', 'sensibilidad_estetica', 'interes_estetico'],
  },
  {
    id: 'estrategia',
    label: 'Estrategia',
    signals: ['liderazgo', 'persuasion_influencia', 'orientacion_logro', 'tolerancia_riesgo'],
  },
];

function avg(vector: VectorVocacional, keys: (keyof VectorVocacional)[]): number {
  let sum = 0;
  for (const k of keys) sum += Math.max(0, vector[k] ?? 0);
  return sum / keys.length;
}

/**
 * Construye el snapshot del perfil a partir de las respuestas dadas hasta ahora.
 * @param answers respuestas acumuladas (puede ser parcial).
 * @param progress avance global 0–1, usado para dar vida temprana a las barras.
 */
export function readProfile(answers: Record<string, string>, progress: number): ProfileSnapshot {
  const vector = computeVector(answers);

  const dimensions = DIMENSION_MAP.map(d => {
    // El vector mid-test es naturalmente bajo (normalizado al techo completo);
    // lo escalamos suavemente para que la barra "respire" sin exagerar.
    const raw = avg(vector, d.signals);
    const value = Math.round(Math.min(100, raw * 1.35));
    return { id: d.id, label: d.label, value };
  });

  // Fuerza global: mezcla cuánto se respondió con cuánta señal hay activa.
  const activeAvg = dimensions.reduce((s, d) => s + d.value, 0) / dimensions.length;
  const strength = Math.round(Math.min(100, progress * 60 + activeAvg * 0.5));

  return { dimensions, strength };
}
