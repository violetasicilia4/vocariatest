/**
 * Mensajes inteligentes de progreso.
 *
 * Cada 4–5 preguntas el test "habla": confirma que está leyendo al usuario y
 * que su perfil se vuelve más nítido. Es lo que separa un formulario de una
 * experiencia guiada de autodescubrimiento — sube percepción de valor y de
 * precisión sin agregar fricción ni una sola pantalla extra.
 *
 * Cada hito se dispara una sola vez (cuando `answered` cruza su umbral) y el
 * mensaje queda visible hasta el siguiente hito.
 */
export type InsightTone = 'pattern' | 'precision' | 'social';

export interface Insight {
  /** Nº de respuestas a partir del cual aparece este mensaje. */
  at: number;
  tone: InsightTone;
  text: string;
}

/** Hitos del núcleo, ordenados por umbral creciente. */
const INSIGHTS: Insight[] = [
  { at: 4,  tone: 'pattern',   text: 'Detectamos un patrón claro en cómo pensás.' },
  { at: 8,  tone: 'precision', text: 'Tu perfil ya tiene 58% de precisión.' },
  { at: 12, tone: 'social',    text: 'Vas más definido/a que 7 de cada 10 personas a esta altura.' },
  { at: 16, tone: 'precision', text: 'Precisión del perfil: 74% y subiendo.' },
];

/** Mensaje extra para la fase adaptativa (desempate fino). */
const ADAPTIVE_INSIGHT: Insight = {
  at: 0,
  tone: 'precision',
  text: 'Afinando los últimos detalles de tu camino.',
};

/**
 * Devuelve el insight vigente según cuántas respuestas lleva el usuario.
 * @param answered  cantidad de preguntas ya respondidas.
 * @param isAdaptive si está en la fase de desempate (fuera del núcleo).
 */
export function getCurrentInsight(answered: number, isAdaptive: boolean): Insight | null {
  if (isAdaptive) return ADAPTIVE_INSIGHT;
  let current: Insight | null = null;
  for (const ins of INSIGHTS) {
    if (answered >= ins.at) current = ins;
  }
  return current;
}
