import type { CareerPreferences } from './preferences';

export interface Tension {
  tipo:
    | 'creatividad_vs_estructura'
    | 'autonomia_vs_dependencia'
    | 'impacto_vs_ingresos'
    | 'tecnologia_vs_antimatematica'
    | 'exploracion_vs_seguridad'
    | 'social_vs_soledad';
  score: number;    // 0-100 intensity
  mensaje: string;  // human-readable, 1 sentence, warm + Gen Z tone
  consejo: string;  // actionable advice, 1 sentence
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Compute tension intensity as the geometric mean of how extreme both poles are
 * beyond their threshold, scaled to 0-100.
 */
function poleIntensity(a: number, aThreshold: number, b: number, bThreshold: number): number {
  const excessA = Math.max(0, a - aThreshold);
  const excessB = Math.max(0, b - bThreshold);
  // Average excess, normalized assuming max excess is (100 - threshold)
  const maxExcessA = 100 - aThreshold;
  const maxExcessB = 100 - bThreshold;
  const normA = maxExcessA > 0 ? excessA / maxExcessA : 0;
  const normB = maxExcessB > 0 ? excessB / maxExcessB : 0;
  return clamp(Math.round(((normA + normB) / 2) * 100), 0, 100);
}

/**
 * Detect profile tensions from archetype scores and preferences.
 */
export function detectarTensiones(
  ranking: Array<{ id: string; pct: number }>,
  preferences: CareerPreferences,
  antipatrones: string[],
): Tension[] {
  const tensiones: Tension[] = [];

  const getPct = (id: string): number =>
    ranking.find(r => r.id === id)?.pct ?? 0;

  const antiSet = new Set(antipatrones);

  // ── 1. creatividad_vs_estructura ─────────────────────────────────────────
  if (preferences.creatividad > 65 && preferences.estructura > 65) {
    tensiones.push({
      tipo: 'creatividad_vs_estructura',
      score: poleIntensity(preferences.creatividad, 65, preferences.estructura, 65),
      mensaje:
        'Tu lado creativo y tu necesidad de orden están en tensión — eso no es un problema, es lo que hace a los mejores diseñadores de sistemas.',
      consejo:
        'Buscá disciplinas que combinen creatividad con método, como UX, arquitectura o diseño de producto.',
    });
  }

  // ── 2. autonomia_vs_dependencia ───────────────────────────────────────────
  if (preferences.autonomia > 70 && preferences.colaboracion > 70) {
    tensiones.push({
      tipo: 'autonomia_vs_dependencia',
      score: poleIntensity(preferences.autonomia, 70, preferences.colaboracion, 70),
      mensaje:
        'Querés trabajar con total independencia y al mismo tiempo en equipos cercanos — esa dualidad define el perfil de fundador o lead de proyecto.',
      consejo:
        'Explorá roles donde tengás autonomía sobre tu área pero trabajés en paralelo con otros, como tech lead o consultor especialista.',
    });
  }

  // ── 3. impacto_vs_ingresos ────────────────────────────────────────────────
  if (preferences.impactoSocial > 70 && preferences.ingresos > 70) {
    tensiones.push({
      tipo: 'impacto_vs_ingresos',
      score: poleIntensity(preferences.impactoSocial, 70, preferences.ingresos, 70),
      mensaje:
        'Querés que tu trabajo tenga impacto real en el mundo y también que te dé seguridad económica — esa tensión es real, pero resoluble.',
      consejo:
        'Hay carreras como salud pública, finanzas de impacto o consultoría social donde ambas cosas coexisten — investigalas.',
    });
  }

  // ── 4. tecnologia_vs_antimatematica ──────────────────────────────────────
  const tecPct = Math.max(getPct('arquitecto'), getPct('descubridor'), getPct('interprete'));
  if (tecPct > 50 && antiSet.has('matematica')) {
    const score = clamp(Math.round((tecPct - 50) * 2), 0, 100);
    tensiones.push({
      tipo: 'tecnologia_vs_antimatematica',
      score,
      mensaje:
        'Tus respuestas muestran un perfil técnico fuerte, pero rechazás las matemáticas puras — hay caminos en tecnología que priorizan lógica sobre cálculo.',
      consejo:
        'Considerá programación, diseño de sistemas o ciencia de datos aplicada, donde la matemática es herramienta, no fin.',
    });
  }

  // ── 5. exploracion_vs_seguridad ───────────────────────────────────────────
  if (getPct('descubridor') > 50 && preferences.estabilidad > 70) {
    tensiones.push({
      tipo: 'exploracion_vs_seguridad',
      score: poleIntensity(getPct('descubridor'), 50, preferences.estabilidad, 70),
      mensaje:
        'Tenés la curiosidad de quien quiere explorar todo, pero también necesitás saber que el piso es sólido — eso es más común de lo que parece.',
      consejo:
        'Las carreras científicas en instituciones públicas o en R&D corporativo te dan exploración con estabilidad real.',
    });
  }

  // ── 6. social_vs_soledad ──────────────────────────────────────────────────
  if (preferences.personas > 65 && antiSet.has('soledad')) {
    const score = clamp(Math.round((preferences.personas - 65) * (100 / 35)), 0, 100);
    tensiones.push({
      tipo: 'social_vs_soledad',
      score,
      mensaje:
        'Tu orientación a las personas es clara y al mismo tiempo marcaste que el trabajo solitario te pesa — eso confirma que necesitás un ambiente colaborativo.',
      consejo:
        'Descartá roles con mucho trabajo individual sostenido; priorizá carreras donde la interacción sea parte del día a día.',
    });
  }

  return tensiones;
}
