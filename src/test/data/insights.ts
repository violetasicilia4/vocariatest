/**
 * Mensajes inteligentes de progreso — hooks psicológicos.
 *
 * En momentos estratégicos del recorrido, el sistema "habla": confirma que está
 * leyendo a la persona y que construye una hipótesis sobre su perfil. Es lo que
 * separa un formulario de una herramienta que entiende. Tono sobrio y experto
 * (Stripe/Linear): nunca gamificado, nunca infantil, sin emojis.
 *
 * Los hooks se anclan al porcentaje de perfil construido (no al número de
 * pregunta) para reforzar la narrativa "se está midiendo algo", no "faltan X".
 */
export type InsightTone = 'pattern' | 'precision' | 'hypothesis' | 'adaptive';

export interface Insight {
  /** % de perfil construido a partir del cual aparece. */
  at: number;
  tone: InsightTone;
  text: string;
}

/** Hooks del núcleo, anclados a hitos de ~25 / 50 / 75 / pre-final. */
const HOOKS: Insight[] = [
  { at: 22, tone: 'pattern',    text: 'Detectamos un patrón interesante en cómo pensás.' },
  { at: 46, tone: 'precision',  text: 'Ya identificamos algunas áreas donde probablemente destaques.' },
  { at: 70, tone: 'hypothesis', text: 'Estamos validando una hipótesis sobre tu perfil.' },
  { at: 88, tone: 'precision',  text: 'Ya tenemos casi todo para generar un resultado confiable.' },
];

/**
 * En la fase adaptativa el recorrido deja de ser igual para todos. Lo decimos
 * sin lenguaje técnico, rotando entre formas de la misma idea.
 */
const ADAPTIVE_HOOKS: Insight[] = [
  { at: 0, tone: 'adaptive', text: 'Ajustando el recorrido según tus respuestas.' },
  { at: 0, tone: 'adaptive', text: 'Esta pregunta depende de cómo respondiste hasta acá.' },
  { at: 0, tone: 'adaptive', text: 'Estas preguntas no las recibe todo el mundo.' },
];

/** Cierre para la última pregunta: no puede prometer preguntas que no existen. */
const CLOSING_HOOK: Insight = {
  at: 0,
  tone: 'precision',
  text: 'Última pregunta: estamos afinando el detalle final de tu resultado.',
};

/**
 * Devuelve el insight vigente.
 * @param pct        % de perfil construido (0–100).
 * @param isAdaptive si está en la fase adaptativa (fuera del núcleo).
 * @param adaptiveStep índice de la pregunta adaptativa actual (para rotar copy).
 * @param isLast      si es la última pregunta del test (no hay "próximas").
 */
export function getCurrentInsight(
  pct: number,
  isAdaptive: boolean,
  adaptiveStep = 0,
  isLast = false,
): Insight | null {
  // En la última pregunta nunca prometemos preguntas siguientes.
  if (isLast) return CLOSING_HOOK;
  if (isAdaptive) {
    return ADAPTIVE_HOOKS[adaptiveStep % ADAPTIVE_HOOKS.length];
  }
  let current: Insight | null = null;
  for (const h of HOOKS) {
    if (pct >= h.at) current = h;
  }
  return current;
}
