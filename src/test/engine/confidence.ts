/**
 * Robust confidence score calculation.
 */

export interface ConfidenceBreakdown {
  score: number;          // final 0-100
  gap: number;            // raw gap between top and second (0-100)
  concentration: number;  // 0-100 contribution from score concentration
  strength: number;       // contribution from absolute top emergence
  completion: number;     // 0-100 completion rate (1-based)
  contradictions: number; // number of contradictions detected
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Detect internal contradictions in the answer set.
 *
 * Un perfil incoherente (respuestas contradictorias entre sí) no merece la
 * misma confianza que uno consistente, aunque por azar un arquetipo gane.
 */
function detectContradictions(answers: Record<string, string>): number {
  let count = 0;

  const sca1 = answers['sca_1'];
  const sca4 = answers['sca_4'];
  const sit6 = answers['sit_6'];
  const anti = (answers['anti_1'] ?? '').split(',').filter(Boolean);
  const antiSet = new Set(anti);

  // 1. Autonomía extrema (sca_1='1') + necesidad de certeza extrema (sca_4='1').
  if (sca1 === '1' && sca4 === '1') count += 1;

  // 2. Rechaza la soledad pero su relación ideal con el trabajo es trabajar solo.
  if (antiSet.has('soledad') && sit6 === 'a') count += 1;

  // 3. Rechaza la exposición al público pero su rol ideal es liderar/movilizar gente.
  if (antiSet.has('exposicion') && sit6 === 'd') count += 1;

  return count;
}

/**
 * Calculate confidence score from ranking, answers, and total question count.
 */
export function calcularConfianza(
  ranking: Array<{ id: string; pct: number }>,
  answers: Record<string, string>,
  totalQuestions: number,
): ConfidenceBreakdown {
  const pctTop = ranking[0]?.pct ?? 0;
  const pctSecond = ranking[1]?.pct ?? 0;

  // Escalas calibradas contra la distribución empírica de respuestas
  // aleatorias (gap: mediana 11; concentración: mediana 0,21; emergencia
  // máxima: mediana 72, perfiles coherentes 90+). Ver scripts/diagnose.ts.

  // Gap contribution: 0-25 points (dominancia relativa del top)
  const gap = pctTop - pctSecond;
  const gapContrib = clamp(gap * 0.7, 0, 25);

  // Concentration contribution: 0-12 points
  const sumAll = ranking.reduce((acc, r) => acc + r.pct, 0);
  const concentration = sumAll > 0 ? pctTop / sumAll : 0;
  const concContrib = clamp((concentration - 0.16) * 90, 0, 12);

  // Strength contribution: 0-22 points (qué tan bien encajó el mejor arquetipo
  // en términos absolutos). Un perfil donde NINGÚN arquetipo supera ~60 es
  // difuso: ninguna vocación emergió con fuerza, sin importar la brecha.
  const strengthContrib = clamp((pctTop - 60) * 0.6, 0, 22);

  // Completion penalty: 0-35 points deducted
  const answered = Object.values(answers).filter(v => v && v.trim() !== '').length;
  const scorableAnswered = Math.min(answered, totalQuestions);
  const completionRate = totalQuestions > 0 ? scorableAnswered / totalQuestions : 1;
  const completionPenalty = (1 - completionRate) * 35;

  // Contradiction penalty: 7 points each
  const contradictions = detectContradictions(answers);
  const contradictionPenalty = contradictions * 7;

  const base = 38;
  const rawScore =
    base + gapContrib + concContrib + strengthContrib - completionPenalty - contradictionPenalty;
  const score = clamp(Math.round(rawScore), 45, 97);

  return {
    score,
    gap,
    concentration: Math.round(concContrib),
    strength: Math.round(strengthContrib),
    completion: Math.round(completionRate * 100),
    contradictions,
  };
}
